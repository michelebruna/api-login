# API de Gestão de Login

Esta é uma API REST para estudo de testes de software, construída em JavaScript com Express. Não utiliza banco de dados: todas as informações são armazenadas em memória.

## Requisitos
- Node.js (versão 14 ou superior)
- npm

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd api-login
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Como rodar o projeto

1. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor será iniciado em `http://localhost:3000`.

2. Acesse a documentação Swagger:
   ```
   http://localhost:3000/api-docs
   ```

## Endpoints Disponíveis

### POST /login
Realiza o login do usuário.
- **Body:**
  ```json
  {
    "username": "grupo4",
    "password": "senha@1234"
  }
  ```
- **Respostas:**
  - 200: Login realizado com sucesso
  - 401: Usuário ou senha inválidos
  - 423: Usuário bloqueado após 3 tentativas

### POST /forgot-password
Solicita a redefinição de senha. Gera um token de redefinição.
- **Body:**
  ```json
  {
    "username": "grupo4"
  }
  ```
- **Respostas:**
  - 200: Token de redefinição gerado
  - 404: Usuário não encontrado

### POST /reset-password
Redefine a senha do usuário utilizando o token gerado.
- **Body:**
  ```json
  {
    "username": "grupo4",
    "token": "<token-recebido>",
    "newPassword": "novaSenha"
  }
  ```
- **Respostas:**
  - 200: Senha redefinida com sucesso
  - 400: Token inválido
  - 404: Usuário não encontrado

## Usuário de Teste Padrão

O projeto inclui um usuário padrão para facilitar os testes:
```json
{
  "username": "grupo4",
  "password": "senha@1234"
}
```

## Testes Automatizados

Os testes estão localizados na pasta `test/` e cobrem os principais fluxos da API:
- Login (`login.test.js`)
- Esqueci minha senha (`esqueciMinhaSenha.test.js`)
- Resetar senha (`resetarSenha.test.js`)

Para rodar os testes:
```bash
npm test
```

## Exemplo de Fluxo Completo

1. **Login:**
   - Envie um POST para `/login` com o usuário padrão.
2. **Bloqueio:**
   - Após 3 tentativas de senha incorreta, o usuário será bloqueado.
3. **Esqueci minha senha:**
   - Envie um POST para `/forgot-password` para gerar um token.
4. **Resetar senha:**
   - Envie um POST para `/reset-password` com o token e a nova senha.
5. **Login novamente:**
   - Faça login com a nova senha.

## Observações
- API apenas para fins de estudo.
- Os dados são voláteis e não persistem após reiniciar o servidor.
- O token de redefinição é gerado de forma simples e não deve ser usado em produção.
- A documentação completa dos endpoints está disponível via Swagger em `/api-docs`. 