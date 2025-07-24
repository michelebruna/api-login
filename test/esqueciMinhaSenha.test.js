const request = require('supertest')
const { describe } = require("mocha");
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao.js')
const postLogin = require('../fixtures/postLogin.json')


describe('Esqueci minha senha ', () => {

describe('POST /forgot-password', () => {
    it('Deve retornar sucesso com 201 quando o usuário informado for válido', async () => {
        const bodyEsqueciMinhaSenha = {username: postLogin.username}

        const response = await request(process.env.BASE_URL)
            .post('/forgot-password')
            .set('Content-Type', 'application/json')
            .send(bodyEsqueciMinhaSenha)

            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Token de redefinição gerado')
    })

    it('Deve retornar 404 quando o usuário informado não for encontrado', async () => {
        const bodyEsqueciMinhaSenha = {'username': 'usuario'}

        const response = await request(process.env.BASE_URL)
            .post('/forgot-password')
            .set('Content-Type', 'application/json')
            .send(bodyEsqueciMinhaSenha)

            expect(response.status).to.equal(404)
            expect(response.body.message).to.equal('Usuário não encontrado')
        })
    })
})