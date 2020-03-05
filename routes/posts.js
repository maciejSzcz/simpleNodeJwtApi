const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Data = require('../model/Data');
const { dataValidation } = require('../validation.js');


router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'first post',
            description: 'random data for post'
        }
    });

});

router.post('/', verify, async (req, res) => {
    const {error} = dataValidation(req);
    if (error) return res.status(400).send(error.details[0].message)

    const sentData = new Data({
        header: req.body.header,
        data: req.body.data
    })
    try {
        const savedData = await sentData.save()
        console.log(savedData);
        res.send('succesful');
    } catch (error) {
        res.status(400).send(err)
    }
})

router.put('/', verify, async (req, res) => {
    const { error } = dataValidation(req);
    if (error) return res.status(400).send(error.details[0].message)

    

    const data = new Data({
        header: req.body.header,
        data: req.body.data
    })

    try {
        const found = await Data.findOneAndUpdate({ header: req.body.header }, {data}).then(() => {
            console.log("zupdateowano")
        });
        console.log(found);
        res.send('succesful');
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/', verify, async (req, res) => {
    const found = await Data.findOneAndDelete({header: req.body.header})

    if (found) {
        res.json({
            msg: `post deleted with header of ${req.body.header}`
        })
    } else {
        res.status(400).json({ msg: `post not found with header of ${req.body.header}` })
    }
})

module.exports = router;