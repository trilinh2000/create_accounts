const express=require('express');
const app=express();
// const bodyParser = require('body-parser');
const session=require('express-session');
const connectDB=require('./app/config/mongoose.config');
connectDB();
require('dotenv/config');
app.set('view engine', 'ejs')
app.set('views', 'app/views');

//mã hóa data xong moi day vao req.body
//ma hoa kieu json
//cách 1
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cách 2
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true,
}))
require('./app/Router/router')(app);
app.listen(process.env.SERVER,(err,res) =>{
    if(err) throw err;
    console.log(`http://localhost:${process.env.SERVER}`);
})