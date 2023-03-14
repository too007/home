const mongoose = require('mongoose')

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/data').on('open',()=>{
    console.log('mongo connected');
}).on('error',()=>{
    console.log('mongo db');
});
module.exports = connection;
