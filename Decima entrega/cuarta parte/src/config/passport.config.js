import passport from 'passport';
import userModel from '../dao/MongoDB/models/user.model.js'
import GitHubStrategy from 'passport-github2';


const initializePassport = () => {

    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.956f6368c838802a",
        clientSecret: "2fc646d25b493e3f066d9f415e205e13f971200b",
        callbackURL: "http://localhost:8080/api/session/github-callback",
        scope: ['user:email']
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value;
            const user = await userModel.findOne({ email });

            if (user) {
                return done(null, user);
            } else {
                const newUser = new userModel({
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password: ''
                });
                await userModel.create(newUser);
                return done(null, newUser);
            }
        }
    ));
    

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user);
    })
}

export default initializePassport;