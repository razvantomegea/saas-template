import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_PRODUCT_NAME,
  LEGAL_REGISTERED_ADDRESS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const privacyPolicyContent: LegalDocumentContent = {
  title: "Datenschutzerklärung",
  lastUpdated: "30 August 2026",
  intro: [
    `Diese Datenschutzerklärung erläutert, wie ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}), Betreiber des ${LEGAL_PRODUCT_NAME}-Dienstes unter example.com („wir“, „uns“, „unser“), Ihre personenbezogenen Daten erhebt, verwendet, speichert und schützt, wenn Sie unsere Website, das Dashboard und die Cloud-Sync-API nutzen.`,
    "Wir verarbeiten personenbezogene Daten gemäß der EU-Datenschutz-Grundverordnung (DSGVO) und dem anwendbaren rumänischen Datenschutzrecht.",
  ],
  sections: [
    {
      title: "1. Verantwortlicher",
      paragraphs: [
        `Der für Ihre personenbezogenen Daten Verantwortliche ist ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, Sitz: ${LEGAL_REGISTERED_ADDRESS}.`,
        `${LEGAL_PRODUCT_NAME} ist der Handelsname unseres MT5-Copy-Trading-Cloud-Dienstes. Für Datenschutzanfragen oder zur Ausübung Ihrer Rechte kontaktieren Sie uns unter ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "2. Welche Daten wir erheben",
      paragraphs: [
        "Wir erheben nur die Daten, die zur Bereitstellung des SaaS Template-Dienstes erforderlich sind:",
      ],
      bullets: [
        "Kontodaten: Name, E-Mail-Adresse, Passwort-Hash (bei E-Mail-Registrierung) und Profilbild (bei Google-Anmeldung).",
        "Sitzungsdaten: Authentifizierungs-Cookies, Sitzungstoken und optional Ihre IP-Adresse sowie den Browser-User-Agent bei Nutzung des Web-Dashboards.",
        "Abonnementdaten: Tarifstufe, Abonnementstatus und Stripe-Kundenkennung. Zahlungskartendaten werden von Stripe erhoben und gespeichert, nicht von uns.",
        "Trading-Sync-Daten: Broker-Firmenname, Kontostand, Equity, offene Positionen und abgeschlossene Trade-Historie, die von Ihren MetaTrader-5-Expert-Advisors gesendet werden. Für Mirror Ownership (Verhinderung doppelten Tradings bei mehreren Terminals am selben Konto) kann der EA Ihre MT5-Kontonummer senden, damit wir einen Einweg-Lease-Schlüssel ableiten; wir speichern nur diesen Hash, nicht die Kontonummer oder das Handelspasswort.",
        "EA-API-Zugangsdaten: Ihre SaaS Template User ID, die von EAs im Header x-user-id übermittelt wird. Behandeln Sie sie als Geheimnis — wer Ihre User ID und ein aktives Abonnement hat, könnte Ihre Sync-API nutzen.",
        "Onboarding-Daten: ob Sie den Setup-Assistenten abgeschlossen haben.",
        "Support-Daten: bei Nutzung des privaten Help-Formulars speichern wir E-Mail, Nachrichten-Kategorie, Betreff und Nachrichtentext und können das Ticket bei Anmeldung mit Ihrem Konto verknüpfen. Temporäre IP-basierte Rate-Limit-Zähler können im Anwendungsspeicher gehalten werden, um Missbrauch zu verhindern.",
        "Help-Bot-Nachrichten: bei Nutzung des optionalen Help-Chats werden Ihre Eingaben und Modellantworten an den in Abschnitt 5 beschriebenen KI-Anbieter gesendet, damit wir anhand unseres öffentlichen FAQ antworten. Fügen Sie keine Passwörter oder vollständigen Geheimnisse in den Chat ein.",
      ],
    },
    {
      title: "3. Wie wir Ihre Daten nutzen und Rechtsgrundlagen",
      paragraphs: [
        "Wir verarbeiten Ihre personenbezogenen Daten zu folgenden Zwecken und auf folgenden Rechtsgrundlagen nach Art. 6 DSGVO:",
      ],
      bullets: [
        "Bereitstellung Ihres Kontos, Dashboards und Cloud-Sync-Dienstes — Vertragserfüllung (Art. 6 Abs. 1 lit. b).",
        "Verarbeitung von Abonnements und Abrechnung über Stripe — Vertragserfüllung und rechtliche Verpflichtung für Finanzunterlagen (Art. 6 Abs. 1 lit. b und c).",
        "Absicherung des Dienstes, Missbrauchsprävention und Schutz des API-Zugangs — berechtigtes Interesse (Art. 6 Abs. 1 lit. f).",
        "Versand transaktionaler Authentifizierungs-E-Mails (z. B. Passwort-Reset-Links) — Vertragserfüllung und berechtigtes Interesse an Kontosicherheit (Art. 6 Abs. 1 lit. b und f).",
        "Google-OAuth-Anmeldung (falls gewählt) — Ihre Einwilligung bei der Anmeldung (Art. 6 Abs. 1 lit. a).",
        "Beantwortung von Support-Anfragen (E-Mail, privates Help-Formular oder Help-Bot) und rechtlichen Anfragen — berechtigtes Interesse oder rechtliche Verpflichtung, je nach Fall.",
      ],
    },
    {
      title: "4. Cookies",
      paragraphs: [
        "Wir verwenden unbedingt erforderliche Sitzungs-Cookies, um Sie im SaaS Template-Dashboard angemeldet zu halten. Diese Cookies sind für den Dienst erforderlich und bedürfen nach der ePrivacy-Richtlinie keiner Einwilligung.",
        "Beim ersten Besuch zeigen wir ein Cookie-Präferenz-Banner. Analytics (Cloudflare Web Analytics und anonyme Funnel-Ereignisse) wird nur geladen, wenn Sie „Accept all“ wählen oder Analytics in den Cookie settings aktivieren. Dies ist ein cookieloser Aggregat-Analytics-Dienst, der keine einzelnen Nutzer identifiziert und keine Werbe- oder Drittanbieter-Tracking-Cookies verwendet.",
        "Sie können Ihre Wahl jederzeit über Cookie settings in der Fußzeile der Website ändern.",
        "Wir verwenden keine Werbe- oder Drittanbieter-Tracking-Cookies. Führen wir künftig andere nicht notwendige Cookies ein, aktualisieren wir diese Richtlinie und holen gegebenenfalls Ihre Einwilligung ein.",
      ],
    },
    {
      title: "5. Auftragsverarbeiter",
      paragraphs: [
        "Wir geben personenbezogene Daten an vertrauenswürdige Auftragsverarbeiter weiter, die uns beim Betrieb des Dienstes unterstützen. Jeder Verarbeiter verarbeitet Daten nur nach unseren Weisungen und unter geeigneten Datenschutzvereinbarungen:",
      ],
      bullets: [
        "Stripe — Zahlungsabwicklung und Abonnementabrechnung (stripe.com/privacy). Stripe handelt als unabhängiger Verantwortlicher für Zahlungsdaten, die er direkt erhebt.",
        "Supabase — verwaltetes PostgreSQL-Hosting für Konto-, Trading-Sync- und private Support-Ticket-Daten.",
        "Railway — Anwendungshosting und Infrastruktur.",
        "Google — OAuth-Authentifizierung nur bei Anmeldung mit Google (policies.google.com/privacy).",
        "Resend — transaktionale E-Mails für Passwort-Reset und Konto-Löschbestätigung mit Ihrer Konto-E-Mail und einem zeitlich begrenzten Link (resend.com/legal/privacy-policy).",
        "Google Gemini API (Google AI Studio / Gemini Developer API) — optionale Help-Bot-Antworten auf Basis unseres öffentlichen FAQ. Bei aktiviertem Help-Bot werden Chat-Nachrichten an Google gesendet. Free-Tier-Gemini-API-Nutzung kann von Google zur Produktverbesserung gemäß Googles Bedingungen genutzt werden; senden Sie keine sensiblen Geheimnisse im Help-Chat. Bezahlte oder höhere Stufen können andere Datenbedingungen haben — wir aktualisieren diese Richtlinie bei Änderung unserer Production-Stufe.",
        "Cloudflare — cookielose Web Analytics auf Marketingseiten bei Aktivierung sowie CDN/Sicherheit für example.com (cloudflare.com/privacypolicy).",
        "GitHub — nur wenn Sie freiwillig ein öffentliches Issue posten; dort veröffentlichte Inhalte sind öffentlich und unterliegen den GitHub-Bedingungen, nicht unserer privaten Support-Warteschlange.",
      ],
    },
    {
      title: "6. Internationale Datenübermittlungen",
      paragraphs: [
        "Einige unserer Auftragsverarbeiter können Daten außerhalb des Europäischen Wirtschaftsraums (EWR) speichern oder verarbeiten, einschließlich in den Vereinigten Staaten. Bei solchen Übermittlungen stützen wir uns auf geeignete Garantien wie die EU-Standardvertragsklauseln und die Einhaltung geltender Datenschutzrahmen durch den Verarbeiter.",
      ],
    },
    {
      title: "7. Speicherdauer",
      paragraphs: [
        "Wir speichern Ihre Daten nur so lange, wie es für die in dieser Richtlinie beschriebenen Zwecke erforderlich ist:",
      ],
      bullets: [
        "Konto- und Profildaten: solange Ihr Konto aktiv ist und für einen angemessenen Zeitraum nach Löschanfrage oder Kontoschließung, sofern gesetzlich keine längere Frist erforderlich ist.",
        "Trading-Sync-Daten: aktive Positionen werden bei jedem Master-Sync ersetzt; abgeschlossene Trade-Historie wird bei aktivem Konto für Dashboard-Metriken gespeichert.",
        "Mirror-Ownership-Lease-Daten: der Einweg-Broker-Login-Hash (brokerLoginHmac) auf Trading-Konten und zugehörige mirror_leases-Zeilen werden bei aktivem Konto gespeichert und bei Löschung Ihres Benutzerkontos entfernt (Datenbank-Cascade).",
        "Sitzungsdaten: bis die Sitzung abläuft oder Sie sich abmelden.",
        "Abrechnungsunterlagen: wie nach geltendem Steuer- und Rechnungslegungsrecht erforderlich, im Einklang mit den Speicherpraktiken von Stripe.",
        "Private Support-Tickets: solange für die Bearbeitung Ihrer Anfrage nützlich und danach für einen angemessenen Zeitraum zur Missbrauchsprävention und Servicequalität, dann gelöscht oder anonymisiert, sofern gesetzlich keine längere Frist erforderlich ist. Löschanfragen können offene Support-Tickets umfassen, die mit Ihrer User-ID verknüpft sind.",
        "Help-Bot-Chats: nicht als permanente Ticket-Historie in unserer Datenbank gespeichert; Nachrichten werden zur Antwortgenerierung verarbeitet und können vom KI-Prozessor nach dessen Speicherregeln für die genutzte API-Stufe behandelt werden.",
      ],
    },
    {
      title: "8. Ihre Rechte nach der DSGVO",
      paragraphs: [
        "Wenn Sie sich im EWR oder im Vereinigten Königreich befinden, haben Sie folgende Rechte bezüglich Ihrer personenbezogenen Daten:",
      ],
      bullets: [
        "Auskunftsrecht — Kopie der über Sie gespeicherten personenbezogenen Daten anfordern.",
        "Recht auf Berichtigung — Korrektur unrichtiger Daten verlangen.",
        "Recht auf Löschung — Löschung Ihrer Daten verlangen, vorbehaltlich gesetzlicher Aufbewahrungspflichten.",
        "Recht auf Einschränkung — verlangen, dass wir die Nutzung Ihrer Daten unter bestimmten Umständen einschränken.",
        "Recht auf Datenübertragbarkeit — Ihre Daten in einem strukturierten, maschinenlesbaren Format erhalten, soweit technisch machbar.",
        "Widerspruchsrecht — Verarbeitung auf Grundlage berechtigter Interessen widersprechen.",
        "Recht auf Widerruf der Einwilligung — soweit die Verarbeitung auf Einwilligung beruht, können Sie diese jederzeit widerrufen, ohne die Rechtmäßigkeit der vorherigen Verarbeitung zu berühren.",
        "Beschwerderecht — bei der rumänischen nationalen Aufsichtsbehörde für die Verarbeitung personenbezogener Daten (ANSPDCP) unter dataprotection.ro oder Ihrer lokalen Aufsichtsbehörde.",
      ],
    },
    {
      title: "9. Wie Sie Ihre Rechte ausüben",
      paragraphs: [
        `Um eines der oben genannten Rechte auszuüben, schreiben Sie uns unter ${LEGAL_CONTACT_EMAIL} von der mit Ihrem Konto verknüpften E-Mail-Adresse. Wir antworten innerhalb eines Monats gemäß DSGVO. Wir müssen möglicherweise Ihre Identität prüfen, bevor wir Ihre Anfrage bearbeiten.`,
        "Sie können Ihr Konto dauerhaft unter Dashboard → Settings löschen. Die Löschung kündigt alle aktiven Abonnements und entfernt zugehörige Kontodaten. Sie können uns auch per E-Mail um Löschung bitten.",
      ],
    },
    {
      title: "10. Sicherheit",
      paragraphs: [
        "Wir setzen technische und organisatorische Maßnahmen zum Schutz Ihrer Daten um, einschließlich HTTPS-Verschlüsselung, Passwort-Hashing und zugriffskontrollen, die auf Ihr Benutzerkonto beschränkt sind. Ihre SaaS Template User ID dient als API-Zugangsdaten — teilen Sie sie nicht öffentlich und betten Sie sie nicht in freigegebene Dateien ein. Private Support-Tickets sind nur für autorisierte Operatoren sichtbar.",
      ],
    },
    {
      title: "11. Kinder",
      paragraphs: [
        "SaaS Template richtet sich nicht an Kinder unter 16 Jahren. Wir erheben wissentlich keine personenbezogenen Daten von Personen unter 16. Wenn Sie glauben, dass ein Kind uns Daten bereitgestellt hat, kontaktieren Sie uns, und wir löschen sie.",
      ],
    },
    {
      title: "12. Hinweis zu Trading-Daten",
      paragraphs: [
        "Im Dashboard angezeigte oder über unsere Sync-API übermittelte Trading-Daten sind betriebliche Informationen zu Ihren MetaTrader-Konten. Sie stellen keine Finanzberatung, Investmentforschung oder Handelsempfehlung dar. Trading birgt erhebliches Verlustrisiko. Der optionale Help-Bot ist keine Finanzberatung und kann ungenau sein; nutzen Sie für kontospezifische Themen das private Support-Formular oder E-Mail.",
      ],
    },
    {
      title: "13. Änderungen dieser Richtlinie",
      paragraphs: [
        "Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wesentliche Änderungen werden auf dieser Seite mit aktualisiertem Datum veröffentlicht. Die fortgesetzte Nutzung des Dienstes nach Änderungen gilt als Annahme der aktualisierten Richtlinie.",
      ],
    },
    {
      title: "14. Kontakt",
      paragraphs: [
        `Für Datenschutzfragen oder Betroffenenanfragen: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
