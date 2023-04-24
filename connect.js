const mongoose=require('mongoose');
mongoose.set('strictQuery', false)
async function getConnection() {
    await mongoose.connect('mongodb+srv://abhinavkashyap201:3TI7HtHb31aylesp@cluster0.urnxsol.mongodb.net/test');
    console.log("Successfully connected to DataBase");
}    
module.exports= getConnection

//3TI7HtHb31aylesp

//