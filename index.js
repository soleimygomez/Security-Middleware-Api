const express = require('express');
const routerApi=require('./src/routes');

const app=express();
const port = 3002;

app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Server en Express');
})

 routerApi(app);
 
 

//en produccion no deben haber console.log
app.listen(port,()=>{
    console.log('puerto : '+port);
})
