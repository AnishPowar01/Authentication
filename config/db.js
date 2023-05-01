const mongoose = require('mongoose');

require('dotenv').config();


exports.dbConnect = () =>{

    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true,

    }).then(
        console.log("Db is connected successfully")
    ).catch((error)=>{
        console.log("Connection failed");
        console.log(error);

        process.exit(1);
    })
}