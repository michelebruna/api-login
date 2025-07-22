const { describe } = require("mocha");
const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')
const { obterToken } = require('../helpers/autenticacao.js')
const fs = require('fs')

describe('Resetar Senha', () => {
    let token

        beforeEach(async () =>{
            
            token = await obterToken()

        })

    describe('POST /reset-password', () => {
        it('Deve retornar sucesso com 200 quando a senha for redefinida com sucesso', async () => {
            const novaSenha = 'senha@1234'
            const bodyResetarSenha = 
            {
                'username' : postLogin.username,
                'token' : token,
                'newPassword' : novaSenha   
            } 

            const response = await request(process.env.BASE_URL)
                .post('/reset-password')
                .set('Content-Type', 'application/json')
                .send(bodyResetarSenha)

                expect(response.status).to.equal(200)

                postLogin.password = novaSenha

                fs.writeFileSync(
                    './fixtures/postLogin.json',
                    JSON.stringify(postLogin, null, 2)
                  )
        })


        it('Deve retornar 400 quando o token enviado for inválido', async () => {
            const bodyResetarSenha = 
            {
                'username' : postLogin.username,
                'token' : '1',
                'newPassword' : '1234'   
            } 

            const response = await request(process.env.BASE_URL)
                .post('/reset-password')
                .set('Content-Type', 'application/json')
                .send(bodyResetarSenha)

                expect(response.status).to.equal(400)

        })
        

        it('Deve retornar 404 quando o usuário informado for inválido', async () => {
            const bodyResetarSenha = 
            {
                'username' : 'usuario',
                'token' : token,
                'newPassword' : '12345'   
            } 

            const response = await request(process.env.BASE_URL)
                .post('/reset-password')
                .set('Content-Type', 'application/json')
                .send(bodyResetarSenha)

                expect(response.status).to.equal(404)

        })
    })
})