import Hero from './components/Hero';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Hero />
      </div>
      
    </>
  )
}

export default App;