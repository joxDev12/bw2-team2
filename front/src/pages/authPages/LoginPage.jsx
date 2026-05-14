import LoginForm from "../../components/authComponents/LoginForm";
import useSEO from "../../hooks/useSEO";

function LoginPage() {
  useSEO({
    title: "Accedi",
    description: "Accedi al tuo account EventHub per gestire e partecipare agli eventi."
  });

  return (
    <div className="auth-container">
      <LoginForm />
    </div>
  );
}

export default LoginPage;