// Cálculos e agregações para NR-1

import { db } from './firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/**
 * Classificar nível de risco
 */
export function classificarRisco(pontuacao) {
    if (pontuacao <= 2.5) {
        return {
            nivel: 'baixo',
            label: 'Baixo Risco',
            cor: '#22c55e',
            descricao: 'Situação favorável. Manter práticas atuais.'
        };
    } else if (pontuacao <= 5.0) {
        return {
            nivel: 'moderado',
            label: 'Risco Moderado',
            cor: '#f59e0b',
            descricao: 'Atenção necessária. Implementar ações preventivas.'
        };
    } else if (pontuacao <= 7.5) {
        return {
            nivel: 'alto',
            label: 'Risco Alto',
            cor: '#fb923c',
            descricao: 'Situação preocupante. Ações corretivas urgentes.'
        };
    } else {
        return {
            nivel: 'critico',
            label: 'Risco Crítico',
            cor: '#dc3545',
            descricao: 'Situação crítica. Intervenção imediata necessária.'
        };
    }
}

/**
 * Obter recomendações por tópico
 */
export function getRecomendacoes(topicoId, pontuacao) {
    const recomendacoesPorTopico = {
        1: { // Assédio
            baixo: [
                'Manter canal de denúncias ativo e sigiloso',
                'Continuar campanhas de conscientização',
                'Realizar treinamentos periódicos'
            ],
            moderado: [
                'Reforçar política de tolerância zero ao assédio',
                'Aumentar frequência de treinamentos',
                'Criar comissão de ética e conduta'
            ],
            alto: [
                'Investigar casos relatados imediatamente',
                'Implementar programa de compliance comportamental',
                'Consultoria especializada em prevenção'
            ],
            critico: [
                'Auditoria externa urgente',
                'Afastamento preventivo de envolvidos',
                'Revisão completa de políticas e processos',
                'Suporte psicológico para vítimas'
            ]
        },
        2: { // Carga de Trabalho
            baixo: [
                'Monitorar distribuição de tarefas periodicamente',
                'Manter equilíbrio atual da equipe'
            ],
            moderado: [
                'Revisar processos para otimização',
                'Avaliar necessidade de contratações',
                'Implementar gestão de prioridades'
            ],
            alto: [
                'Redimensionar equipes urgentemente',
                'Eliminar atividades não essenciais',
                'Implementar limite de horas extras'
            ],
            critico: [
                'Contratação emergencial de pessoal',
                'Redistribuição imediata de demandas',
                'Monitoramento de saúde ocupacional',
                'Revisão completa de processos'
            ]
        },
        3: { // Reconhecimento
            baixo: [
                'Manter programas de reconhecimento atuais',
                'Continuar celebrando conquistas'
            ],
            moderado: [
                'Criar plano de cargos e salários estruturado',
                'Implementar avaliações de desempenho regulares',
                'Estabelecer programa de incentivos'
            ],
            alto: [
                'Revisar política de remuneração',
                'Criar comitê de reconhecimento',
                'Implementar feedbacks 360°'
            ],
            critico: [
                'Pesquisa salarial de mercado urgente',
                'Revisão imediata de benefícios',
                'Programa emergencial de valorização',
                'Plano de retenção de talentos'
            ]
        },
        4: { // Clima Organizacional
            baixo: [
                'Manter práticas de integração',
                'Continuar eventos de confraternização'
            ],
            moderado: [
                'Pesquisa de clima mais frequente',
                'Fortalecer comunicação interna',
                'Criar grupos de trabalho colaborativos'
            ],
            alto: [
                'Consultoria em clima organizacional',
                'Programa de desenvolvimento de liderança',
                'Revisão de valores e cultura'
            ],
            critico: [
                'Intervenção organizacional imediata',
                'Mediação de conflitos generalizada',
                'Reestruturação de gestão',
                'Suporte psicológico coletivo'
            ]
        },
        5: { // Autonomia
            baixo: [
                'Manter nível de autonomia atual',
                'Incentivar iniciativas individuais'
            ],
            moderado: [
                'Reduzir burocracia desnecessária',
                'Capacitar para tomada de decisão',
                'Delegar mais responsabilidades'
            ],
            alto: [
                'Revisar processos de aprovação',
                'Treinamento em empowerment',
                'Reduzir níveis hierárquicos'
            ],
            critico: [
                'Reestruturação do modelo de gestão',
                'Implementar gestão participativa',
                'Descentralização de decisões',
                'Revisão completa de alçadas'
            ]
        },
        6: { // Pressão e Metas
            baixo: [
                'Manter metas realistas',
                'Continuar apoio da liderança'
            ],
            moderado: [
                'Revisar viabilidade de metas',
                'Aumentar suporte para desafios',
                'Flexibilizar prazos quando possível'
            ],
            alto: [
                'Reavaliar sistema de metas',
                'Reduzir pressão excessiva',
                'Implementar acompanhamento mais próximo'
            ],
            critico: [
                'Suspensão temporária de metas agressivas',
                'Revisão completa de KPIs',
                'Suporte psicológico para equipe',
                'Treinamento de lideranças em gestão humanizada'
            ]
        },
        7: { // Insegurança
            baixo: [
                'Manter transparência comunicacional',
                'Continuar atualizações sobre empresa'
            ],
            moderado: [
                'Aumentar comunicação sobre estabilidade',
                'Criar planos de contingência transparentes',
                'Reuniões periódicas com equipe'
            ],
            alto: [
                'Comunicação urgente sobre situação real',
                'Plano de ação transparente',
                'Suporte emocional para equipe'
            ],
            critico: [
                'Intervenção de RH imediata',
                'Aconselhamento jurídico',
                'Programa de apoio psicológico',
                'Plano de reestruturação transparente'
            ]
        },
        8: { // Conflitos
            baixo: [
                'Manter canais de comunicação abertos',
                'Continuar mediações quando necessário'
            ],
            moderado: [
                'Treinamento em comunicação não-violenta',
                'Fortalecer papel do RH na mediação',
                'Criar protocolos de resolução'
            ],
            alto: [
                'Programa intensivo de gestão de conflitos',
                'Mediação profissional externa',
                'Reestruturar comunicação interna'
            ],
            critico: [
                'Intervenção externa especializada',
                'Afastamento temporário se necessário',
                'Reestruturação de equipes',
                'Programa emergencial de comunicação'
            ]
        },
        9: { // Vida Pessoal
            baixo: [
                'Manter políticas de flexibilidade',
                'Continuar programas de bem-estar'
            ],
            moderado: [
                'Revisar jornadas de trabalho',
                'Implementar home office/flexível',
                'Programas de qualidade de vida'
            ],
            alto: [
                'Reduzir horas extras obrigatórias',
                'Criar política de desconexão',
                'Benefícios focados em bem-estar'
            ],
            critico: [
                'Intervenção imediata em jornadas',
                'Programa de saúde mental urgente',
                'Licenças e afastamentos se necessário',
                'Revisão completa de cultura de trabalho'
            ]
        }
    };

    const classificacao = classificarRisco(pontuacao);
    const recomendacoes = recomendacoesPorTopico[topicoId];

    if (!recomendacoes) {
        return [];
    }

    return recomendacoes[classificacao.nivel] || [];
}

/**
 * Agregar resultados de múltiplos questionários de uma empresa
 */
export function agregarResultadosEmpresa(questionarios) {
    if (!questionarios || questionarios.length === 0) {
        return null;
    }

    const agregado = {
        totalRespostas: questionarios.length,
        resultadosMedios: {
            assedio: 0,
            carga_trabalho: 0,
            reconhecimento: 0,
            clima_organizacional: 0,
            autonomia: 0,
            pressao_metas: 0,
            inseguranca: 0,
            conflitos: 0,
            vida_pessoal: 0,
            risco_geral: 0
        },
        porSetor: {},
        distribuicao: {
            baixo: 0,
            moderado: 0,
            alto: 0,
            critico: 0
        }
    };

    // Somar todos os resultados
    questionarios.forEach(q => {
        const res = q.resultados;

        agregado.resultadosMedios.assedio += res.assedio;
        agregado.resultadosMedios.carga_trabalho += res.carga_trabalho;
        agregado.resultadosMedios.reconhecimento += res.reconhecimento;
        agregado.resultadosMedios.clima_organizacional += res.clima_organizacional;
        agregado.resultadosMedios.autonomia += res.autonomia;
        agregado.resultadosMedios.pressao_metas += res.pressao_metas;
        agregado.resultadosMedios.inseguranca += res.inseguranca;
        agregado.resultadosMedios.conflitos += res.conflitos;
        agregado.resultadosMedios.vida_pessoal += res.vida_pessoal;
        agregado.resultadosMedios.risco_geral += res.risco_geral;

        // Classificar para distribuição
        const classificacao = classificarRisco(res.risco_geral);
        agregado.distribuicao[classificacao.nivel]++;

        // Agregar por setor
        if (q.setor) {
            if (!agregado.porSetor[q.setor]) {
                agregado.porSetor[q.setor] = {
                    total: 0,
                    resultados: {
                        assedio: 0,
                        carga_trabalho: 0,
                        reconhecimento: 0,
                        clima_organizacional: 0,
                        autonomia: 0,
                        pressao_metas: 0,
                        inseguranca: 0,
                        conflitos: 0,
                        vida_pessoal: 0,
                        risco_geral: 0
                    }
                };
            }

            agregado.porSetor[q.setor].total++;
            const setor = agregado.porSetor[q.setor].resultados;
            setor.assedio += res.assedio;
            setor.carga_trabalho += res.carga_trabalho;
            setor.reconhecimento += res.reconhecimento;
            setor.clima_organizacional += res.clima_organizacional;
            setor.autonomia += res.autonomia;
            setor.pressao_metas += res.pressao_metas;
            setor.inseguranca += res.inseguranca;
            setor.conflitos += res.conflitos;
            setor.vida_pessoal += res.vida_pessoal;
            setor.risco_geral += res.risco_geral;
        }
    });

    // Calcular médias
    const total = questionarios.length;
    Object.keys(agregado.resultadosMedios).forEach(key => {
        agregado.resultadosMedios[key] /= total;
    });

    // Calcular médias por setor
    Object.keys(agregado.porSetor).forEach(setor => {
        const setorData = agregado.porSetor[setor];
        const setorTotal = setorData.total;

        Object.keys(setorData.resultados).forEach(key => {
            setorData.resultados[key] /= setorTotal;
        });
    });

    return agregado;
}

/**
 * Buscar questionários de uma empresa
 */
export async function buscarQuestionariosEmpresa(empresaId) {
    try {
        const q = query(
            collection(db, "questionarios_nr1"),
            where("empresaId", "==", empresaId)
        );

        const querySnapshot = await getDocs(q);
        const questionarios = [];

        querySnapshot.forEach((doc) => {
            questionarios.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return questionarios;
    } catch (error) {
        console.error('Erro ao buscar questionários:', error);
        throw error;
    }
}

/**
 * Buscar estatísticas gerais de todas as empresas
 */
export async function buscarEstatisticasGerais() {
    try {
        const querySnapshot = await getDocs(collection(db, "questionarios_nr1"));
        const questionarios = [];

        querySnapshot.forEach((doc) => {
            questionarios.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Agrupar por empresa
        const porEmpresa = {};
        questionarios.forEach(q => {
            if (!porEmpresa[q.empresaId]) {
                porEmpresa[q.empresaId] = [];
            }
            porEmpresa[q.empresaId].push(q);
        });

        return {
            totalQuestionarios: questionarios.length,
            totalEmpresas: Object.keys(porEmpresa).length,
            porEmpresa: porEmpresa
        };
    } catch (error) {
        console.error('Erro ao buscar estatísticas gerais:', error);
        throw error;
    }
}

/**
 * Nomes dos tópicos
 */
export const NOMES_TOPICOS = {
    assedio: 'Assédio',
    carga_trabalho: 'Carga de Trabalho',
    reconhecimento: 'Reconhecimento',
    clima_organizacional: 'Clima Organizacional',
    autonomia: 'Autonomia',
    pressao_metas: 'Pressão e Metas',
    inseguranca: 'Insegurança',
    conflitos: 'Conflitos',
    vida_pessoal: 'Vida Pessoal'
};

/**
 * Gerar relatório em texto
 */
export function gerarRelatorioTexto(agregado, nomeEmpresa) {
    const data = new Date().toLocaleDateString('pt-BR');
    const classificacaoGeral = classificarRisco(agregado.resultadosMedios.risco_geral);

    let relatorio = `
RELATÓRIO DE AVALIAÇÃO DE RISCOS PSICOSSOCIAIS (NR-1)
GlobalMind - Consultoria Organizacional

Empresa: ${nomeEmpresa}
Data: ${data}
Total de Respostas: ${agregado.totalRespostas}

═══════════════════════════════════════════════════════

RESULTADO GERAL
Risco Geral: ${agregado.resultadosMedios.risco_geral.toFixed(2)}/10
Classificação: ${classificacaoGeral.label}

═══════════════════════════════════════════════════════

RESULTADOS POR DIMENSÃO

`;

    Object.entries(NOMES_TOPICOS).forEach(([key, nome]) => {
        const pontuacao = agregado.resultadosMedios[key];
        const classificacao = classificarRisco(pontuacao);

        relatorio += `${nome}: ${pontuacao.toFixed(2)}/10 - ${classificacao.label}\n`;
    });

    relatorio += `\n═══════════════════════════════════════════════════════\n\n`;
    relatorio += `DISTRIBUIÇÃO DE RISCOS\n\n`;
    relatorio += `Baixo Risco: ${agregado.distribuicao.baixo} colaboradores\n`;
    relatorio += `Risco Moderado: ${agregado.distribuicao.moderado} colaboradores\n`;
    relatorio += `Risco Alto: ${agregado.distribuicao.alto} colaboradores\n`;
    relatorio += `Risco Crítico: ${agregado.distribuicao.critico} colaboradores\n`;

    return relatorio;
}
