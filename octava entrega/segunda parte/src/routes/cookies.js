import {Router} from 'express'

const router = Router()

//       /api/cookies/

//middlware

const auth = (req,res,next) => {
    if (req.session?.user === 'admin' && req.session.admin) {
        return next()
    } else {
        return res.sendStatus(401)
    }
}

//

router.get('/logout', (req,res) => {
    req.session.destroy( err => {
            if (!err) res.send('Logout ok')
            else res.send({status: 'Logout ERROR', body: err})
        }
    )
})

router.get('/login', (req,res) => {

    const { username , password } = req.query

    if (username !== 'admin' || password !== 'admin') {
        return res.send('Login error')
    }

    req.session.user = username;
    req.session.admin = true;
    
    res.send('Login OK')
})

router.get('/privado', auth, (req,res) => {
    res.send('Tienes permiso en la pagina privada')
})




export default router;