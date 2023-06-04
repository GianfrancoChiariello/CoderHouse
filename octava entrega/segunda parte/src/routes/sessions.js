import {Router} from 'express'
import userModel from '../dao/MongoDB/models/user.model.js'
import {auth2} from '../utils/functions.js'

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
            password
        }
    
        await userModel.create(newUser)
        res.send('User created')
    } catch (error) {
        res.send(error)
    }
})


router.post('/login', async (req,res) => {

    const { first_name, last_name, email, password } = req.body

    const user = await userModel.findOne({email, password})

    if (!user) {
        return res.send('Email or password incorrect')
    }

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = {
            name: `${first_name} ${last_name}`,
            email: user.email,
            age: user.age,
            admin: true
        }
        return res.send('Login admin OK')
    } else {
        req.session.user = {
            name: `${first_name} ${last_name}`,
            email: user.email,
            age: user.age,
            admin: false,
            usuario: true
        }
        return res.send('Login user OK')
    }


    
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