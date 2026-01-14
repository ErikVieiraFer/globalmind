// Cálculo dos índices DISC
function calcularResultados() {
    // Re-definindo a estrutura de perguntas para ter acesso aos pesos.
    // Em uma aplicação real, isso viria de um módulo compartilhado ou API.
    const perguntas = [
        { id: 1, pesos: { sobrecarga_lider: [0, 2, 5, 8, 10], dependencia_dono: [0, 1, 3, 6, 8] } },
        { id: 2, pesos: { sobrecarga_lider: [1, 3, 6, 8, 10], risco_psicossocial: [1, 3, 5, 7, 9] } },
        { id: 3, pesos: { dependencia_dono: [0, 3, 6, 8, 10], escalabilidade_humana: [10, 7, 4, 2, 0] } },
        { id: 4, pesos: { maturidade_emocional: [10, 7, 5, 2, 0], sobrecarga_lider: [0, 2, 4, 7, 9] } },
        { id: 5, pesos: { conflito_geracional: [0, 2, 5, 8, 10], maturidade_emocional: [9, 7, 5, 3, 1] } },
        { id: 6, pesos: { escalabilidade_humana: [10, 8, 5, 2, 0], dependencia_dono: [1, 3, 5, 7, 9] } },
        { id: 7, pesos: { maturidade_emocional: [10, 8, 5, 2, 0], risco_psicossocial: [1, 3, 5, 7, 9] } },
        { id: 8, pesos: { escalabilidade_humana: [9, 7, 4, 2, 0], dependencia_dono: [2, 4, 6, 8, 10] } },
        { id: 9, pesos: { risco_psicossocial: [0, 3, 6, 8, 10], maturidade_emocional: [9, 7, 5, 3, 1] } },
        { id: 10, pesos: { conflito_geracional: [0, 2, 5, 8, 10] } },
        { id: 11, pesos: { dependencia_dono: [1, 3, 5, 8, 10], escalabilidade_humana: [9, 7, 4, 2, 0] } },
        { id: 12, pesos: { maturidade_emocional: [10, 8, 5, 2, 0], risco_psicossocial: [0, 2, 4, 7, 9] } }
    ];

    const respostas = JSON.parse(localStorage.getItem('globalmind_respostas'));
    if (!respostas) {
        console.error("Respostas não encontradas no localStorage.");
        return null;
    }

    const indices = {
        sobrecarga_lider: { soma: 0, max: 0 },
        dependencia_dono: { soma: 0, max: 0 },
        maturidade_emocional: { soma: 0, max: 0 },
        risco_psicossocial: { soma: 0, max: 0 },
        conflito_geracional: { soma: 0, max: 0 },
        escalabilidade_humana: { soma: 0, max: 0 }
    };

    // Itera sobre as perguntas para calcular a soma dos pesos das respostas
    perguntas.forEach(pergunta => {
        const respostaIndex = respostas[pergunta.id];
        if (respostaIndex === undefined) return;

        for (const indice in pergunta.pesos) {
            if (indices.hasOwnProperty(indice)) {
                indices[indice].soma += pergunta.pesos[indice][respostaIndex];
            }
        }
    });

    // Itera novamente para calcular o valor máximo possível para cada índice
    perguntas.forEach(pergunta => {
        for (const indice in pergunta.pesos) {
            if (indices.hasOwnProperty(indice)) {
                indices[indice].max += Math.max(...pergunta.pesos[indice]);
            }
        }
    });

    // Calcula a pontuação final (0 a 10) para cada índice
    const resultadosFinais = {};
    for (const indice in indices) {
        if (indices[indice].max > 0) {
            resultadosFinais[indice] = (indices[indice].soma / indices[indice].max) * 10;
        } else {
            resultadosFinais[indice] = 0;
        }
    }

    return resultadosFinais;
}
