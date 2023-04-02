const app =require('./app');
const db = require('./config/db')
const usermodel= require('./models/user.model')
const   port = 3000;
const multer = require('multer')
const sharp = require('sharp')
const express = require('express')
const fs = require('fs')
var bodyParse = require('body-parser')
const mongoose = require('mongoose')
const uploadFiles  = require('./helper/cloudinary');

const fileUpload = require('express-fileupload');
const ProductModel = require('./models/product');

// const newLocal = 'express-fileuploader';
// const fileUpload = require(newLocal);



// const upload = multer();

// const mongoClient = new MongoClient('mongodb://localhost:27017/data', {  useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true, });
// //await mongoClient.connect();
// const dbs = mongoClient.db('mydatabase');
// // const bucket = new GridFSBucket(db, { bucketName: 'images' });

mongoose
  .connect('mongodb+srv://saikiran:saikiran@ecommerce.nb3ccku.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((e) => {
    console.error(`error====>${e}`);
  });


app.get('/',(req,res)=>{
  res.send("hello SAGAR");
});

app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    
}));

//configure multer

// const uploads = multer({
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Please upload a valid image file'))
//         }
//         cb(undefined, true)
//     }
// })

app.post('/product', async (req, res) => {
    try {
        const {name,price} = req.body;
        const files = req.files.images;
        console.log(name,price);
        const url = await uploadFiles(files)
        console.log(url);
        const newProduct = new ProductModel({
            name, price, images:url
        });
        newProduct.save().then((r) => {
            res.json(r)
        }).catch(e => {
            console.log(e);
        })

        

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

app.listen(port,()=>{
    console.log('server on port 3000');
});



app.post('/upload', async (req, res, next) => {
    var realFile = Buffer.from(req.body.image, "base64");
    fs.writeFileSync(req.body.name, realFile, "utf8")
    
    await res.send({message:"upload image in flutter"})
})