const AccountModel=require('../module/product')
const bcrypt=require('bcrypt')
const mailer=require('../ultils/mailer');
require('dotenv/config')
exports.create=(req,res) =>{
    console.log('show form create');
    res.render('Account/create');
}
exports.send=async (req,res) =>{
    const {username,password,phone,address,email}=req.body;
    if(username&&password&&email&&phone&&address){
        const finddy=await AccountModel.find({email:email});
        if(finddy.length ===0){
            bcrypt.hash(password,parseInt(process.env.BCRYPT_HASH)).then(async(hashed) =>{
                const data=await AccountModel.create({username:username,password:hashed,email:email,phone:phone,address:address});

                bcrypt.hash(data.email,parseInt(process.env.BCRYPT_HASH)).then(async(hashEmail)=>{
                    mailer.sendMail(data.email,"CREATE TK",`<a href="${process.env.APP_URL}/verify?email=${data.email}&token=${hashEmail}"> Verify </a>`)
                })
                if(data.length===0){
                    console.log('err');
                    res.redirect('/create?status=error');
                } 
                else{
                    console.log(data.email);
                    res.redirect('/create?status=access');
                    const very1=await AccountModel.findOne({email:data.email,verify:false})
                    if(very1.length===0){
                        console.log("k tim thay tai khoan");
                    }
                    else{
                        setTimeout(async(req,res) =>{
                            const xoa= await AccountModel.deleteOne({email:very1.email,verify:false});
                            console.log(very1.email)
                        },30000);
                          
                    }
                }
            })
            
        }
        else{
            console.log('user ton tai');
            res.render('Account/create');
        }
        
    }
    else{
        console.log('nhap user va pass');
        res.render('Account/create');
    }
    
}
exports.verify=(req,res) =>{
    bcrypt.compare(req.query.email,req.query.token,(err,result) =>{
        if (result == true) {
            AccountModel.updateOne({email:req.query.email},{verify:true}).then((data)=>{
                console.log(data)
            }).catch(err=>{
                console.log(err)
            })
            res.redirect('/login');
            }
        else {
            res.redirect('/404');
        }
    })
}