const mongoose = require('mongoose')
const DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{
    console.log('Connection successful with database');
}).catch((err)=>{
    console.log(`Error connecting to database ${err}`);
})