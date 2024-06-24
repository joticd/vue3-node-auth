require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const corsOptions = require('./config/cors');
const connectDB = require('./config/db');
const credentials = require('./middleware/credentials');
const errorHandlerMiddleware = require('./middleware/error_handler');
const authenticationMiddleware = require('./middleware/authentication');

const app = express();

connectDB();

app.use(credentials);

//CORS
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(authenticationMiddleware);
app.use(errorHandlerMiddleware);

//Routes
app.use('/api/auth', require('./routes/api/auth'));

app.all('*', (req, res) => {
    res.status(404);
})

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
    console.log('db connected')
    app.listen(PORT, function () {
        console.log(`listening on port ${PORT}`);
    });

})
