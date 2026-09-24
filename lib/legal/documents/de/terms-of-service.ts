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
  title: "Nutzungsbedingungen",
  lastUpdated: "9 June 2026",
  intro: [
    `Diese Nutzungsbedingungen („Bedingungen“) regeln Ihre Nutzung des Cloud-Dienstes ${LEGAL_PRODUCT_NAME}, betrieben von ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}) unter example.com („Dienst“). Mit der Erstellung eines Kontos oder der Nutzung des Dienstes stimmen Sie diesen Bedingungen zu.`,
    "Wenn Sie nicht zustimmen, nutzen Sie den Dienst nicht.",
  ],
  sections: [
    {
      title: "1. Dienstbeschreibung",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME} ist ein Cloud-Relay und Dashboard für MetaTrader-5-Copy-Trading. Ein Master-Expert-Advisor (EA) veröffentlicht offene Positionen an unsere API; Slave-EAs pollen die API und spiegeln Trades auf Follower-Konten.`,
        "Die SaaS Template Master Publisher- und Slave Subscriber-EAs werden kostenlos auf dem MQL5 Market vertrieben. Ein kostenpflichtiges Abonnement bei example.com schaltet Cloud-Sync und Dashboard-Zugang frei.",
      ],
    },
    {
      title: "2. Vertragspartner",
      paragraphs: [
        `Der Dienst wird bereitgestellt von ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}. ${LEGAL_PRODUCT_NAME} ist unser Handelsname. Kontakt: ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "3. Berechtigung",
      paragraphs: [
        "Sie müssen mindestens 18 Jahre alt und rechtlich in der Lage sein, verbindliche Verträge einzugehen, um den Dienst zu nutzen. Mit der Registrierung erklären Sie, dass Sie diese Anforderungen erfüllen.",
      ],
    },
    {
      title: "4. Kontoregistrierung",
      paragraphs: [
        "Sie können sich mit E-Mail und Passwort oder, soweit verfügbar, mit Google anmelden. Sie sind dafür verantwortlich, Ihre Zugangsdaten vertraulich zu halten.",
        "Ihre SaaS Template User ID wird von EAs zur Authentifizierung von API-Anfragen verwendet. Behandeln Sie sie als geheime Zugangsdaten. Sie sind für die korrekte Konfiguration der EAs und für alle Aktivitäten unter Ihrem Konto verantwortlich.",
      ],
    },
    {
      title: "5. Abonnement und Abrechnung",
      paragraphs: [
        "Kostenpflichtige Pläne (Starter, TV Sync, Pro, Ultimate) werden monatlich oder jährlich in EUR über Stripe abgerechnet. Preise sind auf unserer Pricing-Seite angegeben und können mit angemessener Frist geändert werden.",
        `Neue Abonnenten erhalten bei ihrem ersten kostenpflichtigen Abonnement eine ${LEGAL_TRIAL_DAYS}-tägige kostenlose Testphase. Nach jeder Testphase wird Ihre Zahlungsmethode automatisch belastet, sofern Sie nicht vor Ende der Testphase kündigen.`,
        "Abonnements verlängern sich am Ende jedes Abrechnungszeitraums automatisch. Sie können Ihren Plan über die Billing-Seite kündigen oder ändern, die zum Stripe Customer Portal weiterleitet.",
        "Zahlungsausfall kann zur Aussetzung des Sync-API-Zugangs führen. Wir speichern Ihre vollständigen Kartendaten nicht — Stripe verarbeitet alle Zahlungen.",
      ],
    },
    {
      title: "6. Rückerstattungsrichtlinie",
      paragraphs: [
        `Wir bieten Ermessensrückerstattungen für Anfragen innerhalb von ${LEGAL_REFUND_WINDOW_HOURS} Stunden nach Ihrer ersten Belastung (nach Ende einer kostenlosen Testphase). Zur Beantragung schreiben Sie an ${LEGAL_CONTACT_EMAIL} von Ihrer registrierten Konto-E-Mail mit Ihrer Anfrage und dem Belastungsdatum.`,
        "Genehmigte Rückerstattungen werden über Stripe auf Ihre ursprüngliche Zahlungsmethode abgewickelt. Nach dem 24-Stunden-Fenster eingehende Anfragen werden unter dieser kommerziellen Richtlinie in der Regel nicht akzeptiert.",
        "Diese Rückerstattungsrichtlinie berührt nicht zwingende gesetzliche Rechte, die Ihnen als Verbraucher nach geltendem Recht zustehen können.",
      ],
    },
    {
      title: "7. Widerrufsrecht (EU- und rumänische Verbraucher)",
      paragraphs: [
        "Wenn Sie Verbraucher in der Europäischen Union oder in Rumänien sind, haben Sie in der Regel ein 14-tägiges Widerrufsrecht bei Fernabsatzverträgen ohne Angabe von Gründen gemäß Richtlinie 2011/83/EU und rumänischer Regierungsnotverordnung Nr. 34/2014 (OUG 34/2014).",
        "Bei digitalen Diensten, deren Leistung sofort beginnt, können Sie das Widerrufsrecht verlieren, wenn Sie ausdrücklich der sofortigen Nutzung zustimmen und anerkennen, dass Sie Ihr Widerrufsrecht nach Beginn des Dienstes verlieren. Diese Zustimmung kann beim Checkout oder bei der Kontoaktivierung eingeholt werden.",
        `Um Ihr gesetzliches Widerrufsrecht auszuüben, senden Sie vor Ablauf der Widerrufsfrist eine klare Erklärung an ${LEGAL_CONTACT_EMAIL}. Bei wirksamem Widerruf erstatten wir erhaltene Zahlungen unverzüglich und jedenfalls innerhalb von 14 Tagen.`,
        "Bei Beschwerden zu Verbraucherrechten können Sie die rumänische Nationale Behörde für Verbraucherschutz (ANPC) unter anpc.ro kontaktieren.",
      ],
    },
    {
      title: "8. Zulässige Nutzung",
      paragraphs: ["Sie verpflichten sich, Folgendes zu unterlassen:"],
      bullets: [
        "Ihre User ID oder Kontodaten an unbefugte Dritte weiterzugeben.",
        "Die API oder Infrastruktur zu missbrauchen, zu überlasten oder zu stören.",
        "Den Dienst ohne unsere schriftliche Zustimmung rückzuentwickeln, auszulesen oder weiterzuverkaufen.",
        "Den Dienst für rechtswidrige Aktivitäten oder unter Verstoß gegen die Bedingungen Ihres Brokers zu nutzen.",
        "Abonnementlimits zu umgehen (z. B. Slave-Kontolimits Ihrer Tarifstufe).",
      ],
    },
    {
      title: "9. Geistiges Eigentum",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}, unsere Website, unser Dashboard, unsere API und proprietären EAs gehören ${LEGAL_COMPANY_NAME} oder ihren Lizenzgebern. Die MQL5-Market-Verteilung der kostenlosen EAs unterliegt den Bedingungen von MetaQuotes und dem MQL5 Market.`,
        "Sie erhalten eine beschränkte, nicht ausschließliche, nicht übertragbare Lizenz zur Nutzung des Dienstes für Ihre persönlichen oder internen geschäftlichen Trading-Operationen, solange Ihr Abonnement aktiv ist.",
      ],
    },
    {
      title: "10. Drittanbieterdienste",
      paragraphs: [
        "Der Dienst integriert MetaTrader 5, Ihren Broker, den MQL5 Market, Stripe und andere Dritte. Wir sind nicht verantwortlich für Ausfälle, Richtlinienänderungen oder Fehler von Drittplattformen. Ihre Nutzung von Brokern und Handelsplattformen unterliegt deren eigenen Bedingungen.",
      ],
    },
    {
      title: "11. Trading-Risikohinweis",
      paragraphs: [
        "Der Handel mit Finanzinstrumenten birgt erhebliches Verlustrisiko. Vergangene Performance kopierter Trades garantiert keine zukünftigen Ergebnisse. SaaS Template ist Software-Infrastruktur — sie bietet keine Finanzberatung, Anlageempfehlungen oder Gewinnversprechen.",
        "Sie sind allein verantwortlich für Ihre Trading-Entscheidungen, EA-Konfiguration, Positionsgröße und Einhaltung geltender Vorschriften. Nutzen Sie den Dienst auf eigenes Risiko.",
      ],
    },
    {
      title: "12. Verfügbarkeit des Dienstes",
      paragraphs: [
        "Wir bemühen uns um Verfügbarkeit des Dienstes, garantieren jedoch keinen unterbrechungsfreien oder fehlerfreien Betrieb. Wartung, Infrastrukturprobleme oder Ausfälle Dritter können Ausfallzeiten verursachen. Es gilt keine Service-Level-Vereinbarung, sofern nicht ausdrücklich schriftlich vereinbart.",
      ],
    },
    {
      title: "13. Haftungsbeschränkung",
      paragraphs: [
        `Soweit gesetzlich zulässig, haftet ${LEGAL_COMPANY_NAME} nicht für indirekte, zufällige, besondere, Folgeschäden oder Strafschäden, einschließlich Trading-Verlusten, entgangenem Gewinn oder Datenverlust aus der Nutzung des Dienstes.`,
        "Unsere gesamte Gesamthaftung für Ansprüche aus diesen Bedingungen oder dem Dienst ist auf die Gebühren beschränkt, die Sie in den zwölf (12) Monaten vor dem Anspruch an uns gezahlt haben. Nichts in diesen Bedingungen beschränkt Haftung, die nach zwingendem Verbraucherschutzrecht nicht beschränkt werden kann.",
      ],
    },
    {
      title: "14. Kündigung",
      paragraphs: [
        "Sie können Ihr Abonnement jederzeit über die Billing-Seite kündigen. Wir können Ihr Konto sperren oder kündigen, wenn Sie diese Bedingungen verletzen oder wenn es gesetzlich erforderlich ist. Bei Beendigung endet Ihr API-Zugang, und wir können Ihre Daten gemäß unserer Datenschutzerklärung löschen.",
      ],
    },
    {
      title: "15. Anwendbares Recht und Streitigkeiten",
      paragraphs: [
        `Diese Bedingungen unterliegen dem Recht von ${LEGAL_GOVERNING_LAW}. Streitigkeiten unterliegen der ausschließlichen Zuständigkeit der zuständigen Gerichte in ${LEGAL_JURISDICTION_CITY}, ${LEGAL_GOVERNING_LAW}, unbeschadet zwingender Verbraucherrechte, die es Ihnen erlauben können, in Ihrem Wohnsitzland Klage zu erheben.`,
      ],
    },
    {
      title: "16. Änderungen dieser Bedingungen",
      paragraphs: [
        "Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Wesentliche Änderungen werden auf dieser Seite mit aktualisiertem Datum veröffentlicht. Fortgesetzte Nutzung nach Änderungen gilt als Annahme. Bei wesentlichen Änderungen können wir Sie auch per E-Mail benachrichtigen.",
      ],
    },
    {
      title: "17. Kontakt",
      paragraphs: [
        `Fragen zu diesen Bedingungen: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
