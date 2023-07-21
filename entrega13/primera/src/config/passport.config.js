import passport from 'passport';
import jwt from 'passport-jwt'
import config from '../config.js'

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = req => {
    let token = null;
    if (req && req.headers.cookie) {
        const modifiedCookieString = req.headers.cookie.replace('cookieTest=', '');
        token =  modifiedCookieString
    }
    return token;
}


const initializePassport = () => {
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
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