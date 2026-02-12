import { auth, db } from '../../js/firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    updateDoc,
    Timestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/**
 * Verifica se o usuário está logado E é admin
 * Se não for, redireciona para login
 */
export async function checkAdminAuth() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                window.location.href = '/admin/login.html';
                reject('Não autenticado');
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));

                if (!userDoc.exists() || userDoc.data().role !== "admin") {
                    window.location.href = '/admin/login.html';
                    reject('Não é admin');
                    return;
                }

                resolve(user);
            } catch (error) {
                console.error("Erro ao verificar admin:", error);
                window.location.href = '/admin/login.html';
                reject(error);
            }
        });
    });
}

/**
 * Função de logout
 */
export async function logout() {
    try {
        await signOut(auth);
        window.location.href = '/admin/login.html';
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
}

/**
 * Buscar métricas para o dashboard
 */
export async function getDashboardStats() {
    try {
        const diagnosticosRef = collection(db, "diagnosticos");
        const allDiagnosticos = await getDocs(diagnosticosRef);

        const total = allDiagnosticos.size;

        // Novos (últimos 7 dias)
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

        let novos = 0;
        let convertidos = 0;
        let aguardandoContato = 0;

        allDiagnosticos.forEach((doc) => {
            const data = doc.data();

            // Verificar se é novo (últimos 7 dias)
            if (data.criadoEm) {
                const criadoEm = data.criadoEm.toDate();
                if (criadoEm >= seteDiasAtras) {
                    novos++;
                }
            }

            // Verificar se é convertido
            if (data.convertido === true || data.userId) {
                convertidos++;
            }

            // Aguardando contato: não visualizado pelo admin E não contatado
            if (!data.visualizadoAdmin && data.status !== 'contatado') {
                aguardandoContato++;
            }
        });

        return {
            total,
            novos,
            convertidos,
            aguardandoContato
        };
    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        throw error;
    }
}

/**
 * Buscar lista de diagnósticos com filtros
 * @param {string} filtro - 'todos', 'novos', 'convertidos', 'nao-visualizados'
 * @param {string} ordem - 'data-desc', 'data-asc'
 * @param {string} busca - texto para buscar no nome da empresa
 */
export async function getDiagnosticos(filtro = 'todos', ordem = 'data-desc', busca = '') {
    try {
        const diagnosticosRef = collection(db, "diagnosticos");
        let q;

        // Aplicar filtros
        if (filtro === 'novos') {
            const seteDiasAtras = new Date();
            seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
            const timestamp = Timestamp.fromDate(seteDiasAtras);
            q = query(diagnosticosRef, where("criadoEm", ">=", timestamp));
        } else if (filtro === 'convertidos') {
            q = query(diagnosticosRef, where("convertido", "==", true));
        } else if (filtro === 'nao-visualizados') {
            q = query(diagnosticosRef, where("visualizadoAdmin", "==", false));
        } else {
            q = query(diagnosticosRef);
        }

        const querySnapshot = await getDocs(q);
        let diagnosticos = [];

        querySnapshot.forEach((doc) => {
            diagnosticos.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Filtrar por busca (client-side pois Firestore não tem LIKE)
        if (busca) {
            const buscaLower = busca.toLowerCase();
            diagnosticos = diagnosticos.filter(d =>
                (d.nomeEmpresa && d.nomeEmpresa.toLowerCase().includes(buscaLower)) ||
                (d.nomeRespondente && d.nomeRespondente.toLowerCase().includes(buscaLower)) ||
                (d.email && d.email.toLowerCase().includes(buscaLower))
            );
        }

        // Ordenar
        diagnosticos.sort((a, b) => {
            const dateA = a.criadoEm ? a.criadoEm.toDate() : new Date(0);
            const dateB = b.criadoEm ? b.criadoEm.toDate() : new Date(0);

            if (ordem === 'data-desc') {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });

        return diagnosticos;
    } catch (error) {
        console.error("Erro ao buscar diagnósticos:", error);
        throw error;
    }
}

/**
 * Buscar diagnóstico específico por ID
 */
export async function getDiagnosticoById(id) {
    try {
        const docRef = doc(db, "diagnosticos", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error("Diagnóstico não encontrado");
        }

        return {
            id: docSnap.id,
            ...docSnap.data()
        };
    } catch (error) {
        console.error("Erro ao buscar diagnóstico:", error);
        throw error;
    }
}

/**
 * Atualizar status do diagnóstico
 */
export async function updateDiagnosticoStatus(id, status) {
    try {
        const docRef = doc(db, "diagnosticos", id);
        await updateDoc(docRef, {
            status: status,
            atualizadoEm: Timestamp.now()
        });
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        throw error;
    }
}

/**
 * Marcar diagnóstico como visualizado pelo admin
 */
export async function marcarComoVisualizado(id) {
    try {
        const docRef = doc(db, "diagnosticos", id);
        await updateDoc(docRef, {
            visualizadoAdmin: true,
            visualizadoAdminEm: Timestamp.now()
        });
    } catch (error) {
        console.error("Erro ao marcar como visualizado:", error);
        throw error;
    }
}

/**
 * Gerar mensagem personalizada para WhatsApp
 */
export function gerarMensagemWhatsApp(diagnostico) {
    const nome = diagnostico.nomeRespondente || 'Cliente';
    const empresa = diagnostico.nomeEmpresa || 'sua empresa';

    const mensagem = `Olá ${nome}! Sou a Viviane da GlobalMind. Vi que você realizou o diagnóstico comportamental da ${empresa} e gostaria de conversar sobre os resultados. Podemos agendar uma conversa?`;

    const whatsappNumber = '5527999833488';
    const encodedMessage = encodeURIComponent(mensagem);

    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Determinar status do diagnóstico
 */
export function determinarStatus(diagnostico) {
    if (diagnostico.status) {
        return diagnostico.status;
    }

    if (diagnostico.convertido) {
        return 'convertido';
    }

    if (diagnostico.visualizadoAdmin) {
        return 'visualizado';
    }

    return 'novo';
}

/**
 * Formatar data para exibição
 */
export function formatarData(timestamp) {
    if (!timestamp) return 'N/A';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formatar data curta (sem hora)
 */
export function formatarDataCurta(timestamp) {
    if (!timestamp) return 'N/A';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Obter classe CSS para badge de status
 */
export function getStatusBadgeClass(status) {
    const classes = {
        'novo': 'badge-novo',
        'visualizado': 'badge-visualizado',
        'convertido': 'badge-convertido',
        'contatado': 'badge-contatado'
    };

    return classes[status] || 'badge-novo';
}

/**
 * Obter texto para badge de status
 */
export function getStatusText(status) {
    const texts = {
        'novo': 'Novo',
        'visualizado': 'Visualizado',
        'convertido': 'Convertido',
        'contatado': 'Contatado'
    };

    return texts[status] || 'Novo';
}
