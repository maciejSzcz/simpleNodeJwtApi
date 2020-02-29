const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation.js');

router.post('/register', async (req, res) => {
    //valiation of data
    const {error} = registerValidation(req)
    if (error) return res.status(400).send(error.details[0].message)

    //check for user in db
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send('Email already exists')

    //hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err)
    }

});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or password is wrong')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Email or password is wrong')

    // create jwt 
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('jwt-token', token).send(token)
})

module.exports = router;