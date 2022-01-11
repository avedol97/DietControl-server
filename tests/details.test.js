const request = require('supertest')
const app = require('../app')

// test('Should add details for user', async() =>{
//     await request(app).post('/details')
//         .send({
//             id: "61cc40edab94052da2a6607a",
//             gender: "Men",
//             date: {
//                 "day": "11",
//                 "month": "09",
//                 "year": "1997"
//             },
//             height: "190",
//             weight: "90",
//             activity: "1.4",
//             type: 0,
//             somatotyp: "test"
//         })
//         .expect(201)
// })

test('Should get details user', async() =>{
    await request(app).get('/details?id=61cc40edab94052da2a6607a')
        .expect(201)
})


test('Should update details', async() =>{
    await request(app).put('/details/update')
        .send({
            id: "61cc40edab94052da2a6607a",
            weight: 90,
            activity: 1.4,
            type: 1
        })
        .expect(200)
})

test('Should update avatar', async() =>{
    await request(app).put('/details/avatar')
        .send({
            id: "61cc40edab94052da2a6607a",
            avatar: "www.pwsz.pl"
        })
        .expect(200)
})
