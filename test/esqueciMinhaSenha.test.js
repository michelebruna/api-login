const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
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
    })

    it('Deve retornar sucesso com 404 quando o usuário informado for inválido', async () => {
        const bodyEsqueciMinhaSenha = {'username': 'usuario'}

        const response = await request(process.env.BASE_URL)
            .post('/forgot-password')
            .set('Content-Type', 'application/json')
            .send(bodyEsqueciMinhaSenha)

            expect(response.status).to.equal(404)
    })
})
})