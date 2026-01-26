// Questionário NR-1 - Avaliação de Riscos Psicossociais
// 90 questões divididas em 9 tópicos (10 questões cada)

export const TOPICOS = [
    {
        id: 1,
        nome: "Assédio",
        descricao: "Avaliação de situações de assédio moral e sexual no ambiente de trabalho"
    },
    {
        id: 2,
        nome: "Carga Excessiva de Trabalho",
        descricao: "Avaliação da sobrecarga e demandas de trabalho"
    },
    {
        id: 3,
        nome: "Reconhecimento e Recompensas",
        descricao: "Avaliação do reconhecimento e valorização profissional"
    },
    {
        id: 4,
        nome: "Clima Organizacional",
        descricao: "Avaliação do ambiente e cultura da empresa"
    },
    {
        id: 5,
        nome: "Autonomia e Controle sobre o Trabalho",
        descricao: "Avaliação da liberdade e controle sobre as atividades"
    },
    {
        id: 6,
        nome: "Pressão e Metas",
        descricao: "Avaliação da pressão por resultados e metas"
    },
    {
        id: 7,
        nome: "Insegurança e Ameaças",
        descricao: "Avaliação do sentimento de segurança no emprego"
    },
    {
        id: 8,
        nome: "Conflitos Interpessoais e Falta de Comunicação",
        descricao: "Avaliação da comunicação e resolução de conflitos"
    },
    {
        id: 9,
        nome: "Alinhamento entre Vida Pessoal e Profissional",
        descricao: "Avaliação do equilíbrio trabalho-vida pessoal"
    }
];

export const QUESTOES = [
    // TÓPICO 1 - ASSÉDIO (10 questões)
    { id: 1, topico: 1, texto: "Você já presenciou ou sofreu comentários ofensivos, piadas ou insinuações inadequadas no ambiente de trabalho?", invertida: false },
    { id: 2, topico: 1, texto: "Você se sente à vontade para relatar situações de assédio moral ou sexual na empresa sem medo de represálias?", invertida: true },
    { id: 3, topico: 1, texto: "Existe um canal seguro e sigiloso para denunciar assédio na empresa?", invertida: true },
    { id: 4, topico: 1, texto: "Você já recebeu tratamento desrespeitoso ou humilhante de colegas ou superiores?", invertida: false },
    { id: 5, topico: 1, texto: "Você sente que há favoritismo ou perseguição por parte da liderança?", invertida: false },
    { id: 6, topico: 1, texto: "Há casos conhecidos de assédio moral ou sexual que não foram devidamente investigados ou punidos?", invertida: false },
    { id: 7, topico: 1, texto: "A empresa realiza treinamentos ou campanhas de conscientização sobre assédio?", invertida: true },
    { id: 8, topico: 1, texto: "O RH e os gestores demonstram comprometimento real com a prevenção do assédio?", invertida: true },
    { id: 9, topico: 1, texto: "Você já foi forçado(a) a realizar tarefas humilhantes ou degradantes?", invertida: false },
    { id: 10, topico: 1, texto: "Existe uma cultura de 'brincadeiras' que desrespeitam funcionários? Já foi vítima de alguma delas?", invertida: false },

    // TÓPICO 2 - CARGA EXCESSIVA DE TRABALHO (10 questões)
    { id: 11, topico: 2, texto: "Você sente que sua carga de trabalho diária é superior à sua capacidade de execução dentro do horário normal?", invertida: false },
    { id: 12, topico: 2, texto: "Você frequentemente precisa fazer horas extras ou levar trabalho para casa?", invertida: false },
    { id: 13, topico: 2, texto: "As demandas e prazos estabelecidos são realistas e atingíveis?", invertida: true },
    { id: 14, topico: 2, texto: "Você sente que a empresa respeita seus limites físicos e mentais?", invertida: true },
    { id: 15, topico: 2, texto: "Você recebe pausas adequadas ao longo do dia?", invertida: true },
    { id: 16, topico: 2, texto: "Existe um equilíbrio entre tarefas administrativas e operacionais?", invertida: true },
    { id: 17, topico: 2, texto: "Há redistribuição de tarefas quando há sobrecarga em algum setor ou equipe?", invertida: true },
    { id: 18, topico: 2, texto: "Você já teve sintomas físicos ou emocionais (como ansiedade, exaustão, insônia) devido ao excesso de trabalho?", invertida: false },
    { id: 19, topico: 2, texto: "Existe flexibilidade para gerenciar sua própria carga de trabalho?", invertida: true },
    { id: 20, topico: 2, texto: "A equipe é dimensionada corretamente para a demanda da empresa?", invertida: true },

    // TÓPICO 3 - RECONHECIMENTO E RECOMPENSAS (10 questões)
    { id: 21, topico: 3, texto: "Você sente que seu esforço e desempenho são reconhecidos pela liderança?", invertida: true },
    { id: 22, topico: 3, texto: "A empresa possui políticas claras de promoção e progressão de carreira?", invertida: true },
    { id: 23, topico: 3, texto: "As avaliações de desempenho são justas e transparentes?", invertida: true },
    { id: 24, topico: 3, texto: "Você sente que há igualdade no reconhecimento entre diferentes áreas ou equipes?", invertida: true },
    { id: 25, topico: 3, texto: "A empresa oferece incentivos financeiros ou não financeiros pelo bom desempenho?", invertida: true },
    { id: 26, topico: 3, texto: "Você recebe feedback construtivo regularmente?", invertida: true },
    { id: 27, topico: 3, texto: "Existe uma cultura de valorização dos funcionários?", invertida: true },
    { id: 28, topico: 3, texto: "Você já se sentiu desmotivado(a) por falta de reconhecimento?", invertida: false },
    { id: 29, topico: 3, texto: "A empresa celebra conquistas individuais e coletivas?", invertida: true },
    { id: 30, topico: 3, texto: "O plano de benefícios da empresa é condizente com suas necessidades e expectativas?", invertida: true },

    // TÓPICO 4 - CLIMA ORGANIZACIONAL (10 questões)
    { id: 31, topico: 4, texto: "O ambiente de trabalho é amigável e colaborativo?", invertida: true },
    { id: 32, topico: 4, texto: "Existe um sentimento de confiança entre os colegas de trabalho?", invertida: true },
    { id: 33, topico: 4, texto: "Você se sente confortável para expressar suas opiniões na equipe?", invertida: true },
    { id: 34, topico: 4, texto: "Os gestores promovem um ambiente saudável e respeitoso?", invertida: true },
    { id: 35, topico: 4, texto: "Existe transparência na comunicação da empresa?", invertida: true },
    { id: 36, topico: 4, texto: "Você sente que pode contar com seus colegas em momentos de dificuldade?", invertida: true },
    { id: 37, topico: 4, texto: "Há um senso de propósito e pertencimento entre os funcionários?", invertida: true },
    { id: 38, topico: 4, texto: "Conflitos são resolvidos de forma justa e eficiente?", invertida: true },
    { id: 39, topico: 4, texto: "O ambiente físico do local de trabalho é confortável e seguro?", invertida: true },
    { id: 40, topico: 4, texto: "A cultura organizacional da empresa está alinhada com seus valores pessoais?", invertida: true },

    // TÓPICO 5 - AUTONOMIA E CONTROLE SOBRE O TRABALHO (10 questões)
    { id: 41, topico: 5, texto: "Você tem liberdade para tomar decisões sobre suas tarefas diárias?", invertida: true },
    { id: 42, topico: 5, texto: "Seu trabalho permite flexibilidade para adaptar sua rotina conforme necessário?", invertida: true },
    { id: 43, topico: 5, texto: "Você sente que tem voz ativa na empresa?", invertida: true },
    { id: 44, topico: 5, texto: "A empresa confia em sua capacidade de autogestão?", invertida: true },
    { id: 45, topico: 5, texto: "Você recebe instruções claras sobre suas responsabilidades?", invertida: true },
    { id: 46, topico: 5, texto: "O excesso de controle ou burocracia interfere no seu desempenho?", invertida: false },
    { id: 47, topico: 5, texto: "Suas sugestões são ouvidas e consideradas pela liderança?", invertida: true },
    { id: 48, topico: 5, texto: "Você tem acesso às ferramentas e recursos necessários para desempenhar bem seu trabalho?", invertida: true },
    { id: 49, topico: 5, texto: "Você sente que pode propor melhorias sem medo de represálias?", invertida: true },
    { id: 50, topico: 5, texto: "O excesso de supervisão impacta sua produtividade ou bem-estar?", invertida: false },

    // TÓPICO 6 - PRESSÃO E METAS (10 questões)
    { id: 51, topico: 6, texto: "As metas da empresa são realistas e atingíveis?", invertida: true },
    { id: 52, topico: 6, texto: "Você sente que há pressão excessiva para alcançar resultados?", invertida: false },
    { id: 53, topico: 6, texto: "A cobrança por metas impacta sua saúde mental ou emocional?", invertida: false },
    { id: 54, topico: 6, texto: "Existe apoio da liderança para lidar com desafios relacionados às metas?", invertida: true },
    { id: 55, topico: 6, texto: "Você sente que pode negociar prazos ou objetivos quando necessário?", invertida: true },
    { id: 56, topico: 6, texto: "A competitividade entre os funcionários é estimulada de maneira saudável?", invertida: true },
    { id: 57, topico: 6, texto: "Você já sentiu medo de punição por não atingir metas?", invertida: false },
    { id: 58, topico: 6, texto: "O sistema de avaliação de metas é transparente?", invertida: true },
    { id: 59, topico: 6, texto: "Você tem tempo suficiente para cumprir suas demandas com qualidade?", invertida: true },
    { id: 60, topico: 6, texto: "A pressão por resultados impacta negativamente o ambiente de trabalho?", invertida: false },

    // TÓPICO 7 - INSEGURANÇA E AMEAÇAS (10 questões)
    { id: 61, topico: 7, texto: "Você já sentiu que seu emprego está ameaçado sem justificativa clara?", invertida: false },
    { id: 62, topico: 7, texto: "A empresa faz cortes ou demissões repentinas sem aviso prévio?", invertida: false },
    { id: 63, topico: 7, texto: "Há comunicação clara sobre a estabilidade da empresa e dos empregos?", invertida: true },
    { id: 64, topico: 7, texto: "Você já sofreu ameaças veladas ou diretas no ambiente de trabalho?", invertida: false },
    { id: 65, topico: 7, texto: "Você sente que há transparência nas políticas de desligamento?", invertida: true },
    { id: 66, topico: 7, texto: "Mudanças organizacionais impactaram seu sentimento de segurança no trabalho?", invertida: false },
    { id: 67, topico: 7, texto: "Você já presenciou casos de demissões injustas?", invertida: false },
    { id: 68, topico: 7, texto: "O medo da demissão afeta seu desempenho?", invertida: false },
    { id: 69, topico: 7, texto: "A empresa oferece suporte psicológico para funcionários inseguros?", invertida: true },
    { id: 70, topico: 7, texto: "Você já evitou expressar sua opinião por medo de represálias?", invertida: false },

    // TÓPICO 8 - CONFLITOS INTERPESSOAIS E FALTA DE COMUNICAÇÃO (10 questões)
    { id: 71, topico: 8, texto: "Conflitos internos são resolvidos de maneira justa?", invertida: true },
    { id: 72, topico: 8, texto: "A comunicação entre equipes e departamentos é eficiente?", invertida: true },
    { id: 73, topico: 8, texto: "Você já evitou colegas ou superiores devido a desentendimentos?", invertida: false },
    { id: 74, topico: 8, texto: "Existe um canal aberto para feedback entre colaboradores e liderança?", invertida: true },
    { id: 75, topico: 8, texto: "A falta de comunicação já comprometeu seu trabalho?", invertida: false },
    { id: 76, topico: 8, texto: "Você sente que há rivalidade desnecessária entre setores?", invertida: false },
    { id: 77, topico: 8, texto: "Há treinamentos sobre comunicação assertiva e gestão de conflitos?", invertida: true },
    { id: 78, topico: 8, texto: "Você sente que pode expressar suas dificuldades sem ser julgado?", invertida: true },
    { id: 79, topico: 8, texto: "A empresa promove um ambiente de diálogo aberto?", invertida: true },
    { id: 80, topico: 8, texto: "O RH está presente e atuante na mediação de conflitos?", invertida: true },

    // TÓPICO 9 - ALINHAMENTO ENTRE VIDA PESSOAL E PROFISSIONAL (10 questões)
    { id: 81, topico: 9, texto: "Você sente que a sua jornada de trabalho permite equilíbrio com sua vida pessoal?", invertida: true },
    { id: 82, topico: 9, texto: "Você sente que tem tempo para sua família e lazer?", invertida: true },
    { id: 83, topico: 9, texto: "O trabalho impacta negativamente sua saúde mental?", invertida: false },
    { id: 84, topico: 9, texto: "Você tem flexibilidade para lidar com questões pessoais urgentes?", invertida: true },
    { id: 85, topico: 9, texto: "A empresa oferece suporte para equilíbrio entre trabalho e vida pessoal?", invertida: true },
    { id: 86, topico: 9, texto: "Você consegue se desconectar do trabalho fora do expediente?", invertida: true },
    { id: 87, topico: 9, texto: "Você sente que sua vida pessoal é respeitada pela empresa?", invertida: true },
    { id: 88, topico: 9, texto: "Há incentivo ao bem-estar e qualidade de vida no trabalho?", invertida: true },
    { id: 89, topico: 9, texto: "O estresse profissional afeta sua vida familiar?", invertida: false },
    { id: 90, topico: 9, texto: "O ambiente corporativo valoriza o descanso e recuperação dos funcionários?", invertida: true }
];

export const OPCOES_RESPOSTA = [
    { valor: 0, label: "Nunca" },
    { valor: 1, label: "Raramente" },
    { valor: 2, label: "Ocasionalmente" },
    { valor: 3, label: "Frequentemente" },
    { valor: 4, label: "Sempre" }
];

/**
 * Obter questões de um tópico específico
 */
export function getQuestoesTopico(topicoId) {
    return QUESTOES.filter(q => q.topico === topicoId);
}

/**
 * Validar se todas as questões de um tópico foram respondidas
 */
export function validarTopicoCompleto(respostas, topicoId) {
    const questoes = getQuestoesTopico(topicoId);
    return questoes.every(q => respostas[q.id] !== undefined && respostas[q.id] !== null);
}

/**
 * Validar se todos os tópicos foram respondidos
 */
export function validarQuestionarioCompleto(respostas) {
    return QUESTOES.every(q => respostas[q.id] !== undefined && respostas[q.id] !== null);
}

/**
 * Calcular pontuação de um tópico
 * Retorna valor de 0 a 10, onde maior = maior risco
 */
export function calcularPontuacaoTopico(respostas, topicoId) {
    const questoes = getQuestoesTopico(topicoId);
    let soma = 0;

    questoes.forEach(questao => {
        let valor = respostas[questao.id] || 0;

        // Se a questão é invertida (positiva), inverter o valor
        // Questão invertida: 0=ruim, 4=bom → transformar em 4=ruim, 0=bom
        if (questao.invertida) {
            valor = 4 - valor;
        }

        soma += valor;
    });

    // Pontuação máxima por tópico = 10 questões × 4 pontos = 40
    // Converter para escala 0-10
    return (soma / 40) * 10;
}

/**
 * Calcular todas as pontuações
 */
export function calcularResultados(respostas) {
    const resultados = {
        assedio: calcularPontuacaoTopico(respostas, 1),
        carga_trabalho: calcularPontuacaoTopico(respostas, 2),
        reconhecimento: calcularPontuacaoTopico(respostas, 3),
        clima_organizacional: calcularPontuacaoTopico(respostas, 4),
        autonomia: calcularPontuacaoTopico(respostas, 5),
        pressao_metas: calcularPontuacaoTopico(respostas, 6),
        inseguranca: calcularPontuacaoTopico(respostas, 7),
        conflitos: calcularPontuacaoTopico(respostas, 8),
        vida_pessoal: calcularPontuacaoTopico(respostas, 9)
    };

    // Calcular risco geral (média simples)
    const valores = Object.values(resultados);
    resultados.risco_geral = valores.reduce((a, b) => a + b, 0) / valores.length;

    return resultados;
}

/**
 * Classificar nível de risco
 */
export function classificarRisco(pontuacao) {
    if (pontuacao <= 2.5) {
        return { nivel: 'baixo', label: 'Baixo Risco', cor: '#22c55e' };
    } else if (pontuacao <= 5.0) {
        return { nivel: 'moderado', label: 'Risco Moderado', cor: '#f59e0b' };
    } else if (pontuacao <= 7.5) {
        return { nivel: 'alto', label: 'Risco Alto', cor: '#fb923c' };
    } else {
        return { nivel: 'critico', label: 'Risco Crítico', cor: '#dc3545' };
    }
}

/**
 * Organizar respostas por tópico para salvar no Firestore
 */
export function organizarRespostasPorTopico(respostas) {
    const respostasPorTopico = {};

    for (let i = 1; i <= 9; i++) {
        const questoes = getQuestoesTopico(i);
        respostasPorTopico[`topico${i}`] = questoes.map(q => respostas[q.id] || 0);
    }

    return respostasPorTopico;
}

/**
 * Gerar link do questionário
 */
export function gerarLinkQuestionario(empresaId) {
    const baseUrl = window.location.origin;
    return `${baseUrl}/convite.html?empresa=${empresaId}`;
}
