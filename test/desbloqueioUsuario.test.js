const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');
const { obterToken } = require('../helpers/autenticacao.js');

describe('Desbloqueio de usuário', () => {
  describe('POST /login', () => {
    it('Deve bloquear o usuário após 3 tentativas de login ', async () => {
      const bodyLoginInvalido = {
        username: postLogin.username,
        password: 'senhaIncorreta'
      };

      let response;
      for (let i = 0; i < 3; i++) {
        response = await request(process.env.BASE_URL)
          .post('/login')
          .set('Content-Type', 'application/json')
          .send(bodyLoginInvalido);
      }
      expect(response.status).to.equal(423);
      expect(response.body.message).to.equal('Usuário bloqueado. Redefina a senha.')
    });
  });
  
  describe('POST /reset-password', () => {
    it('Deve desbloquear o usuário após obter o token de redefinição de senha', async () => {
      const token = await obterToken();
      const bodyResetar = {
        username: postLogin.username,
        token: token,
        newPassword: postLogin.password
      };
      const respostaReset = await request(process.env.BASE_URL)
        .post('/reset-password')
        .set('Content-Type', 'application/json')
        .send(bodyResetar);

      expect(respostaReset.status).to.equal(200);
      expect(respostaReset.body.message).to.equal('Senha redefinida com sucesso')
    });
  });

  describe('POST /login', () => {
    it('Deve retornar sucesso com 200 após desbloquear o usuário', async () => {
      const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(postLogin);
      expect(respostaLogin.status).to.equal(200);
      expect(respostaLogin.body.message).to.equal('Login realizado com sucesso')
    });
  });
});
