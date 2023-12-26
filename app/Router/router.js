const router=require('express').Router();
const Account=require('../controller/controller');
const login=require('../controller/login.controller');
const middle=require('../middleware/middle');
const forgot=require('../controller/forgotPassword.controller');
// const createimg=require('../controller/createimg.controller');
module.exports = app =>{
    router.get('/home',middle.loggedin,(req,res)=>{
        res.render('home');
    })
    // .get('/home/createimg',middle.login,createimg.ShowFromCreateimg)
    // .post('/home/createimg',createimg.sendimg)
    .get('/create',Account.create)
    .post('/create',Account.send)
    .get('/verify',Account.verify)
    .get('/login',middle.login,login.ShowFromLogin)
    .post('/login',login.login)
    .get('/logout',middle.loggedin,login.logout)
    .get('/password/reset',forgot.ShowFormUser)
    .post('/password/reset/email',forgot.Email)
    .get('/password/reset/:email',forgot.ShowFormReset)
    .post('/password/reset',forgot.reset)
    app.use(router);
}