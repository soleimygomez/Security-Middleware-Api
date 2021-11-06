//Requires

const jwt = require('jsonwebtoken');
//const jwt_decode= require('jwt-decode');
var fs = require("fs");
const {my_secret_key} = require('../config/global');
const {loginService}=require('./../services/loginService')


//Verify token
const verifyToken = async (req, res, next) => {
  
  try{
    //Get header value
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undefined'){ 
      //Get the real token
      const bearer = bearerHeader.split(" ")[1];
      console.log(bearer);
      console.log("__________________________________");
      
      console.log(my_secret_key);
      //Set the token
    
        jwt.verify(bearer, my_secret_key, (err) => {
          console.log("_________________1");
          console.log(err);
          if(err){
            res.sendStatus(403).json({message: "El token es inválido o la sesión ha expirado. Por favor, vuelva a ingresar."});
            console.log("_________________1");
          }else{
            next();
            console.log("__________________________2");
          }
        });
    }else{
      res.sendStatus(401).json({message: "El usuario no tiene permisos para acceder a este recurso."});
      console.log("__________________________3");
    }
  }catch(e){

    return false;
  }
};

const login = async (req, res, next) => {
  
  try {
   
    const {
    email,
    password,
    name
     }=req.body;
    console.log("sssss111111");
    const result = await loginService.login(req.body);
    console.log(result,"sssss");
    const tok= jwt.sign(result,my_secret_key, {  expiresIn : '1h'  } );
    console.log(tok);
   // const guardar= await saveAuth(token);
    res
      .status(500)
      .json({ message: 'Token Generado',tok });
    
  } catch (e) {
    res
      .status(500)
      .json({ message: 'No es posible realizar el registro en este momento.' });
  }
};
module.exports = {
    verifyToken,login
  };
  