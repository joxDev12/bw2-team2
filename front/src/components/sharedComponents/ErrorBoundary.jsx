import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary ha catturato un errore:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center py-5 text-light">
                    <div className="alert alert-danger p-4 shadow-lg rounded-4 w-100" style={{ maxWidth: "600px" }}>
                        <i className="bi bi-exclamation-triangle-fill display-4 text-danger mb-3 d-block"></i>
                        <h2 className="h4 fw-bold mb-3">Si è verificato un errore inaspettato</h2>
                        <p className="text-secondary small mb-3">
                            {this.state.error?.message || "Errore sconosciuto"}
                        </p>
                        <button
                            className="btn btn-primary px-4 py-2"
                            onClick={() => window.location.reload()}
                        >
                            <i className="bi bi-arrow-clockwise me-2"></i> Ricarica la pagina
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
