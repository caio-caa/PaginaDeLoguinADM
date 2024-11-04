import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Registro.css";

const Registro = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [numeroTelefone, setNumeroTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState(""); // Para exibir mensagens de feedback

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nomeCompleto, numeroTelefone, email, senha })
    });
    

      if (response.ok) {
        const data = await response.json();
        setMessage("Cadastro bem-sucedido!");
        console.log("Usuário registrado com ID:", data.id);
      } else {
        setMessage("Erro ao registrar o usuário");
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
        <h1>Crie sua conta</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="Nome Completo"
            required
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="tel"
            placeholder="Número de Telefone"
            required
            value={numeroTelefone}
            onChange={(e) => setNumeroTelefone(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="signup-link">
        <p>
          Já tem uma conta? <Link to="/">Faça login</Link> 
        </p>
      </div>
    </div>
  );
};

export default Registro;
