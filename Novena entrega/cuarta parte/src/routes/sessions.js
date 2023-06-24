import {Router} from 'express'
import userModel from '../dao/MongoDB/models/user.model.js'
import { createHash, isValidPassword } from '../utils/functions.js'
import passport from 'passport'

const router = Router()


router.get('/github', passport.authenticate('github', { scope: ['user:email'] })
    , async (req, res) => {
        res.send({
            status: 'ok',
            message: 'Redirecting to github'
        })
    }
);

router.get('/github-callback', passport.authenticate('github', { failureRedirect: '/login' })
    , async (req, res) => {
        req.session.user = req.user;

        res.redirect('/');
    }
);




export default router;