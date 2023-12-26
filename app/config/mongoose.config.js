const mongoose=require('mongoose');
module.exports=connectDB=async() =>{
    try {
    await mongoose.connect("mongodb+srv://root:khanh@cluster0.ond7qez.mongodb.net/mydb?retryWrites=true&w=majority",{ssl: true});
    console.log('Connected!');
    } catch (error) {
        console.log(error);
    }
}
