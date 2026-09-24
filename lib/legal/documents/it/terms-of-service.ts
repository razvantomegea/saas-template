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
  title: "Termini di servizio",
  lastUpdated: "9 June 2026",
  intro: [
    `I presenti Termini di servizio ("Termini") regolano l'utilizzo del servizio cloud ${LEGAL_PRODUCT_NAME} gestito da ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}) su example.com ("Servizio"). Creando un account o utilizzando il Servizio, accetti i presenti Termini.`,
    "Se non accetti, non utilizzare il Servizio.",
  ],
  sections: [
    {
      title: "1. Descrizione del servizio",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME} è un relay cloud e una dashboard per il copy trading MetaTrader 5. Un Expert Advisor (EA) master pubblica le posizioni aperte sulla nostra API; gli EA slave interrogano l'API e replicano le operazioni sui conti follower.`,
        "Gli EA SaaS Template Master Publisher e Slave Subscriber sono distribuiti gratuitamente sul MQL5 Market. Un abbonamento a pagamento su example.com sblocca la sincronizzazione cloud e l'accesso alla dashboard.",
      ],
    },
    {
      title: "2. Parte contraente",
      paragraphs: [
        `Il Servizio è fornito da ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}. ${LEGAL_PRODUCT_NAME} è il nostro nome commerciale. Contatto: ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "3. Idoneità",
      paragraphs: [
        "Devi avere almeno 18 anni ed essere legalmente in grado di stipulare contratti vincolanti per utilizzare il Servizio. Registrandoti, dichiari di soddisfare tali requisiti.",
      ],
    },
    {
      title: "4. Registrazione dell'account",
      paragraphs: [
        "Puoi registrarti con e-mail e password o, ove disponibile, con accesso Google. Sei responsabile del mantenimento della riservatezza delle tue credenziali di accesso.",
        "Il tuo SaaS Template User ID viene utilizzato dagli EA per autenticare le richieste API. Trattalo come credenziale segreta. Sei responsabile della configurazione corretta degli EA e di tutte le attività svolte con il tuo account.",
      ],
    },
    {
      title: "5. Abbonamento e fatturazione",
      paragraphs: [
        "I piani a pagamento (Starter, TV Sync, Pro, Ultimate) sono fatturati in EUR su base mensile o annuale tramite Stripe. I prezzi sono indicati sulla nostra pagina dei prezzi e possono essere modificati con un preavviso ragionevole.",
        `I nuovi abbonati ricevono una prova gratuita di ${LEGAL_TRIAL_DAYS} giorni sul primo abbonamento a pagamento. Dopo ogni prova, il metodo di pagamento viene addebitato automaticamente a meno che non annulli prima della scadenza della prova.`,
        "Gli abbonamenti si rinnovano automaticamente alla fine di ogni periodo di fatturazione. Puoi annullare o modificare il piano dalla pagina Billing, che reindirizza al Stripe Customer Portal.",
        "Il mancato pagamento può comportare la sospensione dell'accesso all'API di sincronizzazione. Non conserviamo i dati completi della tua carta di pagamento — Stripe elabora tutti i pagamenti.",
      ],
    },
    {
      title: "6. Politica di rimborso",
      paragraphs: [
        `Offriamo rimborsi discrezionali per richieste ricevute entro ${LEGAL_REFUND_WINDOW_HOURS} ore dal primo addebito (dopo la fine di eventuali prove gratuite). Per richiedere un rimborso, scrivi a ${LEGAL_CONTACT_EMAIL} dall'e-mail dell'account registrato con la richiesta e la data dell'addebito.`,
        "I rimborsi approvati vengono elaborati tramite Stripe sul metodo di pagamento originale. Le richieste di rimborso ricevute dopo la finestra di 24 ore generalmente non sono accettate ai sensi di questa politica commerciale.",
        "La presente politica di rimborso non pregiudica eventuali diritti legali obbligatori di cui disponi come consumatore ai sensi della legge applicabile.",
      ],
    },
    {
      title: "7. Diritto di recesso (consumatori UE e Romania)",
      paragraphs: [
        "Se sei un consumatore nell'Unione europea o in Romania, in genere hai un diritto di recesso di 14 giorni dai contratti a distanza senza dover indicare motivazioni, ai sensi della direttiva 2011/83/UE e dell'Ordinanza di emergenza del governo rumeno n. 34/2014 (OUG 34/2014).",
        "Per i servizi digitali la cui prestazione inizia immediatamente, puoi perdere il diritto di recesso se acconsenti espressamente all'accesso immediato e riconosci che perderai il diritto di recesso una volta avviato il servizio. Tale consenso può essere raccolto durante il checkout o l'attivazione dell'account.",
        `Per esercitare il tuo diritto di recesso legale, invia una dichiarazione chiara a ${LEGAL_CONTACT_EMAIL} prima della scadenza del periodo di recesso. In caso di recesso valido, rimborseremo i pagamenti ricevuti senza indebito ritardo e in ogni caso entro 14 giorni.`,
        "Per reclami sui diritti dei consumatori, puoi contattare l'Autorità nazionale rumena per la protezione dei consumatori (ANPC) su anpc.ro.",
      ],
    },
    {
      title: "8. Uso accettabile",
      paragraphs: ["Accetti di non:"],
      bullets: [
        "Condividere il tuo User ID o le credenziali dell'account con parti non autorizzate.",
        "Abusare, sovraccaricare o tentare di interrompere l'API o l'infrastruttura.",
        "Eseguire reverse engineering, scraping o rivendita del Servizio senza il nostro consenso scritto.",
        "Utilizzare il Servizio per attività illecite o in violazione dei termini del tuo broker.",
        "Aggirare i limiti di abbonamento (ad es. limiti di conti slave per il tuo piano).",
      ],
    },
    {
      title: "9. Proprietà intellettuale",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}, il nostro sito web, la dashboard, l'API e gli EA proprietari sono di proprietà di ${LEGAL_COMPANY_NAME} o dei suoi licenzianti. La distribuzione sul MQL5 Market degli EA gratuiti è soggetta ai termini di MetaQuotes e del MQL5 Market.`,
        "Ricevi una licenza limitata, non esclusiva e non trasferibile per utilizzare il Servizio per le tue operazioni di trading personali o aziendali interne finché il tuo abbonamento è attivo.",
      ],
    },
    {
      title: "10. Servizi di terze parti",
      paragraphs: [
        "Il Servizio si integra con MetaTrader 5, il tuo broker, MQL5 Market, Stripe e altre terze parti. Non siamo responsabili per interruzioni, modifiche delle policy o guasti delle piattaforme di terze parti. L'utilizzo di broker e piattaforme di trading è regolato dai loro termini.",
      ],
    },
    {
      title: "11. Disclaimer sul rischio di trading",
      paragraphs: [
        "Il trading di strumenti finanziari comporta un rischio sostanziale di perdita. Le performance passate delle operazioni copiate non garantiscono risultati futuri. SaaS Template è infrastruttura software — non fornisce consulenza finanziaria, raccomandazioni di investimento o profitti garantiti.",
        "Sei l'unico responsabile delle tue decisioni di trading, della configurazione degli EA, del dimensionamento delle posizioni e della conformità alle normative applicabili. Utilizzi il Servizio a tuo rischio.",
      ],
    },
    {
      title: "12. Disponibilità del servizio",
      paragraphs: [
        "Ci impegniamo a mantenere il Servizio disponibile ma non garantiamo un funzionamento ininterrotto o privo di errori. Manutenzione, problemi infrastrutturali o guasti di terze parti possono causare downtime. Nessun accordo sul livello di servizio si applica salvo diverso accordo scritto.",
      ],
    },
    {
      title: "13. Limitazione di responsabilità",
      paragraphs: [
        `Nella misura massima consentita dalla legge applicabile, ${LEGAL_COMPANY_NAME} non sarà responsabile per danni indiretti, incidentali, speciali, consequenziali o punitivi, incluse perdite di trading, mancati profitti o perdita di dati derivanti dall'utilizzo del Servizio.`,
        `La nostra responsabilità totale aggregata per qualsiasi reclamo derivante dai presenti Termini o dal Servizio è limitata alle commissioni che ci hai pagato nei dodici (12) mesi precedenti al reclamo. Nulla nei presenti Termini limita la responsabilità che non può essere limitata ai sensi della legge obbligatoria a tutela dei consumatori.`,
      ],
    },
    {
      title: "14. Risoluzione",
      paragraphs: [
        "Puoi annullare il tuo abbonamento in qualsiasi momento dalla pagina Billing. Possiamo sospendere o terminare il tuo account se violi i presenti Termini o se richiesto dalla legge. Alla risoluzione, l'accesso API termina e possiamo eliminare i tuoi dati in conformità alla nostra Informativa sulla privacy.",
      ],
    },
    {
      title: "15. Legge applicabile e controversie",
      paragraphs: [
        `I presenti Termini sono regolati dalle leggi di ${LEGAL_GOVERNING_LAW}. Qualsiasi controversia sarà soggetta alla giurisdizione esclusiva dei tribunali competenti di ${LEGAL_JURISDICTION_CITY}, ${LEGAL_GOVERNING_LAW}, fatti salvi i diritti obbligatori dei consumatori che possono consentirti di promuovere procedimenti nel tuo paese di residenza.`,
      ],
    },
    {
      title: "16. Modifiche ai presenti Termini",
      paragraphs: [
        "Possiamo aggiornare i presenti Termini di tanto in tanto. Le modifiche sostanziali saranno pubblicate su questa pagina con una data aggiornata. L'uso continuato dopo le modifiche costituisce accettazione. Per modifiche significative, possiamo anche informarti via e-mail.",
      ],
    },
    {
      title: "17. Contatti",
      paragraphs: [
        `Domande sui presenti Termini: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
