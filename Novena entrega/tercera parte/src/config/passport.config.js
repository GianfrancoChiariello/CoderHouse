import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/MongoDB/models/user.model';
import { isValidPassword, createHash } from '../utils/functions';

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //Permite acceder al objeto request como cualquier otro middleware
        usernameField: 'email',
    }, async ( req , username, password, done ) => {
        const { first_name, last_name, email, age} = req.body;

        try {
             const duplicate = await userModel.findOne({email: username})
             
             if (duplicate) {
                return done(null, false, {message: 'Email already registered'})
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password : createHash(password)
            }

            const userr = await userModel.create(newUser)
            return done(null, userr, {message: 'User created'})

        } catch (error) {
            return done(error);
        }
    }))

    passport.use('login', new LocalStrategy({
        passReqToCallback: true, 
        usernameField: 'email',
    }, async (username, password, done ) => {
        try {
            const user = await userModel.findOne({email: username})

            if (!user) {
                return done(null, false, {message: 'Email or password incorrect'})
            }

            if (!isValidPassword(user, password)) {
                return done(null, false, {message: 'Email or password incorrect'})
            }

            return done(null, user, {message: 'Login user OK'})
            
        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user);
    })
}

export default initializePassport;