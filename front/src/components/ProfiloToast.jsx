function ProfiloToast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
      <div
        className={`toast show align-items-center text-bg-${toast.tipo} border-0 shadow`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{toast.messaggio}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Chiudi"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default ProfiloToast;
