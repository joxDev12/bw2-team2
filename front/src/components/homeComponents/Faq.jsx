// Blocco FAQ con domande frequenti e risposte rapide.
// Viene usato dentro la sezione Assistenza della homepage.
const faqItems = [
  {
    id: "tickets",
    question: "Come posso acquistare i biglietti?",
    answer:
      "Per acquistare i biglietti, basta cliccare sul pulsante Acquista accanto all'evento desiderato e seguire le istruzioni.",
  },
  {
    id: "refund",
    question: "Posso ottenere un rimborso?",
    answer:
      "Le politiche di rimborso variano in base all'evento. Controlla i dettagli dell'evento o contatta il servizio clienti.",
  },
  {
    id: "publish",
    question: "Come posso pubblicare il mio evento?",
    answer:
      "Crea un account organizzatore, entra nella dashboard e compila le informazioni richieste per pubblicare l'evento.",
  },
  {
    id: "price",
    question: "L'evento e' gratuito o a pagamento?",
    answer:
      "La piattaforma ospita eventi gratuiti e a pagamento. Puoi usare i filtri per trovare quelli piu adatti a te.",
  },
];

function Faq() {
  return (
    <div className="accordion" id="homeFaq">
      {faqItems.map((item, index) => {
        const collapseId = `homeFaq-${item.id}`;
        const headingId = `homeFaq-heading-${item.id}`;

        return (
          <div className="accordion-item bg-primary" key={item.id}>
            <h3 className="accordion-header" id={headingId}>
              <button
                className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseId}`}
                aria-expanded={index === 0}
                aria-controls={collapseId}
              >
                {item.question}
              </button>
            </h3>

            <div
              id={collapseId}
              className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
              aria-labelledby={headingId}
              data-bs-parent="#homeFaq"
            >
              <div className="accordion-body rounded-3">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>

  );
}

export default Faq;
