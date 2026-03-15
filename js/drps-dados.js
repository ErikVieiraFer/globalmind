/**
 * drps-dados.js
 * Configuração dos 9 tópicos do Questionário DRPS NR-01.
 *
 * Escala Likert: 0 = Nunca | 1 = Raramente | 2 = Ocasionalmente
 *                3 = Frequentemente | 4 = Sempre
 *
 * invertida: true → pontuação alta = MENOR risco (ex: "Me sinto respeitado")
 *            false → pontuação alta = MAIOR risco (ex: "Sofri assédio")
 *
 * A inversão é aplicada no cálculo final, não aqui.
 * As respostas brutas são salvas no sessionStorage como drps_t1..drps_t9.
 */

export const TOPICOS = [
  {
    numero: 1,
    chave: 'assedio',
    titulo: 'Assédio',
    descricao: 'Avalia a ocorrência de comportamentos abusivos, humilhantes ou discriminatórios no ambiente de trabalho.',
    perguntas: [
      { id: 't1q1',  texto: 'Você já sofreu ou presenciou comentários ofensivos, piadas humilhantes ou críticas depreciadoras no trabalho?',          invertida: false },
      { id: 't1q2',  texto: 'Você já se sentiu excluído(a) ou ignorado(a) propositalmente por colegas ou líderes?',                                     invertida: false },
      { id: 't1q3',  texto: 'Já recebeu ordens humilhantes ou foi obrigado(a) a realizar tarefas abaixo da sua função como forma de punição?',          invertida: false },
      { id: 't1q4',  texto: 'Você se sente monitorado(a) de forma excessiva ou com sua privacidade invadida no ambiente de trabalho?',                  invertida: false },
      { id: 't1q5',  texto: 'Já sofreu ameaças ou pressões que colocam em risco sua segurança no emprego?',                                             invertida: false },
      { id: 't1q6',  texto: 'Você se sente respeitado(a) pelos colegas e pela liderança no dia a dia?',                                                 invertida: true  },
      { id: 't1q7',  texto: 'Você se sente à vontade para relatar situações de assédio ou desconforto na empresa?',                                     invertida: true  },
      { id: 't1q8',  texto: 'A empresa possui canais seguros e acessíveis para denúncias de assédio?',                                                  invertida: true  },
      { id: 't1q9',  texto: 'Você já sofreu ou testemunhou agressões verbais graves ou comportamentos intimidadores no trabalho?',                      invertida: false },
      { id: 't1q10', texto: 'Você já presenciou ou sofreu discriminação por raça, gênero, idade, religião ou outras características pessoais?',         invertida: false }
    ]
  },
  {
    numero: 2,
    chave: 'carga_trabalho',
    titulo: 'Carga de Trabalho',
    descricao: 'Avalia a quantidade e intensidade das demandas físicas e cognitivas impostas pelo trabalho.',
    perguntas: [
      { id: 't2q1',  texto: 'Você tem mais tarefas do que consegue realizar dentro do horário de trabalho?',                                             invertida: false },
      { id: 't2q2',  texto: 'É necessário trabalhar em ritmo acelerado para cumprir as demandas do dia?',                                               invertida: false },
      { id: 't2q3',  texto: 'Você precisa continuar trabalhando fora do horário ou levar trabalho para casa com frequência?',                           invertida: false },
      { id: 't2q4',  texto: 'Você consegue realizar seu trabalho com qualidade dentro do tempo disponível?',                                             invertida: true  },
      { id: 't2q5',  texto: 'A carga de trabalho interfere negativamente na sua saúde física (dores, cansaço extremo, etc.)?',                          invertida: false },
      { id: 't2q6',  texto: 'Você consegue fazer pausas adequadas durante a jornada de trabalho?',                                                      invertida: true  },
      { id: 't2q7',  texto: 'Sente que a carga de trabalho é distribuída de forma justa entre os membros da equipe?',                                   invertida: true  },
      { id: 't2q8',  texto: 'As metas e prazos estabelecidos são realistas e alcançáveis?',                                                             invertida: true  },
      { id: 't2q9',  texto: 'Você se sente sobrecarregado(a) a ponto de comprometer sua saúde mental?',                                                invertida: false },
      { id: 't2q10', texto: 'O volume de demandas impede que você execute seu trabalho com atenção e cuidado adequados?',                               invertida: false }
    ]
  },
  {
    numero: 3,
    chave: 'reconhecimento',
    titulo: 'Reconhecimento',
    descricao: 'Avalia a percepção de valorização, recompensa justa e oportunidades de crescimento profissional.',
    perguntas: [
      { id: 't3q1',  texto: 'Seu trabalho é reconhecido e valorizado pela liderança?',                                                                  invertida: true  },
      { id: 't3q2',  texto: 'Você recebe feedback positivo quando realiza um bom trabalho?',                                                            invertida: true  },
      { id: 't3q3',  texto: 'Você sente que suas contribuições fazem diferença para a empresa?',                                                        invertida: true  },
      { id: 't3q4',  texto: 'Há oportunidades reais de crescimento e desenvolvimento profissional na empresa?',                                         invertida: true  },
      { id: 't3q5',  texto: 'Você se sente ignorado(a) ou invisível no ambiente de trabalho?',                                                         invertida: false },
      { id: 't3q6',  texto: 'A empresa oferece remuneração e benefícios justos em relação ao esforço exigido?',                                         invertida: true  },
      { id: 't3q7',  texto: 'Você sente que trabalha muito e recebe pouco reconhecimento em troca?',                                                    invertida: false },
      { id: 't3q8',  texto: 'Sua opinião e sugestões são levadas em consideração pela liderança?',                                                      invertida: true  },
      { id: 't3q9',  texto: 'Você é tratado(a) de forma diferente ou injusta em relação a outros colegas?',                                             invertida: false },
      { id: 't3q10', texto: 'A empresa celebra conquistas e resultados alcançados pela equipe?',                                                        invertida: true  }
    ]
  },
  {
    numero: 4,
    chave: 'clima_organizacional',
    titulo: 'Clima Organizacional',
    descricao: 'Avalia a qualidade das relações, comunicação e transparência dentro da organização.',
    perguntas: [
      { id: 't4q1',  texto: 'O ambiente de trabalho é agradável, colaborativo e estimulante?',                                                          invertida: true  },
      { id: 't4q2',  texto: 'Há conflitos frequentes entre colegas ou entre equipes na empresa?',                                                       invertida: false },
      { id: 't4q3',  texto: 'Você confia na liderança e nas decisões tomadas pela empresa?',                                                            invertida: true  },
      { id: 't4q4',  texto: 'As informações importantes são comunicadas de forma clara, honesta e oportuna?',                                           invertida: true  },
      { id: 't4q5',  texto: 'Você sente que a empresa se preocupa genuinamente com o bem-estar dos colaboradores?',                                     invertida: true  },
      { id: 't4q6',  texto: 'Há favoritismo ou tratamento desigual entre os colaboradores?',                                                            invertida: false },
      { id: 't4q7',  texto: 'Você se sente à vontade para expressar sua opinião sem medo de represálias?',                                             invertida: true  },
      { id: 't4q8',  texto: 'A empresa estimula um ambiente de respeito mútuo e cooperação entre as equipes?',                                         invertida: true  },
      { id: 't4q9',  texto: 'O clima da empresa contribui negativamente para sua motivação e engajamento?',                                             invertida: false },
      { id: 't4q10', texto: 'Fofocas, intrigas ou comportamentos tóxicos são comuns no seu ambiente de trabalho?',                                     invertida: false }
    ]
  },
  {
    numero: 5,
    chave: 'autonomia',
    titulo: 'Autonomia',
    descricao: 'Avalia o grau de liberdade, participação nas decisões e controle sobre o próprio trabalho.',
    perguntas: [
      { id: 't5q1',  texto: 'Você tem liberdade para tomar decisões relacionadas ao seu próprio trabalho?',                                             invertida: true  },
      { id: 't5q2',  texto: 'Pode organizar suas tarefas e definir suas próprias prioridades no dia a dia?',                                            invertida: true  },
      { id: 't5q3',  texto: 'Você precisa pedir permissão para realizar atividades básicas do seu trabalho?',                                           invertida: false },
      { id: 't5q4',  texto: 'Suas ideias e iniciativas são apoiadas e incentivadas pela liderança?',                                                    invertida: true  },
      { id: 't5q5',  texto: 'Sente que é monitorado(a) de forma excessiva, sem espaço para autonomia?',                                               invertida: false },
      { id: 't5q6',  texto: 'Você participa das decisões que afetam diretamente o seu trabalho?',                                                      invertida: true  },
      { id: 't5q7',  texto: 'Tem acesso às ferramentas e recursos necessários para trabalhar com independência?',                                       invertida: true  },
      { id: 't5q8',  texto: 'Seu trabalho exige seguir regras rígidas sem qualquer possibilidade de adaptação?',                                        invertida: false },
      { id: 't5q9',  texto: 'Você se sente responsável e orgulhoso(a) pelas decisões que toma no trabalho?',                                           invertida: true  },
      { id: 't5q10', texto: 'A microgestão prejudica sua produtividade e motivação no trabalho?',                                                       invertida: false }
    ]
  },
  {
    numero: 6,
    chave: 'pressao_metas',
    titulo: 'Pressão por Metas',
    descricao: 'Avalia o impacto da cobrança por resultados sobre a saúde mental e o comportamento dos colaboradores.',
    perguntas: [
      { id: 't6q1',  texto: 'As metas estabelecidas são alcançáveis e condizentes com a realidade do trabalho?',                                        invertida: true  },
      { id: 't6q2',  texto: 'Você se sente pressionado(a) a atingir resultados a qualquer custo, mesmo comprometendo a saúde?',                        invertida: false },
      { id: 't6q3',  texto: 'A pressão por metas afeta negativamente sua saúde mental (ansiedade, estresse, esgotamento)?',                            invertida: false },
      { id: 't6q4',  texto: 'Você sente medo de consequências negativas (punições, demissão) caso não atinja as metas?',                               invertida: false },
      { id: 't6q5',  texto: 'As metas são claramente definidas e comunicadas com antecedência adequada?',                                              invertida: true  },
      { id: 't6q6',  texto: 'Você tem recursos e suporte suficientes para atingir os objetivos propostos?',                                             invertida: true  },
      { id: 't6q7',  texto: 'A competição interna entre colegas gera um ambiente de trabalho hostil ou desleal?',                                      invertida: false },
      { id: 't6q8',  texto: 'As cobranças por resultados são feitas de forma respeitosa e construtiva?',                                               invertida: true  },
      { id: 't6q9',  texto: 'A pressão por resultados interfere na qualidade e atenção com que você executa seu trabalho?',                            invertida: false },
      { id: 't6q10', texto: 'Você consegue se desconectar mentalmente do trabalho fora do expediente?',                                                invertida: true  }
    ]
  },
  {
    numero: 7,
    chave: 'inseguranca',
    titulo: 'Insegurança no Trabalho',
    descricao: 'Avalia a percepção de instabilidade, incerteza e falta de previsibilidade sobre o futuro profissional.',
    perguntas: [
      { id: 't7q1',  texto: 'Você tem medo de perder o emprego sem motivo justo ou sem aviso prévio?',                                                 invertida: false },
      { id: 't7q2',  texto: 'Você sente estabilidade e segurança em relação ao seu cargo atual?',                                                      invertida: true  },
      { id: 't7q3',  texto: 'Há mudanças organizacionais frequentes que geram incerteza e insegurança nos colaboradores?',                             invertida: false },
      { id: 't7q4',  texto: 'Você se sente ameaçado(a) por situações fora do seu controle no trabalho?',                                              invertida: false },
      { id: 't7q5',  texto: 'A empresa comunica de forma transparente mudanças que afetam os colaboradores?',                                          invertida: true  },
      { id: 't7q6',  texto: 'Sente que seu cargo pode ser eliminado ou substituído a qualquer momento?',                                               invertida: false },
      { id: 't7q7',  texto: 'As condições do seu contrato de trabalho são claras, estáveis e respeitadas?',                                            invertida: true  },
      { id: 't7q8',  texto: 'A incerteza sobre o futuro da empresa afeta sua motivação e rendimento?',                                                 invertida: false },
      { id: 't7q9',  texto: 'Você se preocupa com sua situação financeira em função da instabilidade no emprego?',                                     invertida: false },
      { id: 't7q10', texto: 'Você confia que a empresa age de forma ética e justa com seus colaboradores?',                                            invertida: true  }
    ]
  },
  {
    numero: 8,
    chave: 'conflitos',
    titulo: 'Conflitos Interpessoais',
    descricao: 'Avalia a frequência e o impacto de desentendimentos, disputas e dificuldades de relacionamento no trabalho.',
    perguntas: [
      { id: 't8q1',  texto: 'Há conflitos frequentes entre você e seus colegas de trabalho?',                                                          invertida: false },
      { id: 't8q2',  texto: 'Os desentendimentos no trabalho costumam ser resolvidos de forma respeitosa e madura?',                                   invertida: true  },
      { id: 't8q3',  texto: 'Você já se envolveu em discussões ou brigas sérias no ambiente de trabalho?',                                             invertida: false },
      { id: 't8q4',  texto: 'A liderança atua como mediadora eficaz em situações de conflito entre colaboradores?',                                    invertida: true  },
      { id: 't8q5',  texto: 'Sente que há grupos ou "panelinhas" que dificultam a colaboração e a comunicação?',                                      invertida: false },
      { id: 't8q6',  texto: 'A comunicação entre colegas e lideranças é respeitosa e profissional?',                                                   invertida: true  },
      { id: 't8q7',  texto: 'Conflitos não resolvidos prejudicam seu desempenho e bem-estar no trabalho?',                                             invertida: false },
      { id: 't8q8',  texto: 'Você tem dificuldade de se relacionar com algum colega ou gestor de forma contínua?',                                     invertida: false },
      { id: 't8q9',  texto: 'A empresa incentiva a comunicação aberta e a resolução pacífica de conflitos?',                                           invertida: true  },
      { id: 't8q10', texto: 'Você se sente confortável para conversar diretamente com seu gestor sobre problemas relacionais?',                        invertida: true  }
    ]
  },
  {
    numero: 9,
    chave: 'vida_pessoal',
    titulo: 'Equilíbrio Vida–Trabalho',
    descricao: 'Avalia o impacto do trabalho sobre a vida pessoal, familiar, saúde e bem-estar fora do ambiente profissional.',
    perguntas: [
      { id: 't9q1',  texto: 'Você consegue equilibrar as demandas do trabalho com sua vida pessoal e familiar?',                                       invertida: true  },
      { id: 't9q2',  texto: 'O trabalho interfere negativamente na sua vida familiar ou social?',                                                      invertida: false },
      { id: 't9q3',  texto: 'Você tem tempo suficiente para atividades de lazer, descanso e autocuidado?',                                             invertida: true  },
      { id: 't9q4',  texto: 'O trabalho consome sua energia de forma que prejudica outras áreas importantes da sua vida?',                             invertida: false },
      { id: 't9q5',  texto: 'A empresa respeita seus horários de descanso, finais de semana e períodos de férias?',                                    invertida: true  },
      { id: 't9q6',  texto: 'Você consegue se desconectar completamente do trabalho nos períodos de folga?',                                           invertida: true  },
      { id: 't9q7',  texto: 'Sente culpa ou ansiedade quando não está trabalhando ou disponível fora do horário?',                                     invertida: false },
      { id: 't9q8',  texto: 'O volume de trabalho afeta negativamente a qualidade do seu sono?',                                                      invertida: false },
      { id: 't9q9',  texto: 'Você tem autonomia para lidar com emergências pessoais sem prejuízo na sua relação com o trabalho?',                      invertida: true  },
      { id: 't9q10', texto: 'O trabalho impacta negativamente sua saúde física ou emocional de forma perceptível?',                                   invertida: false }
    ]
  }
];
