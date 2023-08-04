import passport from 'passport';
import jwt from 'passport-jwt'
import config from '../config.js'

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const tokenExtractor = req => {
    let token = null;
    if (req && req.headers.authorization) {
        const tokenJWT = req.headers.authorization.split(' ')[1] 
        token =  tokenJWT
    }
    return token;
}


const initializePassport = () => {
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([tokenExtractor]),
        secretOrKey: config.secretOrKey
    }, async (payload, done) => {
        console.log(payload)
        try {
            return done(null, payload.user)
        }
        catch (error) {
            done(error)
        }
    }))
}

export default initializePassport;