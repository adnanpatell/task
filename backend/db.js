const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://adnan:123123123@cluster0.cnqb2yh.mongodb.net/"
const connecttomongo =() =>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Conected To Mongoose Successfully");
    })
}
module.exports = connecttomongo;