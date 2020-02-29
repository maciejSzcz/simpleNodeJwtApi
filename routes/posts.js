const express = require('express');
const router = express.Router();
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'first post',
            description: 'random data for post'
        }
    })

})

module.exports = router;