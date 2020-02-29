const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')

dotenv.config()

const PORT = process.env.PORT || 3000;

mongoose.connect(`${process.env.DB_CONNECT}`, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }, () => console.log('DB Connected!')
);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// Middlewares
app.use(express.json());

app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
