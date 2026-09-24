import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_PRODUCT_NAME,
  LEGAL_REGISTERED_ADDRESS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const privacyPolicyContent: LegalDocumentContent = {
  title: "Política de Privacidade",
  lastUpdated: "30 August 2026",
  intro: [
    `Esta Política de Privacidade explica como a ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}), que opera o serviço ${LEGAL_PRODUCT_NAME} em example.com ("nós", "nos", "nosso"), recolhe, utiliza, armazena e protege os seus dados pessoais quando utiliza o nosso website, painel de controlo e API de sincronização na cloud.`,
    "Tratamos dados pessoais em conformidade com o Regulamento Geral sobre a Proteção de Dados da UE (GDPR) e com a legislação romena aplicável em matéria de proteção de dados.",
  ],
  sections: [
    {
      title: "1. Responsável pelo tratamento",
      paragraphs: [
        `O responsável pelo tratamento dos seus dados pessoais é a ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, com sede registada em: ${LEGAL_REGISTERED_ADDRESS}.`,
        `${LEGAL_PRODUCT_NAME} é a denominação comercial do nosso serviço cloud de copy trading MT5. Para questões de privacidade ou para exercer os seus direitos, contacte-nos em ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "2. Que dados recolhemos",
      paragraphs: [
        "Recolhemos apenas os dados necessários para prestar o serviço SaaS Template:",
      ],
      bullets: [
        "Dados da conta: nome, endereço de e-mail, hash da palavra-passe (se se registar com e-mail) e imagem de perfil (se iniciar sessão com Google).",
        "Dados de sessão: cookies de autenticação, tokens de sessão e, opcionalmente, o seu endereço IP e o user-agent do browser quando utiliza o painel web.",
        "Dados de subscrição: plano, estado da subscrição e identificador de cliente Stripe. Os dados do cartão de pagamento são recolhidos e armazenados pela Stripe, não por nós.",
        "Dados de sincronização de trading: nome da corretora, saldo da conta, equity, posições abertas e histórico de trades fechados enviados pelos seus Expert Advisors MetaTrader 5. Para Mirror Ownership (prevenção de trading duplicado quando vários terminais se ligam à mesma conta), o EA pode enviar o número da sua conta MT5 para derivarmos uma chave de lease unidirecional; armazenamos apenas esse hash, não o número da conta nem a palavra-passe de trading.",
        "Credencial API EA: o seu SaaS Template User ID, transmitido no header x-user-id pelos EAs. Trate-o como um segredo — qualquer pessoa com o seu User ID e uma subscrição ativa poderia aceder à sua API de sincronização.",
        "Dados de onboarding: se concluiu o assistente de configuração.",
        "Dados de suporte: se submeter o formulário Help privado, armazenamos o seu e-mail, categoria da mensagem, assunto e corpo da mensagem, e podemos associar o ticket à sua conta quando tem sessão iniciada. Contadores temporários de rate limiting baseados em IP podem ser mantidos na memória da aplicação para prevenir abusos.",
        "Mensagens do bot Help: se utilizar o chat Help opcional, os seus prompts e as respostas do modelo são enviados ao fornecedor de IA descrito na secção 5 para responder com base no nosso FAQ público. Não cole palavras-passe ou segredos completos no chat.",
      ],
    },
    {
      title: "3. Como utilizamos os seus dados e bases legais",
      paragraphs: [
        "Tratamos os seus dados pessoais para as finalidades seguintes e com base nas seguintes bases legais ao abrigo do artigo 6.º do GDPR:",
      ],
      bullets: [
        "Prestação da sua conta, painel de controlo e serviço de sincronização na cloud — execução do contrato consigo (art. 6.º(1)(b)).",
        "Processamento de subscrições e faturação via Stripe — execução do contrato e obrigação legal para registos financeiros (art. 6.º(1)(b) e (c)).",
        "Segurança do serviço, prevenção de abusos e proteção do acesso à API — interesse legítimo (art. 6.º(1)(f)).",
        "Envio de e-mails transacionais de autenticação (como links de redefinição de palavra-passe) — execução do contrato e interesse legítimo na segurança da conta (art. 6.º(1)(b) e (f)).",
        "Início de sessão Google OAuth (se o escolher) — o seu consentimento no momento do início de sessão (art. 6.º(1)(a)).",
        "Resposta a pedidos de suporte (e-mail, formulário Help privado ou bot Help) e pedidos legais — interesse legítimo ou obrigação legal, consoante o caso.",
      ],
    },
    {
      title: "4. Cookies",
      paragraphs: [
        "Utilizamos cookies de sessão estritamente necessários para mantê-lo com sessão iniciada no painel SaaS Template. Estes cookies são essenciais para o serviço e não requerem consentimento ao abrigo da Diretiva ePrivacy.",
        "Na primeira visita, mostramos um banner de preferências de cookies. Analytics (Cloudflare Web Analytics e eventos de funil anónimos) só é carregado se escolher Aceitar tudo ou ativar Analytics nas Definições de cookies. Trata-se de um serviço de analytics agregado sem cookies que não identifica utilizadores individuais e não utiliza cookies publicitários ou de rastreamento de terceiros.",
        "Pode alterar a sua escolha a qualquer momento através das Definições de cookies no rodapé do site.",
        "Não utilizamos cookies publicitários ou de rastreamento de terceiros. Se introduzirmos outros cookies não essenciais no futuro, atualizaremos esta política e solicitaremos o seu consentimento quando necessário.",
      ],
    },
    {
      title: "5. Subcontratantes terceiros",
      paragraphs: [
        "Partilhamos dados pessoais com subcontratantes de confiança que nos ajudam a operar o serviço. Cada subcontratante trata dados apenas segundo as nossas instruções e ao abrigo de acordos de proteção de dados adequados:",
      ],
      bullets: [
        "Stripe — processamento de pagamentos e faturação de subscrições (stripe.com/privacy). A Stripe atua como responsável independente pelos dados de pagamento que recolhe diretamente.",
        "Supabase — alojamento de base de dados PostgreSQL gerida para conta, sincronização de trading e tickets de suporte privados.",
        "Railway — alojamento da aplicação e infraestrutura.",
        "Google — autenticação OAuth, apenas se escolher iniciar sessão com Google (policies.google.com/privacy).",
        "Resend — e-mails transacionais para redefinição de palavra-passe e confirmação de eliminação de conta, contendo o endereço de e-mail da sua conta e um link temporário (resend.com/legal/privacy-policy).",
        "Google Gemini API (Google AI Studio / Gemini Developer API) — respostas opcionais do bot Help baseadas no nosso FAQ público. Quando o bot Help está ativado, as mensagens do chat são enviadas à Google para gerar respostas. A utilização da API Gemini de nível gratuito pode ser usada pela Google para melhorar os seus produtos de acordo com os termos da Google; não envie segredos sensíveis no chat Help. Configurações pagas ou de nível superior podem ter condições de dados diferentes — atualizaremos esta política se o nosso nível de produção mudar.",
        "Cloudflare — Web Analytics sem cookies em páginas de marketing quando ativado, e CDN/segurança para example.com (cloudflare.com/privacypolicy).",
        "GitHub — apenas se publicar voluntariamente um issue público; o conteúdo que publica aí é público e está sujeito aos termos do GitHub, não à nossa fila de suporte privada.",
      ],
    },
    {
      title: "6. Transferências internacionais de dados",
      paragraphs: [
        "Alguns dos nossos subcontratantes podem armazenar ou tratar dados fora do Espaço Económico Europeu (EEE), incluindo nos Estados Unidos. Quando tais transferências ocorrem, recorremos a garantias adequadas, como as Cláusulas Contratuais-Tipo da UE e a conformidade do subcontratante com os quadros de proteção de dados aplicáveis.",
      ],
    },
    {
      title: "7. Conservação de dados",
      paragraphs: [
        "Conservamos os seus dados apenas durante o tempo necessário para as finalidades descritas nesta política:",
      ],
      bullets: [
        "Dados da conta e do perfil: conservados enquanto a sua conta estiver ativa e durante um período razoável após pedido de eliminação ou encerramento da conta, salvo período mais longo exigido por lei.",
        "Dados de sincronização de trading: as posições ativas são substituídas em cada sincronização master; o histórico de trades fechados é conservado enquanto a sua conta estiver ativa para alimentar as métricas do painel.",
        "Dados de lease Mirror Ownership: o hash unidirecional de login do broker (brokerLoginHmac) armazenado nas contas de trading e as linhas mirror_leases relacionadas são conservados enquanto a sua conta estiver ativa e removidos quando a sua conta de utilizador é eliminada (cascade da base de dados).",
        "Dados de sessão: conservados até a sessão expirar ou terminar sessão.",
        "Registos de faturação: conservados conforme exigido pela legislação fiscal e contabilística aplicável, em linha com as práticas de conservação da Stripe.",
        "Tickets de suporte privados: conservados enquanto úteis para resolver o seu pedido e durante um período razoável posterior para prevenção de abusos e qualidade do serviço, depois eliminados ou anonimizados, salvo período mais longo exigido por lei. Pedidos de eliminação de conta podem incluir tickets de suporte abertos associados ao seu user id.",
        "Chats do bot Help: não armazenados como histórico permanente de tickets na nossa base de dados; as mensagens são processadas para gerar uma resposta e podem ser tratadas pelo processador de IA segundo as regras de conservação do nível de API em uso.",
      ],
    },
    {
      title: "8. Os seus direitos ao abrigo do GDPR",
      paragraphs: [
        "Se se encontrar no EEE ou no Reino Unido, tem os seguintes direitos relativamente aos seus dados pessoais:",
      ],
      bullets: [
        "Direito de acesso — solicitar uma cópia dos dados pessoais que detemos sobre si.",
        "Direito de retificação — solicitar a correção de dados inexatos.",
        "Direito ao apagamento — solicitar a eliminação dos seus dados, sujeito a obrigações legais de conservação.",
        "Direito à limitação — solicitar que limitemos a forma como utilizamos os seus dados em determinadas circunstâncias.",
        "Direito à portabilidade dos dados — receber os seus dados num formato estruturado e legível por máquina, quando tecnicamente viável.",
        "Direito de oposição — opor-se ao tratamento baseado em interesses legítimos.",
        "Direito de retirar o consentimento — quando o tratamento se baseia no consentimento, pode retirá-lo a qualquer momento sem afetar o tratamento lícito anterior.",
        "Direito de apresentar reclamação — junto da Autoridade Nacional de Supervisão do Tratamento de Dados Pessoais da Roménia (ANSPDCP) em dataprotection.ro, ou junto da sua autoridade de controlo local.",
      ],
    },
    {
      title: "9. Como exercer os seus direitos",
      paragraphs: [
        `Para exercer qualquer um dos direitos acima, envie-nos um e-mail para ${LEGAL_CONTACT_EMAIL} a partir do endereço de e-mail associado à sua conta. Responderemos no prazo de um mês, conforme exigido pelo GDPR. Poderemos precisar de verificar a sua identidade antes de processar o pedido.`,
        "Pode eliminar permanentemente a sua conta em Dashboard → Definições. A eliminação cancela todas as subscrições ativas e remove os dados da conta associados. Também pode enviar-nos um e-mail para solicitar o apagamento.",
      ],
    },
    {
      title: "10. Segurança",
      paragraphs: [
        "Implementamos medidas técnicas e organizacionais para proteger os seus dados, incluindo encriptação HTTPS, hash de palavras-passe e controlos de acesso limitados à sua conta de utilizador. O seu SaaS Template User ID funciona como credencial API — não o partilhe publicamente nem o incorpore em ficheiros partilhados. Os tickets de suporte privados são visíveis apenas para operadores autorizados.",
      ],
    },
    {
      title: "11. Crianças",
      paragraphs: [
        "O SaaS Template não se destina a crianças com menos de 16 anos. Não recolhemos conscientemente dados pessoais de pessoas com menos de 16 anos. Se acreditar que uma criança nos forneceu dados, contacte-nos e eliminaremos esses dados.",
      ],
    },
    {
      title: "12. Aviso sobre dados de trading",
      paragraphs: [
        "Os dados de trading apresentados no painel ou transmitidos através da nossa API de sincronização são informação operacional sobre as suas contas MetaTrader. Não constituem aconselhamento financeiro, investigação de investimentos ou recomendação para negociar. O trading envolve risco substancial de perda. O bot Help opcional não é aconselhamento financeiro e pode ser impreciso; utilize o formulário de suporte privado ou e-mail para questões específicas da conta.",
      ],
    },
    {
      title: "13. Alterações a esta política",
      paragraphs: [
        "Podemos atualizar esta Política de Privacidade periodicamente. Alterações materiais serão publicadas nesta página com uma data atualizada. A utilização continuada do serviço após alterações constitui aceitação da política atualizada.",
      ],
    },
    {
      title: "14. Contacto",
      paragraphs: [
        `Para questões de privacidade ou pedidos de titulares de dados: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
