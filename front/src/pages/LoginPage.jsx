import { useState } from 'react';
// import { useAuth} from '../context/useAuth'
import { useNavigate, Link } from 'react-router-dom'

import LoginForm from '../components/LoginForm';

function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errore, setErrore] = useState(null);
    const navigate = useNavigate();
    // const { login } = useAuth(); // customHook 

    async function handleSubmit(e){
        e.preventDefault();
        setErrore('')
        try{
        //    await login(email, password) 
           //togliere commento quando si implementa il contesto


        //    cancellare la condizione if quando si implementa il contesto
            if (!email || !password) {
        throw new Error("Inserisci email e password");
      }

            navigate('/')
        } catch(err){
            setErrore(err.message)
        }
    }
    
    return(
        
        <>
        <div className='auth-container'>
             <h1>LOGIN</h1>

                <LoginForm />
        </div>
        </>
    )
}


export default LoginPage;