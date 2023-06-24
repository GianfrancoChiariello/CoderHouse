import {Router} from 'express'
import userModel from '../dao/MongoDB/models/user.model.js'
import { createHash, isValidPassword } from '../utils/functions.js'
import passport from 'passport'

const router = Router()


router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }) , async (req,res) => {
    try {
        res.send('User created')
    } catch (error) {
        res.send(error)
    }
})

router.get('/fail-register', (req,res) => {
    res.send('Fail register')
})


router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-register' }) , async (req,res) => {

    if(!req.user) return res.send('Email or password incorrect')

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
    }

    return res.send('Login user OK')

    
})


router.get('/logout', (req,res) => {
    req.session.destroy( err => {
            if (!err) res.send('Logout ok')
            else res.send({status: 'Logout ERROR', body: err})
            res.redirect('/')
        }
    )
})




export default router;