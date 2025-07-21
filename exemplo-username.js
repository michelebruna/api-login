// Método 1: Usando require (para arquivos JSON)
const postLoginData = require('./fixtures/postLogin.json');
const username1 = postLoginData.username;
console.log('Username:', username1); // Output: Username: grupo4

// Método 2: Usando fs.readFileSync (para ler dinamicamente)
const fs = require('fs');
const path = require('path');

const jsonData = fs.readFileSync(path.join(__dirname, 'fixtures', 'postLogin.json'), 'utf8');
const parsedData = JSON.parse(jsonData);
const usernameFromFile = parsedData.username;
console.log('Username from file:', usernameFromFile); // Output: Username from file: grupo4

// Método 3: Desestruturação direta
const { username: user } = require('./fixtures/postLogin.json');
console.log('Username (desestruturação):', user); // Output: Username (desestruturação): grupo4

// Método 4: Para uso em testes (se você estiver usando Jest ou similar)
const loginFixture = require('./fixtures/postLogin.json');
const { username: usernameForTests } = loginFixture;
console.log('Username para testes:', usernameForTests); // Output: Username para testes: grupo4 