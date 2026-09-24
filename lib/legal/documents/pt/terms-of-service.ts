import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_GOVERNING_LAW,
  LEGAL_JURISDICTION_CITY,
  LEGAL_PRODUCT_NAME,
  LEGAL_REFUND_WINDOW_HOURS,
  LEGAL_REGISTERED_ADDRESS,
  LEGAL_TRIAL_DAYS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const termsOfServiceContent: LegalDocumentContent = {
  title: "Termos de Serviço",
  lastUpdated: "9 June 2026",
  intro: [
    `Estes Termos de Serviço ("Termos") regem a utilização do serviço cloud ${LEGAL_PRODUCT_NAME} operado pela ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}) em example.com ("Serviço"). Ao criar uma conta ou utilizar o Serviço, aceita estes Termos.`,
    "Se não concordar, não utilize o Serviço.",
  ],
  sections: [
    {
      title: "1. Descrição do serviço",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME} é um relay cloud e painel de controlo para copy trading MetaTrader 5. Um Expert Advisor (EA) master publica posições abertas na nossa API; EAs slave consultam a API e replicam trades em contas follower.`,
        "Os EAs SaaS Template Master Publisher e Slave Subscriber são distribuídos gratuitamente no MQL5 Market. Uma subscrição paga em example.com desbloqueia a sincronização na cloud e o acesso ao painel.",
      ],
    },
    {
      title: "2. Parte contratante",
      paragraphs: [
        `O Serviço é prestado pela ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}. ${LEGAL_PRODUCT_NAME} é a nossa denominação comercial. Contacto: ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "3. Elegibilidade",
      paragraphs: [
        "Deve ter pelo menos 18 anos e capacidade legal para celebrar contratos vinculativos para utilizar o Serviço. Ao registar-se, declara que cumpre estes requisitos.",
      ],
    },
    {
      title: "4. Registo de conta",
      paragraphs: [
        "Pode registar-se com e-mail e palavra-passe ou, quando disponível, com início de sessão Google. É responsável por manter as suas credenciais de acesso confidenciais.",
        "O seu SaaS Template User ID é utilizado pelos EAs para autenticar pedidos API. Trate-o como credencial secreta. É responsável por configurar corretamente os EAs e por toda a atividade na sua conta.",
      ],
    },
    {
      title: "5. Subscrição e faturação",
      paragraphs: [
        "Os planos pagos (Starter, TV Sync, Pro, Ultimate) são faturados em EUR mensal ou anualmente através da Stripe. Os preços são apresentados na nossa página de preços e podem ser alterados com aviso prévio razoável.",
        `Novos subscritores recebem um período de teste gratuito de ${LEGAL_TRIAL_DAYS} dias na primeira subscrição paga. Após qualquer teste, o seu método de pagamento é debitado automaticamente, salvo cancelamento antes do fim do teste.`,
        "As subscrições renovam-se automaticamente no final de cada período de faturação. Pode cancelar ou alterar o plano na página Billing, que redireciona para o Stripe Customer Portal.",
        "A falta de pagamento pode resultar na suspensão do acesso à API de sincronização. Não armazenamos os dados completos do seu cartão de pagamento — a Stripe processa todos os pagamentos.",
      ],
    },
    {
      title: "6. Política de reembolso",
      paragraphs: [
        `Oferecemos reembolsos discricionários para pedidos recebidos no prazo de ${LEGAL_REFUND_WINDOW_HOURS} horas após o primeiro débito (após o fim de qualquer teste gratuito). Para solicitar um reembolso, envie um e-mail para ${LEGAL_CONTACT_EMAIL} a partir do e-mail da conta registada com o pedido e a data do débito.`,
        "Os reembolsos aprovados são processados via Stripe para o método de pagamento original. Pedidos de reembolso recebidos após a janela de 24 horas geralmente não são aceites ao abrigo desta política comercial.",
        "Esta política de reembolso não afeta quaisquer direitos legais obrigatórios de que disponha como consumidor ao abrigo da legislação aplicável.",
      ],
    },
    {
      title: "7. Direito de livre resolução (consumidores UE e Roménia)",
      paragraphs: [
        "Se for consumidor na União Europeia ou na Roménia, tem geralmente um direito de livre resolução de 14 dias em contratos à distância sem necessidade de indicar motivos, ao abrigo da Diretiva 2011/83/UE e da Ordenança de Emergência do Governo Romeno n.º 34/2014 (OUG 34/2014).",
        "Para serviços digitais cuja execução começa imediatamente, pode perder o direito de livre resolução se consentir expressamente o acesso imediato e reconhecer que perderá esse direito assim que o serviço tenha começado. Este consentimento pode ser obtido durante o checkout ou a ativação da conta.",
        `Para exercer o seu direito legal de livre resolução, envie uma declaração clara para ${LEGAL_CONTACT_EMAIL} antes do termo do prazo de livre resolução. Se exercer validamente o direito, reembolsaremos os pagamentos recebidos sem demora injustificada e, em qualquer caso, no prazo de 14 dias.`,
        "Para reclamações sobre direitos dos consumidores, pode contactar a Autoridade Nacional para a Proteção dos Consumidores da Roménia (ANPC) em anpc.ro.",
      ],
    },
    {
      title: "8. Utilização aceitável",
      paragraphs: ["Concorda em não:"],
      bullets: [
        "Partilhar o seu User ID ou credenciais de conta com partes não autorizadas.",
        "Abusar, sobrecarregar ou tentar perturbar a API ou a infraestrutura.",
        "Fazer engenharia inversa, scraping ou revenda do Serviço sem o nosso consentimento escrito.",
        "Utilizar o Serviço para atividade ilegal ou em violação dos termos da sua corretora.",
        "Contornar limites de subscrição (p.ex. limites de contas slave para o seu plano).",
      ],
    },
    {
      title: "9. Propriedade intelectual",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}, o nosso website, painel, API e EAs proprietários são propriedade da ${LEGAL_COMPANY_NAME} ou dos seus licenciadores. A distribuição no MQL5 Market dos EAs gratuitos está sujeita aos termos da MetaQuotes e do MQL5 Market.`,
        "Recebe uma licença limitada, não exclusiva e intransmissível para utilizar o Serviço nas suas operações de trading pessoais ou empresariais internas enquanto a sua subscrição estiver ativa.",
      ],
    },
    {
      title: "10. Serviços de terceiros",
      paragraphs: [
        "O Serviço integra-se com MetaTrader 5, a sua corretora, MQL5 Market, Stripe e outros terceiros. Não somos responsáveis por interrupções, alterações de políticas ou falhas de plataformas de terceiros. A utilização de corretoras e plataformas de trading rege-se pelos respetivos termos.",
      ],
    },
    {
      title: "11. Aviso de risco de trading",
      paragraphs: [
        "A negociação de instrumentos financeiros envolve risco substancial de perda. O desempenho passado de trades copiados não garante resultados futuros. O SaaS Template é infraestrutura de software — não fornece aconselhamento financeiro, recomendações de investimento ou lucros garantidos.",
        "É o único responsável pelas suas decisões de trading, configuração dos EAs, dimensionamento de posições e conformidade com a regulamentação aplicável. Utiliza o Serviço por sua conta e risco.",
      ],
    },
    {
      title: "12. Disponibilidade do serviço",
      paragraphs: [
        "Procuramos manter o Serviço disponível, mas não garantimos funcionamento ininterrupto ou isento de erros. Manutenção, problemas de infraestrutura ou falhas de terceiros podem causar indisponibilidade. Nenhum acordo de nível de serviço se aplica salvo acordo expresso por escrito.",
      ],
    },
    {
      title: "13. Limitação de responsabilidade",
      paragraphs: [
        `Na máxima extensão permitida pela legislação aplicável, a ${LEGAL_COMPANY_NAME} não será responsável por danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perdas de trading, lucros cessantes ou perda de dados decorrentes da utilização do Serviço.`,
        `A nossa responsabilidade total agregada por quaisquer reclamações decorrentes destes Termos ou do Serviço limita-se às taxas que nos pagou nos doze (12) meses anteriores à reclamação. Nada nestes Termos limita responsabilidade que não possa ser limitada ao abrigo da legislação obrigatória de proteção do consumidor.`,
      ],
    },
    {
      title: "14. Rescisão",
      paragraphs: [
        "Pode cancelar a sua subscrição a qualquer momento na página Billing. Podemos suspender ou encerrar a sua conta se violar estes Termos ou se exigido por lei. Após a rescisão, o acesso à API termina e podemos eliminar os seus dados de acordo com a nossa Política de Privacidade.",
      ],
    },
    {
      title: "15. Lei aplicável e litígios",
      paragraphs: [
        `Estes Termos regem-se pelas leis de ${LEGAL_GOVERNING_LAW}. Quaisquer litígios estarão sujeitos à jurisdição exclusiva dos tribunais competentes de ${LEGAL_JURISDICTION_CITY}, ${LEGAL_GOVERNING_LAW}, sem prejuízo dos direitos obrigatórios do consumidor que possam permitir-lhe intentar ações no seu país de residência.`,
      ],
    },
    {
      title: "16. Alterações a estes Termos",
      paragraphs: [
        "Podemos atualizar estes Termos periodicamente. Alterações materiais serão publicadas nesta página com uma data atualizada. A utilização continuada após alterações constitui aceitação. Para alterações significativas, também podemos notificá-lo por e-mail.",
      ],
    },
    {
      title: "17. Contacto",
      paragraphs: [
        `Questões sobre estes Termos: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
