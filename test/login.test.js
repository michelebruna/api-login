const { describe } = require("mocha");
const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')
const { obterToken } = require('../helpers/autenticacao.js')



describe('Login', () => {
    describe('POST /login', () => {
        beforeEach(async () => {
            await obterToken()
        })
        it('Deve retornar sucesso com 200 quando usar credenciais válidas', async () => {
            const bodyLogin = {...postLogin}
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(200);
        })


        it('Deve retornar 401 quando usar credenciais inválidas', async () => {
            const bodyLogin = {
                'username': 'grupo4',
                'password': '123456'
            }
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(401);
        })

        it('Deve bloquear o usuário após 3 tentativas com senha incorreta', async () => {
            const bodyLogin = {
                'username': postLogin.username,
                'password': 'senhaInvalida'
            }

            let response
            for (let i = 0; i < 3; i++) {
                response = await request(process.env.BASE_URL)
                    .post('/login')
                    .set('Content-Type', 'application/json')
                    .send(bodyLogin)
            }

            expect(response.status).to.equal(423)
        })

    })
})