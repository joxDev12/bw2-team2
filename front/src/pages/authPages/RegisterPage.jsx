import RegisterForm from "../../components/authComponents/RegisterForm";
import useSEO from "../../hooks/useSEO";

function RegisterPage() {
  useSEO({
    title: "Registrati",
    description: "Crea un nuovo account su EventHub per iniziare a organizzare e partecipare agli eventi."
  });

  return (
    <div className="auth-container">
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;