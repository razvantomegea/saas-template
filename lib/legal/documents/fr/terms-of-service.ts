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
  title: "Conditions d'utilisation",
  lastUpdated: "9 June 2026",
  intro: [
    `Les présentes Conditions d'utilisation (« Conditions ») régissent votre utilisation du service cloud ${LEGAL_PRODUCT_NAME} exploité par ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}) sur example.com (« Service »). En créant un compte ou en utilisant le Service, vous acceptez ces Conditions.`,
    "Si vous n'acceptez pas ces Conditions, n'utilisez pas le Service.",
  ],
  sections: [
    {
      title: "1. Description du service",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME} est un relais cloud et un tableau de bord pour le copy trading MetaTrader 5. Un Expert Advisor (EA) master publie les positions ouvertes sur notre API ; les EA esclaves interrogent l'API et reproduisent les trades sur les comptes suiveurs.`,
        "Les EA SaaS Template Master Publisher et Slave Subscriber sont distribués gratuitement sur le MQL5 Market. Un abonnement payant à example.com débloque la synchronisation cloud et l'accès au tableau de bord.",
      ],
    },
    {
      title: "2. Partie contractante",
      paragraphs: [
        `Le Service est fourni par ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}. ${LEGAL_PRODUCT_NAME} est notre dénomination commerciale. Contact : ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "3. Éligibilité",
      paragraphs: [
        "Vous devez avoir au moins 18 ans et être légalement capable de conclure des contrats contraignants pour utiliser le Service. En vous inscrivant, vous déclarez remplir ces conditions.",
      ],
    },
    {
      title: "4. Inscription au compte",
      paragraphs: [
        "Vous pouvez vous inscrire avec une adresse e-mail et un mot de passe ou, le cas échéant, via la connexion Google. Vous êtes responsable de la confidentialité de vos identifiants de connexion.",
        "Votre SaaS Template User ID est utilisé par les EA pour authentifier les requêtes API. Traitez-le comme un identifiant secret. Vous êtes responsable de la configuration correcte des EA et de toute activité effectuée sous votre compte.",
      ],
    },
    {
      title: "5. Abonnement et facturation",
      paragraphs: [
        "Les forfaits payants (Starter, TV Sync, Pro, Ultimate) sont facturés en EUR mensuellement ou annuellement via Stripe. Les prix sont indiqués sur notre page de tarification et peuvent être modifiés moyennant un préavis raisonnable.",
        `Les nouveaux abonnés bénéficient d'un essai gratuit de ${LEGAL_TRIAL_DAYS} jours lors de leur premier abonnement payant. Après tout essai, votre moyen de paiement est débité automatiquement sauf si vous annulez avant la fin de l'essai.`,
        "Les abonnements se renouvellent automatiquement à la fin de chaque période de facturation. Vous pouvez annuler ou modifier votre forfait via la page Facturation, qui redirige vers le Stripe Customer Portal.",
        "Le défaut de paiement peut entraîner la suspension de l'accès à l'API de synchronisation. Nous ne stockons pas les coordonnées complètes de votre carte de paiement — Stripe traite tous les paiements.",
      ],
    },
    {
      title: "6. Politique de remboursement",
      paragraphs: [
        `Nous offrons des remboursements discrétionnaires pour les demandes reçues dans les ${LEGAL_REFUND_WINDOW_HOURS} heures suivant votre premier prélèvement (après la fin de tout essai gratuit). Pour demander un remboursement, envoyez un e-mail à ${LEGAL_CONTACT_EMAIL} depuis l'adresse e-mail de votre compte enregistré, en indiquant votre demande et la date du prélèvement.`,
        "Les remboursements approuvés sont traités via Stripe sur votre moyen de paiement d'origine. Les demandes de remboursement reçues après le délai de 24 heures ne sont généralement pas acceptées en vertu de cette politique commerciale.",
        "Cette politique de remboursement n'affecte pas les droits légaux impératifs dont vous pourriez disposer en tant que consommateur en vertu de la loi applicable.",
      ],
    },
    {
      title: "7. Droit de rétractation (consommateurs UE et Roumanie)",
      paragraphs: [
        "Si vous êtes un consommateur dans l'Union européenne ou en Roumanie, vous disposez en général d'un droit de rétractation de 14 jours pour les contrats à distance sans avoir à motiver votre décision, en vertu de la directive 2011/83/UE et de l'ordonnance d'urgence du gouvernement roumain n° 34/2014 (OUG 34/2014).",
        "Pour les services numériques dont l'exécution commence immédiatement, vous pouvez perdre votre droit de rétractation si vous consentez expressément à un accès immédiat et reconnaissez que vous perdrez votre droit de rétractation une fois le service commencé. Ce consentement peut être recueilli lors du paiement ou de l'activation du compte.",
        `Pour exercer votre droit légal de rétractation, envoyez une déclaration claire à ${LEGAL_CONTACT_EMAIL} avant l'expiration du délai de rétractation. En cas de rétractation valide, nous rembourserons les paiements reçus sans retard injustifié et en tout état de cause dans un délai de 14 jours.`,
        "Pour les réclamations relatives aux droits des consommateurs, vous pouvez contacter l'Autorité nationale roumaine pour la protection des consommateurs (ANPC) sur anpc.ro.",
      ],
    },
    {
      title: "8. Utilisation acceptable",
      paragraphs: ["Vous vous engagez à ne pas :"],
      bullets: [
        "Partager votre User ID ou vos identifiants de compte avec des tiers non autorisés.",
        "Abuser, surcharger ou tenter de perturber l'API ou l'infrastructure.",
        "Procéder à de l'ingénierie inverse, du scraping ou de la revente du Service sans notre consentement écrit.",
        "Utiliser le Service pour une activité illégale ou en violation des conditions de votre courtier.",
        "Contourner les limites d'abonnement (par ex. limites de comptes esclaves pour votre niveau de forfait).",
      ],
    },
    {
      title: "9. Propriété intellectuelle",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}, notre site web, notre tableau de bord, notre API et nos EA propriétaires appartiennent à ${LEGAL_COMPANY_NAME} ou à ses concédants de licence. La distribution sur le MQL5 Market des EA gratuits est soumise aux conditions de MetaQuotes et du MQL5 Market.`,
        "Vous recevez une licence limitée, non exclusive et non transférable pour utiliser le Service pour vos opérations de trading personnelles ou internes à votre entreprise tant que votre abonnement est actif.",
      ],
    },
    {
      title: "10. Services tiers",
      paragraphs: [
        "Le Service s'intègre avec MetaTrader 5, votre courtier, le MQL5 Market, Stripe et d'autres tiers. Nous ne sommes pas responsables des interruptions, changements de politique ou défaillances des plateformes tierces. Votre utilisation des courtiers et plateformes de trading est régie par leurs propres conditions.",
      ],
    },
    {
      title: "11. Avertissement sur les risques de trading",
      paragraphs: [
        "Le trading d'instruments financiers comporte un risque substantiel de perte. Les performances passées des trades copiés ne garantissent pas les résultats futurs. SaaS Template est une infrastructure logicielle — il ne fournit pas de conseils financiers, de recommandations d'investissement ni de profits garantis.",
        "Vous êtes seul responsable de vos décisions de trading, de la configuration des EA, du dimensionnement des positions et du respect de la réglementation applicable. Vous utilisez le Service à vos propres risques.",
      ],
    },
    {
      title: "12. Disponibilité du service",
      paragraphs: [
        "Nous nous efforçons de maintenir le Service disponible, mais nous ne garantissons pas un fonctionnement ininterrompu ou exempt d'erreurs. La maintenance, les problèmes d'infrastructure ou les défaillances de tiers peuvent entraîner des interruptions. Aucun accord de niveau de service ne s'applique sauf accord écrit explicite.",
      ],
    },
    {
      title: "13. Limitation de responsabilité",
      paragraphs: [
        `Dans la mesure maximale autorisée par la loi applicable, ${LEGAL_COMPANY_NAME} ne pourra être tenu responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris les pertes de trading, les pertes de profits ou la perte de données résultant de l'utilisation du Service.`,
        `Notre responsabilité totale agrégée pour toute réclamation découlant de ces Conditions ou du Service est limitée aux frais que vous nous avez payés au cours des douze (12) mois précédant la réclamation. Rien dans ces Conditions ne limite une responsabilité qui ne peut être limitée en vertu de la législation impérative de protection des consommateurs.`,
      ],
    },
    {
      title: "14. Résiliation",
      paragraphs: [
        "Vous pouvez annuler votre abonnement à tout moment via la page Facturation. Nous pouvons suspendre ou résilier votre compte si vous enfreignez ces Conditions ou si la loi l'exige. En cas de résiliation, votre accès à l'API prend fin et nous pouvons supprimer vos données conformément à notre Politique de confidentialité.",
      ],
    },
    {
      title: "15. Droit applicable et litiges",
      paragraphs: [
        `Ces Conditions sont régies par les lois de ${LEGAL_GOVERNING_LAW}. Tout litige relève de la compétence exclusive des tribunaux compétents de ${LEGAL_JURISDICTION_CITY}, ${LEGAL_GOVERNING_LAW}, sans préjudice des droits impératifs des consommateurs qui pourraient vous permettre d'engager des procédures dans votre pays de résidence.`,
      ],
    },
    {
      title: "16. Modifications de ces Conditions",
      paragraphs: [
        "Nous pouvons mettre à jour ces Conditions de temps à autre. Les modifications importantes seront publiées sur cette page avec une date mise à jour. La poursuite de l'utilisation après les modifications vaut acceptation. Pour les modifications significatives, nous pouvons également vous en informer par e-mail.",
      ],
    },
    {
      title: "17. Contact",
      paragraphs: [
        `Questions relatives à ces Conditions : ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
