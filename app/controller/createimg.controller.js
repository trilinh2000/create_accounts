const bcrypt=require('bcrypt')
const AccountModel=require('../module/product');
const CourseModel=require('../module/product')
exports.ShowFromCreateimg=async(req,res,next) =>{
    if(req.session.loggedin){
    res.locals.account=req.session.account;
    await res.render('Account/login/createimg');
    }
    else{
        next();
    }
}
exports.sendimg=async(req,res) =>{
    const {title,salary,img,email}=req.body;
    
    if(title&&salary&&img){
        const data=await AccountModel.findOne({email});
        const send=await CourseModel.create({id:data.course,title:title,salary:salary,img:img})
        
    }
}