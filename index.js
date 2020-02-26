const express = require('express');
const app = express();

const PORT = process.env.port || 3000

const authRoute = require('./routes/auth');

// Middlewares

app.use('/api/user', authRoute)

app.listen(3000, () => console.log(`Server running on port ${PORT}`))