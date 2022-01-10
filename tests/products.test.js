const request = require('supertest')
const app = require('../app')

// test('Should add product', async() =>{
//     await request(app).post('/product')
//         .send({
//             idUser: "61cc40edab94052da2a6607a",
//             name: "Ziemniaki",
//             category: "Warzywa",
//             protein: 2,
//             fat: 5,
//             carbohydrates: 6,
//             calories: 20,
//             packaging: "g"
//         })
//         .expect(201)
// })

test('Should get all products', async() =>{
    await request(app).get('/products/all')
        .expect(201)
})
