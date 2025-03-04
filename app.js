require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const {encrypt, decrypt} = require('./utils/encryption');
const indexRouter = require('./routes/index');
const app = express();

// view engine setup as ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.post('/encrypt', (req, res) => {
    console.log('Request body:', req.body);

    const {text} = req.body;

    if (!text) {
        return res.status(400).json({error: 'No text provided for encryption'});
    }

    try {
        const encryptedText = encrypt(text);
        // console.log(encryptedText);
        res.json({encryptedText});
    } catch (error) {
        console.error('Error encrypting text:', error);
        res.status(500).json({error: 'Encryption failed'});
    }
});

app.post('/decrypt', (req, res) => {
    const {encryptedText} = req.body;

    if (!encryptedText) {
        return res.status(400).json({error: 'No encrypted text provided for decryption'});
    }

    try {
        const decryptedText = decrypt(encryptedText);
        // console.log(decryptedText);

        res.json({decryptedText});
    } catch (error) {
        console.error('Error decrypting text:', error);
        res.status(500).json({error: 'Decryption failed'});
    }
});

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

module.exports = app;
