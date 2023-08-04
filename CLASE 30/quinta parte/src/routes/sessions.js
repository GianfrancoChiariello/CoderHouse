import {Router} from 'express'
import userModel from '../dao/MongoDB/models/user.model.js'
import { createHash, isValidPassword } from '../utils/functions.js'
import { generateToken } from '../utils.js'
import passport from 'passport'

const router = Router()


router.post('/register', async (req,res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body

        const duplicate = await userModel.findOne({email})
        if (duplicate) {
            return res.send('Email already registered')
        }

        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password : createHash(password)
        }
    
        await userModel.create(newUser)

        res.send({status: 'User created', body: newUser})
    } catch (error) {
        res.send(error)
    }
})


router.post('/login', async (req,res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({email})

    !user && res.status(404).send({status: 'Email or password incorrect'})
    !isValidPassword(user, password) && res.status(404).send({status: 'Email or password incorrect'})
   

    const accessToken = generateToken(user)
    res.send({status: 'Login ok', user, token: accessToken})
})

router.get('/current',passport.authenticate('jwt', {session: false }), (req,res) => {
    console.log(req)
    res.send(req.user)
})

router.get('/logout', (req,res) => {
    req.session.destroy( err => {
            if (!err) res.send('Logout ok')
            else res.send({status: 'Logout ERROR', body: err})
            res.redirect('/')
        }
    )
})


router.get('/hola', passport.authenticate('jwt', {session: false }),  (req,res) => {
    console.log(req)
    res.send('Hola')
})



export default router;