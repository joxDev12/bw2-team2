import { useState } from 'react';
// import { useAuth} from '../context/useAuth'
import { useNavigate, Link} from 'react-router-dom'

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
            {/* <div className='auth-card'>
               
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email'value={email} onChange={e => setEmail(e.target.value)} required/>
                    <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required/>
                    {errore && <p className='errore'>{errore}</p>}
                    <button type='submit'>Accedi</button>
                </form>
                <p className='auth-link'>Non hai un account? <Link to='/register'>Registrati</Link></p>
            </div> */}
        </div>
        </>
    )
}


export default LoginPage;