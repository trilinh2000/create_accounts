const AccountModel=require('../module/product')
const bcrypt=require('bcrypt')
const mailer=require('../ultils/mailer');
module.exports.ShowFromLogin=async(req,res) =>{
    await res.render('Account/login');
}
module.exports.login=async(req,res) =>{
    const {email,password}=req.body;
    if(email&&password){
        const account=await AccountModel.findOne({email:email});
        if(account===0){
            console.log('email sai');
        }
        else{
            
            bcrypt.compare(password,account.password,(err,result) =>{
                if(result==true){
                    req.session.loggedin=true;
                    req.session.account=account;
                    console.log(req.session.account);
                    console.log("Login");
                    res.redirect('/home');
                }
                else{
                    console.log("password sai");
                    res.render('Account/login');
                }
            })
        }
    }
}
module.exports.logout=(req,res) =>{
    req.session.destroy((err) =>{
        if(err){
            res.redirect('/500');
        }
        res.redirect('/login');
        console.log("Logout")
    })
}