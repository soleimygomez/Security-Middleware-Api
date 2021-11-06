const express = require('express');
const loginRoutes=require('./login.routes');

//definicion de Rutas
function routerApi(app){
    const router=express.Router();
    app.use('/api/v1/login',loginRoutes);
  
}


module.exports =routerApi;
