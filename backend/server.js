// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); 

const app = express();
const PORT = 5000;


app.use(cors());


app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'caio123', 
    database: 'form_investorreport', 
});


db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});


app.post('/api/users/register', async (req, res) => {
    const { nomeCompleto, numeroTelefone, email, senha } = req.body;

    try {
        
        const hashedPassword = await bcrypt.hash(senha, 10); 

        const sql = 'INSERT INTO usuarios (nome_completo, numero_telefone, email, senha) VALUES (?, ?, ?, ?)';
        db.query(sql, [nomeCompleto, numeroTelefone, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Erro ao registrar o usuário:', err);
                return res.status(500).json({ error: 'Erro ao registrar o usuário' });
            }
            res.status(201).json({ id: result.insertId });
        });
    } catch (error) {
        console.error('Erro ao hashear a senha:', error);
        return res.status(500).json({ error: 'Erro ao registrar o usuário' });
    }
});


app.post('/api/users/login', async (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ error: 'Erro ao buscar usuário' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas' }); 
        }

        const user = results[0];


        const match = await bcrypt.compare(senha, user.senha);
        if (!match) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }


        res.status(200).json({ message: 'Login bem-sucedido', userId: user.id });
    });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
