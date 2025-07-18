const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao.js')
const postTransferencias = require('../fixtures/postTransferencias.json')


describe('Esqueci minha senha ', () => {
    let token

        beforeEach(async () =>{
            
            // Capturar o token
            token = await obterToken(postLogin)

        })
    })
    

describe('POST /forgout-password', () => {
    it('Deve retornar sucesso com 201 quando o usuário enviado for válido', async () => {
        const bodyTransferencias = { ...postTransferencias} //shallow copy funciona apenas quando os dados estão em primeiro nível. Se houver uma lista, por exemplo, não funcionará

        const response = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`) //modelo mais elegante de concatenação
            .send(bodyTransferencias)

            expect(response.status).to.equal(201)

            console.log(response.body)
    })
})