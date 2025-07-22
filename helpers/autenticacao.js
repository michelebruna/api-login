const request = require('supertest')
const postLogin = require('../fixtures/postLogin.json')

const obterToken = async (username) => {
    const bodyLogin = {username: postLogin.username}
    const responseLogin = await request(process.env.BASE_URL)
                .post('/forgot-password')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

        return responseLogin.body.token

}

module.exports = {
    obterToken
}
