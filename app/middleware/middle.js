exports.login=(req,res,next) =>{
    if(req.session.loggedin){
        res.locals.account=req.session.account;
        res.redirect('/home');
    }
    else{
        next();
    }
}
exports.loggedin=(req,res,next)=>{
    if(req.session.loggedin){
        res.locals.account=req.session.account;
        next();
    }
    else{
        res.redirect('/logout');
    }
}