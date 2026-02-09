import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const questionarioContainer = document.getElementById('questionario-container');
    const progressBar = document.getElementById('progress-bar');
    const welcomeScreen = document.getElementById('welcome-screen');
    const startButton = document.getElementById('start-button');
    const empresaInput = document.getElementById('empresa-nome');
    const respondenteInput = document.getElementById('respondente-nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');

    const perguntas = [
        {
            id: 1,
            texto: "Com que frequência você se sente sobrecarregado com decisões que poderiam ser tomadas por outros?",
            tipo: "escala",
            opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
            pesos: { sobrecarga_lider: [0, 2, 5, 8, 10], dependencia_dono: [0, 1, 3, 6, 8] }
        },
        {
            id: 2,
            texto: "Quantas horas por semana você trabalha além do horário comercial padrão?",
            tipo: "escala",
            opcoes: ["0-5 horas", "6-10 horas", "11-15 horas", "16-20 horas", "Mais de 20 horas"],
            pesos: { sobrecarga_lider: [1, 3, 6, 8, 10], risco_psicossocial: [1, 3, 5, 7, 9] }
        },
        {
            id: 3,
            texto: "Se você tirasse férias de 30 dias, completamente offline, como a empresa operaria?",
            tipo: "escala",
            opcoes: ["Normalmente, sem problemas", "Com pequenas dificuldades", "Com dificuldades significativas", "Entraria em crise", "Deixaria de operar"],
            pesos: { dependencia_dono: [0, 3, 6, 8, 10], escalabilidade_humana: [10, 7, 4, 2, 0] }
        },
        {
            id: 4,
            texto: "Como você descreveria a clareza dos papéis e responsabilidades na sua equipe?",
            tipo: "escala",
            opcoes: ["Totalmente claros e definidos", "Claros na maior parte", "Parcialmente claros", "Pouco claros", "Totalmente indefinidos"],
            pesos: { maturidade_emocional: [10, 7, 5, 2, 0], sobrecarga_lider: [0, 2, 4, 7, 9] }
        },
        {
            id: 5,
            texto: "Com que frequência ocorrem conflitos ou mal-entendidos entre gerações diferentes na sua equipe (ex: Baby Boomers vs. Geração Z)?",
            tipo: "escala",
            opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Constantemente"],
            pesos: { conflito_geracional: [0, 2, 5, 8, 10], maturidade_emocional: [9, 7, 5, 3, 1] }
        },
        {
            id: 6,
            texto: "A empresa possui processos documentados e seguidos pela equipe, independentemente de quem os executa?",
            tipo: "escala",
            opcoes: ["Sim, para todas as áreas críticas", "Sim, para a maioria", "Para algumas áreas", "Para poucas áreas", "Não, tudo depende das pessoas"],
            pesos: { escalabilidade_humana: [10, 8, 5, 2, 0], dependencia_dono: [1, 3, 5, 7, 9] }
        },
        {
            id: 7,
            texto: "Qual o nível de abertura da equipe para dar e receber feedback construtivo, mesmo que difícil?",
            tipo: "escala",
            opcoes: ["Muito alto, é parte da cultura", "Alto, mas com ressalvas", "Médio, há hesitação", "Baixo, as pessoas evitam", "Nulo, há medo de retaliação"],
            pesos: { maturidade_emocional: [10, 8, 5, 2, 0], risco_psicossocial: [1, 3, 5, 7, 9] }
        },
        {
            id: 8,
            texto: "A promoção e o desenvolvimento de novos líderes é um processo estruturado na empresa?",
            tipo: "escala",
            opcoes: ["Sim, temos um plano de carreira claro", "Em desenvolvimento", "Ocorre de forma reativa", "Raramente acontece", "Não, as posições de liderança são fixas"],
            pesos: { escalabilidade_humana: [9, 7, 4, 2, 0], dependencia_dono: [2, 4, 6, 8, 10] }
        },
        {
            id: 9,
            texto: "Como você avalia o equilíbrio entre vida pessoal e profissional incentivado pela empresa?",
            tipo: "escala",
            opcoes: ["Excelente, é uma prioridade", "Bom, mas pode melhorar", "Regular, com picos de desequilíbrio", "Ruim, a cultura valoriza o excesso de trabalho", "Péssimo, o burnout é comum"],
            pesos: { risco_psicossocial: [0, 3, 6, 8, 10], maturidade_emocional: [9, 7, 5, 3, 1] }
        },
        {
            id: 10,
            texto: "Existem diferenças de opinião claras sobre 'como as coisas devem ser feitas' entre os mais jovens e os mais velhos da equipe?",
            tipo: "escala",
            opcoes: ["Não, estamos bem alinhados", "Poucas e são bem gerenciadas", "Sim, e geram alguns debates", "Sim, e causam atritos frequentes", "Sim, é uma fonte constante de conflito"],
            pesos: { conflito_geracional: [0, 2, 5, 8, 10] }
        },
        {
            id: 11,
            texto: "Se um colaborador chave pedisse demissão hoje, o conhecimento dele estaria retido na empresa?",
            tipo: "escala",
            opcoes: ["Sim, totalmente documentado", "Em grande parte", "Parcialmente", "Muito pouco", "Não, o conhecimento iria com ele"],
            pesos: { dependencia_dono: [1, 3, 5, 8, 10], escalabilidade_humana: [9, 7, 4, 2, 0] }
        },
        {
            id: 12,
            texto: "A liderança se sente confortável em demonstrar vulnerabilidade e admitir erros perante a equipe?",
            tipo: "escala",
            opcoes: ["Sim, é um exemplo vindo de cima", "Na maioria das vezes", "Às vezes, depende da situação", "Raramente", "Nunca, a liderança precisa ser infalível"],
            pesos: { maturidade_emocional: [10, 8, 5, 2, 0], risco_psicossocial: [0, 2, 4, 7, 9] }
        }
    ];

    let respostas = {};
    let perguntaAtualIndex = 0;

    if (startButton) {
        startButton.addEventListener('click', () => {
            const empresa = empresaInput.value.trim();
            const respondente = respondenteInput.value.trim();
            const email = emailInput.value.trim();
            const telefone = telefoneInput.value.trim();

            // Validações
            if (!empresa || !respondente || !email || !telefone) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }

            // Validar telefone (mínimo 10 dígitos)
            const telefoneLimpo = telefone.replace(/\D/g, '');
            if (telefoneLimpo.length < 10) {
                alert('Por favor, insira um telefone válido com no mínimo 10 dígitos.');
                return;
            }

            // Gerar Visitor ID se não existir
            let visitorId = localStorage.getItem('globalmind_visitorId');
            if (!visitorId) {
                visitorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
                localStorage.setItem('globalmind_visitorId', visitorId);
            }

            // Salvar todos os dados no localStorage
            localStorage.setItem('globalmind_empresa', empresa);
            localStorage.setItem('globalmind_respondente', respondente);
            localStorage.setItem('globalmind_email', email);
            localStorage.setItem('globalmind_telefone', telefone);
            localStorage.setItem('globalmind_data', new Date().toISOString());

            welcomeScreen.classList.add('fade-out');
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                questionarioContainer.style.display = 'block';
                renderizarPergunta(perguntaAtualIndex);
            }, 500);
        });
    }

    function renderizarPergunta(index) {
        const pergunta = perguntas[index];
        if (!pergunta) return;

        let opcoesHtml = '';
        if (pergunta.tipo === 'escala') {
            opcoesHtml = pergunta.opcoes.map((opcao, i) => `
                <li class="list-group-item list-group-item-action">
                    <input type="radio" id="opcao-${i}" name="resposta" value="${i}" class="form-check-input me-2">
                    <label for="opcao-${i}">${opcao}</label>
                </li>
            `).join('');
        }
        // Adicionar outros tipos de pergunta como 'multipla' aqui se necessário

        questionarioContainer.innerHTML = `
            <div class="card fade-in">
                <div class="card-header">
                    Pergunta ${pergunta.id} de ${perguntas.length}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${pergunta.texto}</h5>
                    <ul class="list-group mt-4">
                        ${opcoesHtml}
                    </ul>
                </div>
                <div class="card-footer text-end">
                    <button id="next-button" class="btn btn-primary" disabled>Próxima</button>
                </div>
            </div>
        `;

        atualizarBarraDeProgresso();

        const nextButton = document.getElementById('next-button');
        const inputs = questionarioContainer.querySelectorAll('input[name="resposta"]');
        const listItems = questionarioContainer.querySelectorAll('.list-group-item');

        // Permitir seleção clicando em qualquer lugar do item da lista
        listItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const input = item.querySelector('input[type="radio"]');
                if (e.target !== input && e.target.tagName !== 'LABEL') {
                    input.checked = true;
                    nextButton.disabled = false;
                }
            });
        });

        inputs.forEach(input => {
            input.addEventListener('change', () => {
                nextButton.disabled = false;
            });
        });

        nextButton.addEventListener('click', () => {
            const respostaSelecionada = document.querySelector('input[name="resposta"]:checked');
            if (respostaSelecionada) {
                salvarResposta(pergunta.id, parseInt(respostaSelecionada.value));
                proximaPergunta();
            }
        });
    }

    function salvarResposta(perguntaId, respostaIndex) {
        respostas[perguntaId] = respostaIndex;
        localStorage.setItem('globalmind_respostas', JSON.stringify(respostas));
    }

    function proximaPergunta() {
        perguntaAtualIndex++;
        if (perguntaAtualIndex < perguntas.length) {
            questionarioContainer.firstElementChild.classList.add('fade-out');
            setTimeout(() => {
                renderizarPergunta(perguntaAtualIndex);
            }, 500);
        } else {
            finalizarQuestionario();
        }
    }

    function atualizarBarraDeProgresso() {
        const progresso = (perguntaAtualIndex / perguntas.length) * 100;
        progressBar.style.width = `${progresso}%`;
        progressBar.setAttribute('aria-valuenow', progresso);
    }

    async function finalizarQuestionario() {
        questionarioContainer.innerHTML = `
            <div class="card text-center fade-in">
                <div class="card-body">
                    <h5 class="card-title">Questionário Concluído!</h5>
                    <p class="card-text">Obrigado por suas respostas. Estamos preparando seu diagnóstico.</p>
                    <div class="spinner-border text-primary mt-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        `;
        progressBar.style.width = `100%`;
        progressBar.classList.remove('bg-primary');
        progressBar.classList.add('bg-success');

        // Calcular resultados para salvar no Firestore
        // A função calcularResultados() deve estar disponível globalmente via calculos.js
        const resultados = window.calcularResultados ? window.calcularResultados() : {};

        try {
            await addDoc(collection(db, "diagnosticos"), {
                visitorId: localStorage.getItem('globalmind_visitorId'),
                nomeEmpresa: localStorage.getItem('globalmind_empresa'),
                nomeRespondente: localStorage.getItem('globalmind_respondente'),
                email: localStorage.getItem('globalmind_email') || '',
                telefone: localStorage.getItem('globalmind_telefone') || '',
                respostas: JSON.parse(localStorage.getItem('globalmind_respostas')),
                resultados: resultados,
                criadoEm: serverTimestamp(),
                convertido: false,
                visualizadoAdmin: false
            });

            setTimeout(() => {
                window.location.href = 'obrigado.html';
            }, 1500);

        } catch (e) {
            console.error("Erro ao salvar diagnóstico: ", e);
            alert('Erro ao salvar diagnóstico. Por favor, tente novamente.');
        }
    }
});
