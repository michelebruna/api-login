const { describe } = require("mocha");
const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')



describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar status 200 quando usar credenciais válidas', async () => {
            const bodyLogin = {...postLogin}
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(200);
        })


        it('Deve retornar status 401 quando usar credenciais inválidas', async () => {
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

    })
})