const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectToMongoDB = require('./connection');

const bcrypt = require('bcryptjs')
const User = require('./user');
const path = require('path');
const route = require('./routes/routes');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb+srv://aminamusabekova07:O4LX3M7uDICQuFIV@cluster0.xicdgfr.mongodb.net/mySite',
    collection: 'session'
});

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use('/css', express.static(__dirname + '/public/css'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));

app.use('/', route);

async function start() {
    const uri = await connectToMongoDB();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
}

start();