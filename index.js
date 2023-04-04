const app =require('./app');
const db = require('./config/db')
//const usermodel= require('./mode/user.model')
const usermodel=require('./models/user.model')
const port = 3000;
const multer = require('multer')
const sharp = require('sharp')
const express = require('express') 
const { MongoClient } = require('mongodb');
const { Readable } = require('stream');
const { GridFSBucket } = require('mongodb');
const { json } = require('body-parser');



const upload = multer();



const bucket = new GridFSBucket(db, { bucketName: 'images' });
app.get('/',async(req,res)=>{
  try {
    const data= await usermodel.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({message: error.message})
  }

});
app.get('/images', async (req, res) => {
    try {
      const files = await bucket.find().toArray();
      const fileNames = files.map(file => file.filename);
      res.json({ files: fileNames });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  
app.use(express.json())
//configure multer

const uploads = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
})



app.post('/image', upload.single('upload'), async (req, res) => {
    try {
         await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `/images/${req.file.originalname}`)
         const readableStream = new Readable();
        readableStream.push(req.file.buffer);
        readableStream.push(null);
        
        const uploadStream = bucket.openUploadStream(req.file.originalname);
        const result = await new Promise((resolve, reject) => {
            readableStream.pipe(uploadStream)
                .on('finish', resolve)
                .on('error', reject);
        });
        res.status(201).json({status:true})
        

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
app.use(express.static('public')); 
app.use('/images', express.static('images'));//take for

app.listen(port,()=>{
    console.log('server on port 3000');
});