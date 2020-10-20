const isLoggedIn = (req,res,next)=> {
    if(req.user) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}


module.exports =  isLoggedIn