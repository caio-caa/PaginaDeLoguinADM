import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [message, setMessage] = useState(""); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Dados de Login:", { username, password });

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, senha: password }), 
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Login bem-sucedido!"); 
        console.log("ID do usuário:", data.userId); 
        window.location.href = "http://localhost:5173/Lista"; // Redireciona para a URL completa
      } else {
        setMessage("Erro ao fazer login"); 
        console.error("Erro na resposta do servidor");
      }
    } catch (error) {
      setMessage("Erro na conexão com o servidor"); 
      console.error("Erro:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu sua senha?</a>
        </div>
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>} 
        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/Registro">Cadastre-se</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
