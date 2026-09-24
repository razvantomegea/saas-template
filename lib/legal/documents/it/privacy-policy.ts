import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_PRODUCT_NAME,
  LEGAL_REGISTERED_ADDRESS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const privacyPolicyContent: LegalDocumentContent = {
  title: "Informativa sulla privacy",
  lastUpdated: "30 August 2026",
  intro: [
    `La presente Informativa sulla privacy spiega come ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}), che gestisce il servizio ${LEGAL_PRODUCT_NAME} su example.com ("noi", "ci", "nostro"), raccoglie, utilizza, conserva e protegge i tuoi dati personali quando utilizzi il nostro sito web, la dashboard e l'API di sincronizzazione cloud.`,
    "Trattiamo i dati personali in conformità al Regolamento generale sulla protezione dei dati dell'UE (GDPR) e alla normativa rumena applicabile in materia di protezione dei dati.",
  ],
  sections: [
    {
      title: "1. Titolare del trattamento",
      paragraphs: [
        `Il titolare del trattamento responsabile dei tuoi dati personali è ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, con sede legale: ${LEGAL_REGISTERED_ADDRESS}.`,
        `${LEGAL_PRODUCT_NAME} è il nome commerciale del nostro servizio cloud di copy trading MT5. Per richieste sulla privacy o per esercitare i tuoi diritti, contattaci a ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "2. Quali dati raccogliamo",
      paragraphs: [
        "Raccogliamo solo i dati necessari per fornire il servizio SaaS Template:",
      ],
      bullets: [
        "Dati dell'account: nome, indirizzo e-mail, hash della password (se ti registri con e-mail) e immagine del profilo (se accedi con Google).",
        "Dati di sessione: cookie di autenticazione, token di sessione e, facoltativamente, il tuo indirizzo IP e lo user-agent del browser quando utilizzi la dashboard web.",
        "Dati di abbonamento: piano, stato dell'abbonamento e identificativo cliente Stripe. I dati della carta di pagamento sono raccolti e conservati da Stripe, non da noi.",
        "Dati di sincronizzazione trading: nome del broker, saldo del conto, equity, posizioni aperte e cronologia delle operazioni chiuse inviati dai tuoi Expert Advisor MetaTrader 5. Per Mirror Ownership (prevenzione del trading duplicato quando più terminali sono collegati allo stesso conto), l'EA può inviare il numero del tuo conto MT5 per generare una chiave di lease unidirezionale; conserviamo solo tale hash, non il numero del conto né la password di trading.",
        "Credenziale API EA: il tuo SaaS Template User ID, trasmesso nell'header x-user-id dagli EA. Trattalo come un segreto — chiunque abbia il tuo User ID e un abbonamento attivo potrebbe accedere alla tua API di sincronizzazione.",
        "Dati di onboarding: se hai completato la procedura guidata di configurazione.",
        "Dati di supporto: se invii il modulo Help privato, conserviamo la tua e-mail, la categoria del messaggio, l'oggetto e il corpo del messaggio, e possiamo collegare il ticket al tuo account quando sei connesso. Contatori temporanei di rate limiting basati su IP possono essere mantenuti in memoria dell'applicazione per prevenire abusi.",
        "Messaggi del bot Help: se utilizzi la chat Help facoltativa, i tuoi prompt e le risposte del modello vengono inviati al fornitore di IA descritto nella sezione 5 per rispondere in base al nostro FAQ pubblico. Non incollare password o segreti completi nella chat.",
      ],
    },
    {
      title: "3. Come utilizziamo i tuoi dati e basi giuridiche",
      paragraphs: [
        "Trattiamo i tuoi dati personali per le finalità seguenti e sulle basi giuridiche di cui all'articolo 6 del GDPR:",
      ],
      bullets: [
        "Fornitura del tuo account, della dashboard e del servizio di sincronizzazione cloud — esecuzione del contratto con te (art. 6(1)(b)).",
        "Elaborazione degli abbonamenti e della fatturazione tramite Stripe — esecuzione del contratto e obbligo legale per i registri finanziari (art. 6(1)(b) e (c)).",
        "Sicurezza del servizio, prevenzione degli abusi e protezione dell'accesso API — interesse legittimo (art. 6(1)(f)).",
        "Invio di e-mail transazionali di autenticazione (come link di reimpostazione password) — esecuzione del contratto e interesse legittimo alla sicurezza dell'account (art. 6(1)(b) e (f)).",
        "Accesso Google OAuth (se lo scegli) — il tuo consenso al momento dell'accesso (art. 6(1)(a)).",
        "Risposta alle richieste di supporto (e-mail, modulo Help privato o bot Help) e richieste legali — interesse legittimo o obbligo legale, a seconda dei casi.",
      ],
    },
    {
      title: "4. Cookie",
      paragraphs: [
        "Utilizziamo cookie di sessione strettamente necessari per mantenerti connesso alla dashboard SaaS Template. Questi cookie sono essenziali per il servizio e non richiedono consenso ai sensi della direttiva ePrivacy.",
        "Alla prima visita mostriamo un banner delle preferenze sui cookie. Analytics (Cloudflare Web Analytics ed eventi funnel anonimi) viene caricato solo se scegli Accetta tutto o abiliti Analytics nelle Impostazioni cookie. Si tratta di un servizio di analytics aggregato senza cookie che non identifica singoli utenti e non utilizza cookie pubblicitari o di tracciamento di terze parti.",
        "Puoi modificare la tua scelta in qualsiasi momento tramite Impostazioni cookie nel footer del sito.",
        "Non utilizziamo cookie pubblicitari o di tracciamento di terze parti. Se in futuro introdurremo altri cookie non essenziali, aggiorneremo la presente informativa e richiederemo il consenso ove necessario.",
      ],
    },
    {
      title: "5. Responsabili del trattamento terzi",
      paragraphs: [
        "Condividiamo dati personali con responsabili del trattamento fidati che ci aiutano a gestire il servizio. Ogni responsabile tratta i dati solo secondo le nostre istruzioni e in base a accordi di protezione dei dati appropriati:",
      ],
      bullets: [
        "Stripe — elaborazione dei pagamenti e fatturazione degli abbonamenti (stripe.com/privacy). Stripe agisce come titolare autonomo per i dati di pagamento che raccoglie direttamente.",
        "Supabase — hosting del database PostgreSQL gestito per account, sincronizzazione trading e ticket di supporto privati.",
        "Railway — hosting dell'applicazione e infrastruttura.",
        "Google — autenticazione OAuth, solo se scegli di accedere con Google (policies.google.com/privacy).",
        "Resend — e-mail transazionali per reimpostazione password e conferma eliminazione account, contenenti l'indirizzo e-mail del tuo account e un link a tempo limitato (resend.com/legal/privacy-policy).",
        "Google Gemini API (Google AI Studio / Gemini Developer API) — risposte facoltative del bot Help basate sul nostro FAQ pubblico. Quando il bot Help è abilitato, i messaggi della chat vengono inviati a Google per generare risposte. L'utilizzo dell'API Gemini di livello gratuito può essere usato da Google per migliorare i suoi prodotti secondo i termini di Google; non inviare segreti sensibili nella chat Help. Configurazioni a pagamento o di livello superiore possono prevedere condizioni diverse sui dati — aggiorneremo la presente informativa se cambierà il nostro livello di produzione.",
        "Cloudflare — Web Analytics senza cookie sulle pagine di marketing quando abilitato, e CDN/sicurezza per example.com (cloudflare.com/privacypolicy).",
        "GitHub — solo se pubblichi volontariamente un issue pubblico; i contenuti che pubblichi lì sono pubblici e soggetti ai termini di GitHub, non alla nostra coda di supporto privata.",
      ],
    },
    {
      title: "6. Trasferimenti internazionali di dati",
      paragraphs: [
        "Alcuni dei nostri responsabili del trattamento possono conservare o trattare dati al di fuori dello Spazio economico europeo (SEE), inclusi gli Stati Uniti. Quando tali trasferimenti avvengono, ci affidiamo a garanzie appropriate come le Clausole contrattuali standard dell'UE e la conformità del responsabile del trattamento ai quadri di protezione dei dati applicabili.",
      ],
    },
    {
      title: "7. Conservazione dei dati",
      paragraphs: [
        "Conserviamo i tuoi dati solo per il tempo necessario alle finalità descritte nella presente informativa:",
      ],
      bullets: [
        "Dati dell'account e del profilo: conservati finché il tuo account è attivo e per un periodo ragionevole dopo la richiesta di eliminazione o la chiusura dell'account, salvo un periodo più lungo richiesto dalla legge.",
        "Dati di sincronizzazione trading: le posizioni attive vengono sostituite a ogni sincronizzazione master; la cronologia delle operazioni chiuse è conservata finché il tuo account è attivo per alimentare le metriche della dashboard.",
        "Dati di lease Mirror Ownership: l'hash unidirezionale del login broker (brokerLoginHmac) conservato sui conti di trading e le righe mirror_leases correlate sono conservati finché il tuo account è attivo e vengono rimossi quando il tuo account utente viene eliminato (cascade del database).",
        "Dati di sessione: conservati fino alla scadenza della sessione o al logout.",
        "Registri di fatturazione: conservati come richiesto dalla normativa fiscale e contabile applicabile, in linea con le pratiche di conservazione di Stripe.",
        "Ticket di supporto privati: conservati finché utili per risolvere la tua richiesta e per un periodo ragionevole successivo per prevenzione degli abusi e qualità del servizio, poi eliminati o anonimizzati, salvo un periodo più lungo richiesto dalla legge. Le richieste di cancellazione dell'account possono includere ticket di supporto aperti collegati al tuo user id.",
        "Chat del bot Help: non conservate come cronologia permanente dei ticket nel nostro database; i messaggi vengono elaborati per generare una risposta e possono essere gestiti dal processore IA secondo le regole di conservazione del livello API in uso.",
      ],
    },
    {
      title: "8. I tuoi diritti ai sensi del GDPR",
      paragraphs: [
        "Se ti trovi nello SEE o nel Regno Unito, hai i seguenti diritti riguardo ai tuoi dati personali:",
      ],
      bullets: [
        "Diritto di accesso — richiedere una copia dei dati personali che conserviamo su di te.",
        "Diritto di rettifica — richiedere la correzione di dati inesatti.",
        "Diritto alla cancellazione — richiedere l'eliminazione dei tuoi dati, fatte salve le obbligazioni legali di conservazione.",
        "Diritto di limitazione — richiedere che limitiamo l'utilizzo dei tuoi dati in determinate circostanze.",
        "Diritto alla portabilità dei dati — ricevere i tuoi dati in un formato strutturato e leggibile da macchina, ove tecnicamente fattibile.",
        "Diritto di opposizione — opporti al trattamento basato su interessi legittimi.",
        "Diritto di revocare il consenso — quando il trattamento si basa sul consenso, puoi revocarlo in qualsiasi momento senza pregiudicare il trattamento lecito precedente.",
        "Diritto di proporre reclamo — all'Autorità nazionale rumena per la supervisione del trattamento dei dati personali (ANSPDCP) su dataprotection.ro, o all'autorità di controllo locale.",
      ],
    },
    {
      title: "9. Come esercitare i tuoi diritti",
      paragraphs: [
        `Per esercitare uno qualsiasi dei diritti sopra indicati, scrivici a ${LEGAL_CONTACT_EMAIL} dall'indirizzo e-mail associato al tuo account. Risponderemo entro un mese, come richiesto dal GDPR. Potremmo dover verificare la tua identità prima di elaborare la richiesta.`,
        "Puoi eliminare definitivamente il tuo account da Dashboard → Impostazioni. L'eliminazione annulla tutti gli abbonamenti attivi e rimuove i dati dell'account associati. Puoi anche scriverci per richiedere la cancellazione.",
      ],
    },
    {
      title: "10. Sicurezza",
      paragraphs: [
        "Implementiamo misure tecniche e organizzative per proteggere i tuoi dati, inclusa la crittografia HTTPS, l'hashing delle password e controlli di accesso limitati al tuo account utente. Il tuo SaaS Template User ID funge da credenziale API — non condividerlo pubblicamente né incorporarlo in file condivisi. I ticket di supporto privati sono visibili solo agli operatori autorizzati.",
      ],
    },
    {
      title: "11. Minori",
      paragraphs: [
        "SaaS Template non è destinato a minori di 16 anni. Non raccogliamo consapevolmente dati personali di persone di età inferiore ai 16 anni. Se ritieni che un minore ci abbia fornito dati, contattaci e li elimineremo.",
      ],
    },
    {
      title: "12. Disclaimer sui dati di trading",
      paragraphs: [
        "I dati di trading visualizzati nella dashboard o trasmessi tramite la nostra API di sincronizzazione sono informazioni operative sui tuoi account MetaTrader. Non costituiscono consulenza finanziaria, ricerca sugli investimenti o raccomandazione di trading. Il trading comporta un rischio sostanziale di perdita. Il bot Help facoltativo non è consulenza finanziaria e può essere impreciso; usa il modulo di supporto privato o l'e-mail per questioni specifiche dell'account.",
      ],
    },
    {
      title: "13. Modifiche alla presente informativa",
      paragraphs: [
        "Possiamo aggiornare la presente Informativa sulla privacy di tanto in tanto. Le modifiche sostanziali saranno pubblicate su questa pagina con una data aggiornata. L'uso continuato del servizio dopo le modifiche costituisce accettazione dell'informativa aggiornata.",
      ],
    },
    {
      title: "14. Contatti",
      paragraphs: [
        `Per domande sulla privacy o richieste degli interessati: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
