require('./connection')
const express = require('express');
const app = express();
const Routes = require('./src/routes/Routes')
const cookieParser = require('cookie-parser');
const {checkUser} = require('./src/routes/middleware/userMiddleware');

const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./ swagger.json');


app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(express.json());
app.use(cookieParser());
app.get('*', checkUser)
app.use(Routes);

module.exports = app;
