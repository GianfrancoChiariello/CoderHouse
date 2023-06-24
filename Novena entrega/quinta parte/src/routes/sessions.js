import {Router} from 'express'
import userModel from '../dao/MongoDB/models/user.model.js'
import { createHash, isValidPassword } from '../utils/functions.js'
import { generateToken } from '../utils.js'


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

        const accessToken = generateToken(newUser)

        res.send({accessToken})
    } catch (error) {
        res.send(error)
    }
})


router.post('/login', async (req,res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({email})

    if (!user) {
        return res.send('Email or password incorrect')
    }

    if (!isValidPassword(user, password)) {
        return res.send('Email or password incorrect')
    }

    const accessToken = generateToken(user)

    res.send({access_token: accessToken})
    
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