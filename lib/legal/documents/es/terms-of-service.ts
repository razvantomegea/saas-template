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
  title: "Términos del servicio",
  lastUpdated: "9 June 2026",
  intro: [
    `Estos Términos del servicio («Términos») rigen el uso del servicio cloud ${LEGAL_PRODUCT_NAME} operado por ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}) en example.com («Servicio»). Al crear una cuenta o usar el Servicio, usted acepta estos Términos.`,
    "Si no está de acuerdo, no utilice el Servicio.",
  ],
  sections: [
    {
      title: "1. Descripción del servicio",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME} es un relé cloud y un panel para copy trading de MetaTrader 5. Un Expert Advisor (EA) master publica posiciones abiertas en nuestra API; los EA slave consultan la API y reflejan operaciones en cuentas seguidoras.`,
        "Los EA SaaS Template Master Publisher y Slave Subscriber se distribuyen de forma gratuita en MQL5 Market. Una suscripción de pago a example.com desbloquea la sincronización cloud y el acceso al panel.",
      ],
    },
    {
      title: "2. Parte contratante",
      paragraphs: [
        `El Servicio lo presta ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}. ${LEGAL_PRODUCT_NAME} es nuestro nombre comercial. Contacto: ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "3. Elegibilidad",
      paragraphs: [
        "Debe tener al menos 18 años y capacidad legal para celebrar contratos vinculantes para usar el Servicio. Al registrarse, declara que cumple estos requisitos.",
      ],
    },
    {
      title: "4. Registro de cuenta",
      paragraphs: [
        "Puede registrarse con email y contraseña o, cuando esté disponible, con Google. Usted es responsable de mantener la confidencialidad de sus credenciales de acceso.",
        "Su SaaS Template User ID lo usan los EA para autenticar solicitudes a la API. Trátelo como una credencial secreta. Usted es responsable de configurar correctamente los EA y de toda la actividad bajo su cuenta.",
      ],
    },
    {
      title: "5. Suscripción y facturación",
      paragraphs: [
        "Los planes de pago (Starter, TV Sync, Pro, Ultimate) se facturan en EUR de forma mensual o anual a través de Stripe. Los precios se muestran en nuestra página de pricing y pueden cambiar con un aviso razonable.",
        `Los nuevos suscriptores reciben una prueba gratuita de ${LEGAL_TRIAL_DAYS} días en su primera suscripción de pago. Tras cualquier prueba, su método de pago se carga automáticamente salvo que cancele antes de que termine la prueba.`,
        "Las suscripciones se renuevan automáticamente al final de cada período de facturación. Puede cancelar o cambiar su plan a través de la página Billing, que redirige al Stripe Customer Portal.",
        "El impago puede dar lugar a la suspensión del acceso a la API de sincronización. No almacenamos los datos completos de su tarjeta: Stripe procesa todos los pagos.",
      ],
    },
    {
      title: "6. Política de reembolsos",
      paragraphs: [
        `Ofrecemos reembolsos discrecionales para solicitudes recibidas en un plazo de ${LEGAL_REFUND_WINDOW_HOURS} horas desde su primer cargo (tras finalizar cualquier prueba gratuita). Para solicitar un reembolso, escriba a ${LEGAL_CONTACT_EMAIL} desde el email de su cuenta registrada con su solicitud y la fecha del cargo.`,
        "Los reembolsos aprobados se procesan a través de Stripe a su método de pago original. Las solicitudes recibidas tras la ventana de 24 horas generalmente no se aceptan bajo esta política comercial.",
        "Esta política de reembolsos no afecta los derechos legales obligatorios que pueda tener como consumidor según la ley aplicable.",
      ],
    },
    {
      title: "7. Derecho de desistimiento (consumidores de la UE y Rumanía)",
      paragraphs: [
        "Si es consumidor en la Unión Europea o en Rumanía, generalmente dispone de un derecho de desistimiento de 14 días en contratos a distancia sin indicar motivo, conforme a la Directiva 2011/83/UE y a la Ordenanza de Urgencia del Gobierno rumano n.º 34/2014 (OUG 34/2014).",
        "En servicios digitales cuya ejecución comienza de inmediato, puede perder el derecho de desistimiento si consiente expresamente el acceso inmediato y reconoce que perderá su derecho de desistimiento una vez iniciado el servicio. Este consentimiento puede obtenerse durante el checkout o la activación de la cuenta.",
        `Para ejercer su derecho legal de desistimiento, envíe una declaración clara a ${LEGAL_CONTACT_EMAIL} antes de que expire el plazo. Si desiste válidamente, reembolsaremos los pagos recibidos sin demora indebida y, en cualquier caso, en un plazo de 14 días.`,
        "Para reclamaciones sobre derechos de los consumidores, puede contactar a la Autoridad Nacional rumana para la Protección de los Consumidores (ANPC) en anpc.ro.",
      ],
    },
    {
      title: "8. Uso aceptable",
      paragraphs: ["Usted se compromete a no:"],
      bullets: [
        "Compartir su User ID o credenciales de cuenta con terceros no autorizados.",
        "Abusar, sobrecargar o intentar interrumpir la API o la infraestructura.",
        "Realizar ingeniería inversa, scraping o reventa del Servicio sin nuestro consentimiento por escrito.",
        "Usar el Servicio para actividades ilícitas o en violación de los términos de su bróker.",
        "Eludir los límites de suscripción (p. ej., límites de cuentas slave de su nivel de plan).",
      ],
    },
    {
      title: "9. Propiedad intelectual",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}, nuestro sitio web, panel, API y EA propietarios son propiedad de ${LEGAL_COMPANY_NAME} o de sus licenciantes. La distribución en MQL5 Market de los EA gratuitos está sujeta a los términos de MetaQuotes y MQL5 Market.`,
        "Recibe una licencia limitada, no exclusiva e intransferible para usar el Servicio en sus operaciones de trading personales o internas de negocio mientras su suscripción esté activa.",
      ],
    },
    {
      title: "10. Servicios de terceros",
      paragraphs: [
        "El Servicio se integra con MetaTrader 5, su bróker, MQL5 Market, Stripe y otros terceros. No somos responsables de interrupciones, cambios de política o fallos de plataformas de terceros. El uso de brókers y plataformas de trading se rige por sus propios términos.",
      ],
    },
    {
      title: "11. Aviso de riesgo de trading",
      paragraphs: [
        "Operar con instrumentos financieros conlleva un riesgo sustancial de pérdida. El rendimiento pasado de operaciones copiadas no garantiza resultados futuros. SaaS Template es infraestructura de software: no proporciona asesoramiento financiero, recomendaciones de inversión ni beneficios garantizados.",
        "Usted es el único responsable de sus decisiones de trading, configuración de EA, dimensionamiento de posiciones y cumplimiento de la normativa aplicable. Use el Servicio bajo su propio riesgo.",
      ],
    },
    {
      title: "12. Disponibilidad del servicio",
      paragraphs: [
        "Procuramos mantener el Servicio disponible, pero no garantizamos un funcionamiento ininterrumpido o libre de errores. El mantenimiento, problemas de infraestructura o fallos de terceros pueden causar indisponibilidad. No se aplica ningún acuerdo de nivel de servicio salvo que se acuerde expresamente por escrito.",
      ],
    },
    {
      title: "13. Limitación de responsabilidad",
      paragraphs: [
        `En la máxima medida permitida por la ley aplicable, ${LEGAL_COMPANY_NAME} no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluidas pérdidas de trading, lucro cesante o pérdida de datos derivados del uso del Servicio.`,
        "Nuestra responsabilidad total agregada por cualquier reclamación derivada de estos Términos o del Servicio se limita a las tarifas que nos haya pagado en los doce (12) meses anteriores a la reclamación. Nada en estos Términos limita la responsabilidad que no pueda limitarse conforme a la legislación obligatoria de protección de los consumidores.",
      ],
    },
    {
      title: "14. Terminación",
      paragraphs: [
        "Puede cancelar su suscripción en cualquier momento a través de la página Billing. Podemos suspender o terminar su cuenta si incumple estos Términos o si lo exige la ley. Tras la terminación, finaliza su acceso a la API y podemos eliminar sus datos de conformidad con nuestra Política de privacidad.",
      ],
    },
    {
      title: "15. Ley aplicable y disputas",
      paragraphs: [
        `Estos Términos se rigen por las leyes de ${LEGAL_GOVERNING_LAW}. Cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales competentes en ${LEGAL_JURISDICTION_CITY}, ${LEGAL_GOVERNING_LAW}, sin perjuicio de los derechos obligatorios de los consumidores que puedan permitirle entablar procedimientos en su país de residencia.`,
      ],
    },
    {
      title: "16. Cambios en estos Términos",
      paragraphs: [
        "Podemos actualizar estos Términos de vez en cuando. Los cambios materiales se publicarán en esta página con una fecha actualizada. El uso continuado tras los cambios constituye la aceptación. En caso de cambios significativos, también podemos notificarle por email.",
      ],
    },
    {
      title: "17. Contacto",
      paragraphs: [
        `Preguntas sobre estos Términos: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
