const express = require('express')
const User = require('../model/user')
const auth = require('../middleware/auth')

const router = new express.Router()



router.post('/user/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send({'msg': 'Successfully Signup'}); 
    } catch (err) {
        res.send({'msg': 'Unsuccessfully Signup Error: ' + err}); 
    }
});


router.post('/user/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()

        res.send({'msg': 'Successfully login', token}); 
    } catch (err) {
        res.send({'msg': 'Unsuccessfully login Error: ' + err}); 
    }
});


router.get('/user/getprofile', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        res.send({'msg:': 'Profile can not fetched, Error : ' + err});
    }
});


router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({'msg': 'logout seccessfully'})
    } catch (e) {
        res.status(500).send({'msg': 'logout Unseccessfully'})
    }
})

router.delete('/user/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send({'msg': 'profile deleted'});
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router