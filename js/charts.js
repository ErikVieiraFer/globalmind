// Configuração dos gráficos
function criarGraficoRadar(ctx, resultados) {
    const labels = [
        'Sobrecarga do Líder',
        'Dependência no Dono',
        'Maturidade Emocional',
        'Risco Psicossocial',
        'Conflito Geracional',
        'Escalabilidade Humana'
    ];
    const data = [
        resultados.sobrecarga_lider,
        resultados.dependencia_dono,
        resultados.maturidade_emocional,
        resultados.risco_psicossocial,
        resultados.conflito_geracional,
        resultados.escalabilidade_humana
    ];

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pontuação do Diagnóstico',
                data: data,
                fill: true,
                backgroundColor: 'rgba(109, 113, 65, 0.2)',
                borderColor: 'rgb(109, 113, 65)',
                pointBackgroundColor: 'rgb(109, 113, 65)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(109, 113, 65)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 10,
                    pointLabels: {
                        font: {
                            size: 12,
                            family: "'Source Sans 3', sans-serif"
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            maintainAspectRatio: false
        }
    });
}

function criarGraficoBarras(ctx, resultados) {
    const labels = [
        'Sobrecarga',
        'Dependência',
        'Maturidade',
        'Risco',
        'Conflito',
        'Escalabilidade'
    ];
    const data = [
        resultados.sobrecarga_lider,
        resultados.dependencia_dono,
        resultados.maturidade_emocional,
        resultados.risco_psicossocial,
        resultados.conflito_geracional,
        resultados.escalabilidade_humana
    ];

    const getBarColor = (value) => {
        if (value >= 7) return '#dc3545'; // danger
        if (value >= 4) return '#f59e0b'; // warning
        return '#22c55e'; // success
    };

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pontuação dos Índices',
                data: data,
                backgroundColor: data.map(getBarColor),
                borderColor: data.map(getBarColor),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 10
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            maintainAspectRatio: false
        }
    });
}
