const express = require('express');
//const multer = require('multer');

//Controllers
const { login } = require('../controller/validator');


const router = express.Router();

router.post('/',login);

module.exports= router;
// VALIDAR LO DEL TOKEN 
// EN EL TOKEN ENVIE 