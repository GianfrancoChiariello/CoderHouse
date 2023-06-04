export const auth = (req,res,next) => {
    if (req.session?.user) {
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


