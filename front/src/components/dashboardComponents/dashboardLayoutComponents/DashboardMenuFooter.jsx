// Contiene le azioni finali del menu dashboard: torna al sito e logout.
// Su mobile aggiunge data-bs-dismiss per chiudere il pannello laterale.
function DashboardMenuFooter({ handleTornaAlSito, handleLogout, mobile = false }) {
  const dismissProps = mobile ? { "data-bs-dismiss": "offcanvas" } : {};

  return (
    <div className={`${mobile ? "offcanvas-footer" : "sidebar-footer"} flex-shrink-0 px-3 py-3 bg-black bg-opacity-10 mt-auto`}>
      <hr className="my-2 opacity-25 d-lg-none" />
      <button
        type="button"
        onClick={handleTornaAlSito}
        className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white-50 link-light mb-1 border-0 w-100 text-start bg-transparent"
        {...dismissProps}
      >
        <i className="bi bi-arrow-left-circle fs-5"></i>
        <span>Torna al sito</span>
      </button>
      <button
        onClick={handleLogout}
        className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-danger border-0 w-100 text-start bg-transparent"
      >
        <i className="bi bi-box-arrow-left fs-5"></i>
        <span>Logout</span>
      </button>
    </div>
  );
}

export default DashboardMenuFooter;
