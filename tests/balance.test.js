const request = require('supertest')
const app = require('../app')

test('Should add balances user in day', async() =>{
    await request(app).post('/balance')
        .send({
            idUser: "61cc40edab94052da2a6607a",
            idProduct:"61aa1e5af79d86e6bf038624,61aa1e5af79d86e6bf038624",
            date: {
                "day": "09",
                "month": "12",
                "year": "2022"
            },
            protein: 23,
            fat: 22,
            carbohydrates: 111,
            kcalToday: 1110,
            weight: 90
        })
        .expect(201)
})

test('Should get balances user', async() =>{
    await request(app).get('/balance?id=61cc40edab94052da2a6607a')
        .expect(201)
})
