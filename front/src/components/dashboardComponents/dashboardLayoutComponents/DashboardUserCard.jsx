// Mostra avatar, nome, email e ruolo dell'utente nel menu dashboard.
// Viene riusato sia nella sidebar desktop che nel menu mobile.
function DashboardUserCard({ user, roleBadge, getInitials }) {
  return (
    <div className="text-center px-3 py-4">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="sidebar-avatar rounded-circle mb-3 border border-primary border-opacity-25 shadow-sm"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
      ) : (
        <div
          className="sidebar-avatar-placeholder rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary bg-gradient text-white shadow-sm"
          style={{ width: "80px", height: "80px" }}
        >
          <span className="fs-2 fw-bold text-white">
            {getInitials(user.name)}
          </span>
        </div>
      )}

      <h6 className="mb-1 fw-bold text-white">{user.name}</h6>
      <small className="text-white-50 d-block mb-3">{user.email}</small>
      <span className={`badge ${roleBadge.cls} rounded-pill px-3 shadow-sm`}>
        {roleBadge.label}
      </span>
    </div>
  );
}

export default DashboardUserCard;
