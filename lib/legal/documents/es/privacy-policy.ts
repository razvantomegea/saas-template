import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_PRODUCT_NAME,
  LEGAL_REGISTERED_ADDRESS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const privacyPolicyContent: LegalDocumentContent = {
  title: "Política de privacidad",
  lastUpdated: "30 August 2026",
  intro: [
    `Esta Política de privacidad explica cómo ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}), que opera el servicio ${LEGAL_PRODUCT_NAME} en example.com («nosotros», «nos», «nuestro»), recopila, utiliza, almacena y protege sus datos personales cuando usa nuestro sitio web, panel y API de sincronización en la nube.`,
    "Tratamos los datos personales de conformidad con el Reglamento General de Protección de Datos de la UE (RGPD) y la legislación rumana aplicable en materia de protección de datos.",
  ],
  sections: [
    {
      title: "1. Responsable del tratamiento",
      paragraphs: [
        `El responsable del tratamiento de sus datos personales es ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, domicilio social: ${LEGAL_REGISTERED_ADDRESS}.`,
        `${LEGAL_PRODUCT_NAME} es el nombre comercial de nuestro servicio cloud de copy trading de MT5. Para consultas de privacidad o para ejercer sus derechos, contáctenos en ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "2. Qué datos recopilamos",
      paragraphs: [
        "Recopilamos únicamente los datos necesarios para prestar el servicio SaaS Template:",
      ],
      bullets: [
        "Datos de cuenta: nombre, dirección de correo electrónico, hash de contraseña (si se registra con email) e imagen de perfil (si inicia sesión con Google).",
        "Datos de sesión: cookies de autenticación, tokens de sesión y, opcionalmente, su dirección IP y el user-agent del navegador cuando usa el panel web.",
        "Datos de suscripción: nivel del plan, estado de la suscripción e identificador de cliente de Stripe. Los datos de la tarjeta de pago los recopila y almacena Stripe, no nosotros.",
        "Datos de sincronización de trading: nombre de la compañía del bróker, saldo de la cuenta, equity, posiciones abiertas e historial de operaciones cerradas enviados por sus Expert Advisors de MetaTrader 5. Para Mirror Ownership (evitar trading duplicado cuando varios terminales se conectan a la misma cuenta), el EA puede enviar su número de cuenta MT5 para que deriveamos una clave de lease unidireccional; almacenamos solo ese hash, no el número de cuenta ni la contraseña de trading.",
        "Credencial de API del EA: su SaaS Template User ID, transmitido en el encabezado x-user-id por los EA. Trátelo como un secreto: cualquiera con su User ID y una suscripción activa podría acceder a su API de sincronización.",
        "Datos de onboarding: si ha completado el asistente de configuración.",
        "Datos de soporte: si envía el formulario privado de Help, almacenamos su email, categoría del mensaje, asunto y cuerpo, y podemos vincular el ticket a su cuenta cuando esté conectado. Pueden mantenerse en memoria de la aplicación contadores temporales de rate-limit basados en IP para prevenir abusos.",
        "Mensajes del bot de Help: si usa el chat opcional de Help, sus mensajes y las respuestas del modelo se envían al proveedor de IA descrito en la sección 5 para responder desde nuestro FAQ público. No pegue contraseñas ni secretos completos en el chat.",
      ],
    },
    {
      title: "3. Cómo usamos sus datos y bases jurídicas",
      paragraphs: [
        "Tratamos sus datos personales para los siguientes fines y sobre las siguientes bases jurídicas del artículo 6 del RGPD:",
      ],
      bullets: [
        "Proporcionar su cuenta, panel y servicio de sincronización en la nube — ejecución de nuestro contrato con usted (art. 6(1)(b)).",
        "Procesar suscripciones y facturación a través de Stripe — ejecución del contrato y obligación legal de registros financieros (art. 6(1)(b) y (c)).",
        "Proteger el servicio, prevenir abusos y proteger el acceso a la API — interés legítimo (art. 6(1)(f)).",
        "Enviar emails transaccionales de autenticación (como enlaces de restablecimiento de contraseña) — ejecución del contrato e interés legítimo en la seguridad de la cuenta (art. 6(1)(b) y (f)).",
        "Inicio de sesión con Google OAuth (si lo elige) — su consentimiento al iniciar sesión (art. 6(1)(a)).",
        "Responder a solicitudes de soporte (email, formulario privado de Help o bot de Help) y consultas legales — interés legítimo u obligación legal, según corresponda.",
      ],
    },
    {
      title: "4. Cookies",
      paragraphs: [
        "Usamos cookies de sesión estrictamente necesarias para mantenerle conectado al panel de SaaS Template. Estas cookies son esenciales para el servicio y no requieren consentimiento según la Directiva ePrivacy.",
        "En su primera visita mostramos un banner de preferencias de cookies. Analytics (Cloudflare Web Analytics y eventos anónimos de embudo) solo se carga si elige Accept all o activa Analytics en Cookie settings. Es un servicio de analytics agregado sin cookies que no identifica a usuarios individuales y no usa cookies publicitarias ni de seguimiento de terceros.",
        "Puede cambiar su elección en cualquier momento mediante Cookie settings en el pie del sitio.",
        "No usamos cookies publicitarias ni de seguimiento de terceros. Si en el futuro introducimos otras cookies no esenciales, actualizaremos esta política y solicitaremos su consentimiento cuando sea necesario.",
      ],
    },
    {
      title: "5. Encargados del tratamiento",
      paragraphs: [
        "Compartimos datos personales con encargados de confianza que nos ayudan a operar el servicio. Cada encargado trata los datos solo siguiendo nuestras instrucciones y bajo acuerdos adecuados de protección de datos:",
      ],
      bullets: [
        "Stripe — procesamiento de pagos y facturación de suscripciones (stripe.com/privacy). Stripe actúa como responsable independiente de los datos de pago que recopila directamente.",
        "Supabase — alojamiento gestionado de PostgreSQL para datos de cuenta, sincronización de trading y tickets privados de soporte.",
        "Railway — alojamiento de la aplicación e infraestructura.",
        "Google — autenticación OAuth solo si elige iniciar sesión con Google (policies.google.com/privacy).",
        "Resend — emails transaccionales para restablecimiento de contraseña y confirmación de eliminación de cuenta, con el email de su cuenta y un enlace de tiempo limitado (resend.com/legal/privacy-policy).",
        "Google Gemini API (Google AI Studio / Gemini Developer API) — respuestas opcionales del bot de Help basadas en nuestro FAQ público. Cuando el bot está habilitado, los mensajes del chat se envían a Google para generar respuestas. El uso gratuito de la API Gemini puede ser utilizado por Google para mejorar sus productos según sus términos; no envíe secretos sensibles en el chat de Help. Configuraciones de pago o de nivel superior pueden tener términos de datos distintos: actualizaremos esta política si cambia nuestro nivel de producción.",
        "Cloudflare — Web Analytics sin cookies en páginas de marketing cuando está habilitado, y CDN/seguridad para example.com (cloudflare.com/privacypolicy).",
        "GitHub — solo si publica voluntariamente un issue público; el contenido que publique allí es público y está sujeto a los términos de GitHub, no a nuestra cola privada de soporte.",
      ],
    },
    {
      title: "6. Transferencias internacionales de datos",
      paragraphs: [
        "Algunos de nuestros encargados pueden almacenar o tratar datos fuera del Espacio Económico Europeo (EEE), incluido Estados Unidos. Cuando se producen tales transferencias, nos basamos en salvaguardas adecuadas como las Cláusulas Contractuales Tipo de la UE y el cumplimiento por el encargado de los marcos de protección de datos aplicables.",
      ],
    },
    {
      title: "7. Conservación de datos",
      paragraphs: [
        "Conservamos sus datos solo el tiempo necesario para los fines descritos en esta política:",
      ],
      bullets: [
        "Datos de cuenta y perfil: se conservan mientras su cuenta esté activa y durante un período razonable tras la solicitud de eliminación o el cierre de la cuenta, salvo que la ley exija un plazo más largo.",
        "Datos de sincronización de trading: las posiciones activas se sustituyen en cada sincronización del master; el historial de operaciones cerradas se conserva mientras la cuenta esté activa para métricas del panel.",
        "Datos de lease de Mirror Ownership: el hash unidireccional del login del bróker (brokerLoginHmac) almacenado en cuentas de trading, y las filas relacionadas de mirror_leases, se conservan mientras la cuenta esté activa y se eliminan al borrar su cuenta de usuario (cascada en la base de datos).",
        "Datos de sesión: se conservan hasta que la sesión expire o cierre sesión.",
        "Registros de facturación: se conservan según exija la legislación fiscal y contable aplicable, en línea con las prácticas de conservación de Stripe.",
        "Tickets privados de soporte: se conservan mientras sean útiles para resolver su solicitud y durante un período razonable después para prevención de abusos y calidad del servicio, luego se eliminan o anonimizan, salvo que la ley exija un plazo más largo. Las solicitudes de borrado de cuenta pueden incluir tickets de soporte abiertos vinculados a su user id.",
        "Chats del bot de Help: no se almacenan como historial permanente de tickets en nuestra base de datos; los mensajes se procesan para generar una respuesta y pueden ser tratados por el procesador de IA según sus reglas de conservación para el nivel de API en uso.",
      ],
    },
    {
      title: "8. Sus derechos en virtud del RGPD",
      paragraphs: [
        "Si se encuentra en el EEE o en el Reino Unido, tiene los siguientes derechos respecto a sus datos personales:",
      ],
      bullets: [
        "Derecho de acceso — solicitar una copia de los datos personales que conservamos sobre usted.",
        "Derecho de rectificación — solicitar la corrección de datos inexactos.",
        "Derecho de supresión — solicitar la eliminación de sus datos, sujeto a obligaciones legales de conservación.",
        "Derecho de limitación — solicitar que limitemos el uso de sus datos en determinadas circunstancias.",
        "Derecho a la portabilidad — recibir sus datos en un formato estructurado y legible por máquina cuando sea técnicamente viable.",
        "Derecho de oposición — oponerse al tratamiento basado en intereses legítimos.",
        "Derecho a retirar el consentimiento — cuando el tratamiento se base en el consentimiento, puede retirarlo en cualquier momento sin afectar al tratamiento lícito anterior.",
        "Derecho a presentar una reclamación — ante la Autoridad Nacional de Supervisión de Rumania para el Tratamiento de Datos Personales (ANSPDCP) en dataprotection.ro, o ante su autoridad de control local.",
      ],
    },
    {
      title: "9. Cómo ejercer sus derechos",
      paragraphs: [
        `Para ejercer cualquiera de los derechos anteriores, envíenos un email a ${LEGAL_CONTACT_EMAIL} desde la dirección asociada a su cuenta. Responderemos en el plazo de un mes, según exige el RGPD. Es posible que debamos verificar su identidad antes de tramitar su solicitud.`,
        "Puede eliminar permanentemente su cuenta desde Dashboard → Settings. La eliminación cancela todas las suscripciones activas y elimina los datos de cuenta asociados. También puede enviarnos un email para solicitar el borrado.",
      ],
    },
    {
      title: "10. Seguridad",
      paragraphs: [
        "Aplicamos medidas técnicas y organizativas para proteger sus datos, incluido cifrado HTTPS, hash de contraseñas y controles de acceso limitados a su cuenta de usuario. Su SaaS Template User ID actúa como credencial de API: no lo comparta públicamente ni lo incruste en archivos compartidos. Los tickets privados de soporte solo son visibles para operadores autorizados.",
      ],
    },
    {
      title: "11. Menores",
      paragraphs: [
        "SaaS Template no está dirigido a menores de 16 años. No recopilamos conscientemente datos personales de nadie menor de 16. Si cree que un menor nos ha facilitado datos, contáctenos y los eliminaremos.",
      ],
    },
    {
      title: "12. Aviso sobre datos de trading",
      paragraphs: [
        "Los datos de trading mostrados en el panel o transmitidos a través de nuestra API de sincronización son información operativa sobre sus cuentas MetaTrader. No constituyen asesoramiento financiero, investigación de inversiones ni una recomendación de operar. El trading conlleva un riesgo sustancial de pérdida. El bot opcional de Help no es asesoramiento financiero y puede ser inexacto; use el formulario privado de soporte o el email para asuntos específicos de la cuenta.",
      ],
    },
    {
      title: "13. Cambios en esta política",
      paragraphs: [
        "Podemos actualizar esta Política de privacidad de vez en cuando. Los cambios materiales se publicarán en esta página con una fecha actualizada. El uso continuado del servicio tras los cambios constituye la aceptación de la política actualizada.",
      ],
    },
    {
      title: "14. Contacto",
      paragraphs: [
        `Para preguntas de privacidad o solicitudes de interesados: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
