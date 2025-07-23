const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');
const { obterToken } = require('../helpers/autenticacao.js');

describe('Desbloqueio de usuário', () => {
  it('Deve permitir o login após o reset da senha quando o usuário for bloqueado', async () => {
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

    const respostaLogin = await request(process.env.BASE_URL)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send(postLogin);
    expect(respostaLogin.status).to.equal(200);
  });
});
