# API de Gestão de Login

Esta é uma API REST para estudo de testes de software, construída em Javascript com Express. Não utiliza banco de dados, todas as informações são armazenadas em memória.

## Funcionalidades
- Login
- Bloqueio de senha após 3 tentativas
- Reset de senha via 'Esqueci Minha Senha'
- Documentação Swagger acessível via URL

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   node src/index.js
   ```

## Acesso à documentação Swagger

Após iniciar o servidor, acesse:
```
http://localhost:3000/api-docs
```

## Observações
- API apenas para fins de estudo.
- Dados não persistem após reiniciar o servidor. 