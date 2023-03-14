const app =require('./app');
const db = require('./config/db')
const usermodel= require('./mode/user.model')
const port = 3000;


app.get('/',(req,res)=>{
  res.send("hello");
});

app.listen(port,()=>{
    console.log('server on port 3000');
});