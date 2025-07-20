const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao.js')


describe('Esqueci minha senha ', () => {
    let token

        beforeEach(async () =>{
            
            token = await obterToken(postLogin)

        })
    })


describe('POST /forgot-password', () => {
    it('Deve retornar sucesso com 201 quando o usuário informado for válido', async () => {
        const bodyEsqueciMinhaSenha = {...postLogin.username}

        const response = await request(process.env.BASE_URL)
            .post('/forgot-password')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .send(bodyEsqueciMinhaSenha)

            expect(response.status).to.equal(201)
    })

    /*it('Deve retornar 404 quando não identificar o usuário informado', async () => {
        const bodyTransferencias = { ...postTransferencias}

        const response = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyTransferencias)

            expect(response.status).to.equal(404) */
})