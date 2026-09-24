import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_PRODUCT_NAME,
  LEGAL_REGISTERED_ADDRESS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const privacyPolicyContent: LegalDocumentContent = {
  title: "Politique de confidentialité",
  lastUpdated: "30 August 2026",
  intro: [
    `La présente Politique de confidentialité explique comment ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}), exploitant le service ${LEGAL_PRODUCT_NAME} sur example.com (« nous », « notre », « nos »), collecte, utilise, stocke et protège vos données personnelles lorsque vous utilisez notre site web, notre tableau de bord et notre API de synchronisation cloud.`,
    "Nous traitons les données personnelles conformément au Règlement général sur la protection des données (RGPD) de l'UE et à la législation roumaine applicable en matière de protection des données.",
  ],
  sections: [
    {
      title: "1. Responsable du traitement",
      paragraphs: [
        `Le responsable du traitement de vos données personnelles est ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, adresse enregistrée : ${LEGAL_REGISTERED_ADDRESS}.`,
        `${LEGAL_PRODUCT_NAME} est la dénomination commerciale de notre service cloud de copy trading MT5. Pour toute question relative à la confidentialité ou pour exercer vos droits, contactez-nous à ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "2. Données que nous collectons",
      paragraphs: [
        "Nous collectons uniquement les données nécessaires à la fourniture du service SaaS Template :",
      ],
      bullets: [
        "Données de compte : nom, adresse e-mail, hash du mot de passe (si vous vous inscrivez par e-mail) et photo de profil (si vous vous connectez avec Google).",
        "Données de session : cookies d'authentification, jetons de session, et éventuellement votre adresse IP et l'agent utilisateur du navigateur lorsque vous utilisez le tableau de bord web.",
        "Données d'abonnement : niveau de forfait, statut de l'abonnement et identifiant client Stripe. Les coordonnées de carte de paiement sont collectées et stockées par Stripe, et non par nous.",
        "Données de synchronisation de trading : nom de la société de courtage, solde du compte, équité, positions ouvertes et historique des transactions clôturées transmis par vos Expert Advisors MetaTrader 5. Pour Mirror Ownership (prévention du trading en double lorsque plusieurs terminaux sont connectés au même compte), l'EA peut envoyer votre numéro de compte MT5 afin que nous puissions dériver une clé de bail unidirectionnelle ; nous ne stockons que ce hash, et non le numéro de compte ni le mot de passe de trading.",
        "Identifiants API EA : votre SaaS Template User ID, transmis dans l'en-tête x-user-id par les EA. Traitez-le comme un secret — toute personne disposant de votre User ID et d'un abonnement actif pourrait accéder à votre API de synchronisation.",
        "Données d'intégration : indication de la finalisation de l'assistant de configuration.",
        "Données d'assistance : si vous soumettez le formulaire d'aide privé, nous stockons votre e-mail, la catégorie du message, l'objet et le corps du message, et nous pouvons lier le ticket à votre compte lorsque vous êtes connecté. Des compteurs temporaires de limitation de débit basés sur l'IP peuvent être conservés en mémoire applicative pour prévenir les abus.",
        "Messages du bot d'aide : si vous utilisez le chat d'aide optionnel, vos messages et les réponses du modèle sont envoyés au fournisseur d'IA décrit à la section 5 afin que nous puissions répondre à partir de notre FAQ publique. N'y collez pas de mots de passe ni de secrets complets.",
      ],
    },
    {
      title: "3. Utilisation de vos données et bases juridiques",
      paragraphs: [
        "Nous traitons vos données personnelles aux fins suivantes et sur les bases juridiques suivantes en vertu de l'article 6 du RGPD :",
      ],
      bullets: [
        "Fourniture de votre compte, de votre tableau de bord et du service de synchronisation cloud — exécution de notre contrat avec vous (art. 6(1)(b)).",
        "Traitement des abonnements et de la facturation via Stripe — exécution du contrat et obligation légale pour les registres financiers (art. 6(1)(b) et (c)).",
        "Sécurisation du service, prévention des abus et protection de l'accès à l'API — intérêt légitime (art. 6(1)(f)).",
        "Envoi d'e-mails transactionnels d'authentification (comme les liens de réinitialisation de mot de passe) — exécution du contrat et intérêt légitime en matière de sécurité du compte (art. 6(1)(b) et (f)).",
        "Connexion Google OAuth (si vous la choisissez) — votre consentement lors de la connexion (art. 6(1)(a)).",
        "Réponse aux demandes d'assistance (e-mail, formulaire d'aide privé ou bot d'aide) et aux demandes juridiques — intérêt légitime ou obligation légale, selon le cas.",
      ],
    },
    {
      title: "4. Cookies",
      paragraphs: [
        "Nous utilisons des cookies de session strictement nécessaires pour vous maintenir connecté au tableau de bord SaaS Template. Ces cookies sont essentiels au service et ne nécessitent pas de consentement en vertu de la directive ePrivacy.",
        "Lors de votre première visite, nous affichons une bannière de préférences de cookies. Les analyses (Cloudflare Web Analytics et événements d'entonnoir anonymes) ne se chargent que si vous choisissez Tout accepter ou activez Analytics dans les paramètres de cookies. Il s'agit d'un service d'analyse agrégé sans cookies qui n'identifie pas les utilisateurs individuellement et n'utilise pas de cookies publicitaires ou de suivi tiers.",
        "Vous pouvez modifier votre choix à tout moment via les paramètres de cookies dans le pied de page du site.",
        "Nous n'utilisons pas de cookies publicitaires ou de suivi tiers. Si nous introduisons d'autres cookies non essentiels à l'avenir, nous mettrons à jour cette politique et demanderons votre consentement lorsque la loi l'exige.",
      ],
    },
    {
      title: "5. Sous-traitants tiers",
      paragraphs: [
        "Nous partageons des données personnelles avec des sous-traitants de confiance qui nous aident à exploiter le service. Chaque sous-traitant ne traite les données que selon nos instructions et dans le cadre d'accords de protection des données appropriés :",
      ],
      bullets: [
        "Stripe — traitement des paiements et facturation des abonnements (stripe.com/privacy). Stripe agit en tant que responsable indépendant pour les données de paiement qu'il collecte directement.",
        "Supabase — hébergement de base de données PostgreSQL gérée pour les comptes, la synchronisation de trading et les tickets d'assistance privés.",
        "Railway — hébergement applicatif et infrastructure.",
        "Google — authentification OAuth, uniquement si vous choisissez de vous connecter avec Google (policies.google.com/privacy).",
        "Resend — e-mails transactionnels pour la réinitialisation de mot de passe et la confirmation de suppression de compte, contenant l'adresse e-mail de votre compte et un lien à durée limitée (resend.com/legal/privacy-policy).",
        "Google Gemini API (Google AI Studio / Gemini Developer API) — réponses optionnelles du bot d'aide fondées sur notre FAQ publique. Lorsque le bot d'aide est activé, les messages de chat sont envoyés à Google pour générer des réponses. L'utilisation de l'API Gemini en niveau gratuit peut être utilisée par Google pour améliorer ses produits conformément aux conditions de Google ; n'envoyez pas de secrets sensibles dans le chat d'aide. Les configurations payantes ou de niveau supérieur peuvent offrir des conditions de données différentes — nous mettrons à jour cette politique si notre niveau de production change.",
        "Cloudflare — Web Analytics sans cookies sur les pages marketing lorsqu'il est activé, et CDN/sécurité pour example.com (cloudflare.com/privacypolicy).",
        "GitHub — uniquement si vous publiez volontairement un ticket public ; le contenu que vous y publiez est public et soumis aux conditions de GitHub, et non à notre file d'assistance privée.",
      ],
    },
    {
      title: "6. Transferts internationaux de données",
      paragraphs: [
        "Certains de nos sous-traitants peuvent stocker ou traiter des données en dehors de l'Espace économique européen (EEE), y compris aux États-Unis. Lorsque de tels transferts ont lieu, nous nous appuyons sur des garanties appropriées telles que les Clauses contractuelles types de l'UE et la conformité du sous-traitant aux cadres de protection des données applicables.",
      ],
    },
    {
      title: "7. Conservation des données",
      paragraphs: [
        "Nous conservons vos données uniquement aussi longtemps que nécessaire aux fins décrites dans la présente politique :",
      ],
      bullets: [
        "Données de compte et de profil : conservées tant que votre compte est actif et pendant une période raisonnable après une demande de suppression ou la fermeture du compte, sauf si une période plus longue est exigée par la loi.",
        "Données de synchronisation de trading : les positions actives sont remplacées à chaque synchronisation master ; l'historique des transactions clôturées est conservé tant que votre compte est actif pour alimenter les métriques du tableau de bord.",
        "Données de bail Mirror Ownership : le hash unidirectionnel de connexion au courtier (brokerLoginHmac) stocké sur les comptes de trading, et les lignes mirror_leases associées, sont conservés tant que votre compte est actif et supprimés lors de la suppression de votre compte utilisateur (cascade de base de données).",
        "Données de session : conservées jusqu'à l'expiration de la session ou votre déconnexion.",
        "Registres de facturation : conservés conformément à la législation fiscale et comptable applicable, en ligne avec les pratiques de conservation de Stripe.",
        "Tickets d'assistance privés : conservés tant qu'ils sont utiles pour traiter votre demande et pendant une période raisonnable ensuite pour la prévention des abus et la qualité du service, puis supprimés ou anonymisés, sauf si une période plus longue est exigée par la loi. Les demandes d'effacement de compte peuvent inclure les tickets d'assistance ouverts liés à votre identifiant utilisateur.",
        "Chats du bot d'aide : non stockés comme historique permanent de tickets dans notre base de données ; les messages sont traités pour générer une réponse et peuvent être gérés par le processeur d'IA selon ses règles de conservation pour le niveau d'API utilisé.",
      ],
    },
    {
      title: "8. Vos droits en vertu du RGPD",
      paragraphs: [
        "Si vous vous trouvez dans l'EEE ou au Royaume-Uni, vous disposez des droits suivants concernant vos données personnelles :",
      ],
      bullets: [
        "Droit d'accès — demander une copie des données personnelles que nous détenons à votre sujet.",
        "Droit de rectification — demander la correction de données inexactes.",
        "Droit à l'effacement — demander la suppression de vos données, sous réserve des obligations légales de conservation.",
        "Droit à la limitation — demander que nous limitions l'utilisation de vos données dans certaines circonstances.",
        "Droit à la portabilité — recevoir vos données dans un format structuré et lisible par machine lorsque cela est techniquement faisable.",
        "Droit d'opposition — vous opposer au traitement fondé sur des intérêts légitimes.",
        "Droit de retirer votre consentement — lorsque le traitement est fondé sur le consentement, vous pouvez le retirer à tout moment sans affecter le traitement licite antérieur.",
        "Droit d'introduire une réclamation — auprès de l'Autorité nationale de supervision roumaine pour le traitement des données à caractère personnel (ANSPDCP) sur dataprotection.ro, ou auprès de votre autorité de contrôle locale.",
      ],
    },
    {
      title: "9. Comment exercer vos droits",
      paragraphs: [
        `Pour exercer l'un des droits ci-dessus, envoyez-nous un e-mail à ${LEGAL_CONTACT_EMAIL} depuis l'adresse e-mail associée à votre compte. Nous répondrons dans un délai d'un mois, conformément au RGPD. Nous pourrons avoir besoin de vérifier votre identité avant de traiter votre demande.`,
        "Vous pouvez supprimer définitivement votre compte depuis Tableau de bord → Paramètres. La suppression annule tous les abonnements actifs et supprime les données de compte associées. Vous pouvez également nous envoyer un e-mail pour demander l'effacement.",
      ],
    },
    {
      title: "10. Sécurité",
      paragraphs: [
        "Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données, notamment le chiffrement HTTPS, le hachage des mots de passe et des contrôles d'accès limités à votre compte utilisateur. Votre SaaS Template User ID sert d'identifiant API — ne le partagez pas publiquement et ne l'intégrez pas dans des fichiers partagés. Les tickets d'assistance privés ne sont visibles que par les opérateurs autorisés.",
      ],
    },
    {
      title: "11. Enfants",
      paragraphs: [
        "SaaS Template ne s'adresse pas aux enfants de moins de 16 ans. Nous ne collectons pas sciemment de données personnelles auprès de personnes de moins de 16 ans. Si vous pensez qu'un enfant nous a fourni des données, contactez-nous et nous les supprimerons.",
      ],
    },
    {
      title: "12. Avertissement relatif aux données de trading",
      paragraphs: [
        "Les données de trading affichées dans le tableau de bord ou transmises via notre API de synchronisation sont des informations opérationnelles concernant vos comptes MetaTrader. Elles ne constituent pas un conseil financier, une recherche en investissement ni une recommandation de trading. Le trading comporte un risque substantiel de perte. Le bot d'aide optionnel ne constitue pas un conseil financier et peut être inexact ; utilisez le formulaire d'aide privé ou l'e-mail pour les questions spécifiques à votre compte.",
      ],
    },
    {
      title: "13. Modifications de cette politique",
      paragraphs: [
        "Nous pouvons mettre à jour la présente Politique de confidentialité de temps à autre. Les modifications importantes seront publiées sur cette page avec une date mise à jour. La poursuite de l'utilisation du service après les modifications vaut acceptation de la politique mise à jour.",
      ],
    },
    {
      title: "14. Contact",
      paragraphs: [
        `Pour toute question relative à la confidentialité ou toute demande d'exercice de droits : ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
