const request = require('supertest')
const app = require('../app')

test('Should login', async() =>{
    await request(app).post('/guest/login')
        .send({
            email: 'krystian@o2.pl',
            password: 'krystian123'
        })
        .expect(201)
})

// test('Should sign up for a user', async() =>{
//     await request(app).post('/guest/signup')
//         .send({
//             email: 'test@o2.pl',
//             password: 'test123'
//         })
//         .expect(201)
// })

test('Should log out system', async() =>{
    await request(app).get('/user/logout')
        .expect(204)
})

test('Should change the boolean value - isDetails', async() =>{
    await request(app).post('/user/update/details')
        .send({
            id: "61cc40edab94052da2a6607a"
        })
        .expect(201)
})

test('Should change the boolean value - isAdmin', async() =>{
    await request(app).put('/user/update/admin')
        .send({
            id: "61cc40edab94052da2a6607a"
        })
        .expect(201)
})

test('Should change the boolean value - isActive', async() =>{
    await request(app).put('/user/update/active')
        .send({
            id: "61cc40edab94052da2a6607a"
        })
        .expect(201)
})

// test('Should change password', async() =>{
//     await request(app).put('/user/password')
//         .send({
//             email: "krystian@o2.pl",
//             password: "krystian123",
//             newPassword: "krystian1234"
//         })
//         .expect(200)
// })
