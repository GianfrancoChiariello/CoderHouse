import bcrypt from 'bcrypt'

export const createHash = password =>  
    bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => 
    bcrypt.compareSync(password, user.password)


export const auth = (req,res,next) => {
    if (req.session?.user) {
        console.log(req.session.user)
        return next()
    } else {
        return res.redirect('/login')
    }
}

export const auth2 = (req,res,next) => {
    if (req.session?.user) {
        return res.redirect('/')
    }
}


