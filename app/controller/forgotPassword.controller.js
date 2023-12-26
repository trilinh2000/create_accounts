const AccountModel=require('../module/product')
const bcrypt=require('bcrypt')
const mailer=require('../ultils/mailer');
require('dotenv/config')
module.exports.ShowFormUser=(req,res) =>{
    res.render('Account/email');
}
module.exports.Email=async(req,res)=>{
    const {email}=req.body;
    if(email){
        const data= await AccountModel.findOne({email:email});
        if(data===0){
            console.log("k tim thay email");
            res.redirect('/password/reset')
        }
        else{
            console.log('email:',data.email);
            bcrypt.hash(data.email,parseInt(process.env.BCRYPT_HASH)).then((hashEmail)=>{
                mailer.sendMail(data.email,"RESET PASSWORD",`<a href="${process.env.APP_URL}/password/reset/${data.email}?token=${hashEmail}">RESET PASSWORD</a>`)
                res.redirect('/password/reset?status=success');
            })
        }
    }
    else{
        res.render('Account/email');
    }
}
exports.ShowFormReset=(req,res) =>{
    if(!req.params.email||!req.query.token){
        res.redirect('/password/reset');
    }
    else{
        res.render('Account/reset',{email:req.params.email,token:req.query.token});
    }
}
exports.reset=async(req,res) =>{
    const {email,token,password}=req.body;
    if(!email||!token||!password){
        console.log("chua nhap password");
        res.redirect('/password/reset');
    }
    else{
        bcrypt.compare(email,token,(err,result)=>{
            if(result==true){
                bcrypt.hash(password,parseInt(process.env.BCRYPT_HASH)).then(async(hashed)=>{
                    const up=await AccountModel.updateOne({email:email},{password:hashed});
                    console.log(up);
                    if(up===0){
                        console.log("err");
                        res.redirect('/password/reset');
                    }
                    else{
                        console.log("reset success");
                        res.redirect('/login'); 

                    }
                })
            }
            else{
                res.redirect('/password/reset');
            }
        })
    }

}