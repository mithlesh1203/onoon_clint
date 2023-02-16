const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const conn = require('./db/conn')
const User = require('./models/userSchema');
var cors = require('cors')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
app.use(cors())

app.use(express.json());
//we link the rought file
app.use(require('./controller/UsersAuthentiication'))

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT;



const middleware = (req,res,next) =>{
  console.log(`welcom Mithlesh on middleware`)
  next();
}

app.get('/', (req,res) =>{
  res.send(`Hi Mithlesh from app.js`)
});

app.get('/singup', (req,res) =>{
  res.send(`welcom Mithlesh on singup page`)
});

app.get('/login', (req,res) =>{
  res.send(`welcom Mithlesh on login page`)
});

app.get('/about', middleware,  (req,res) =>{
  res.send(`welcom Mithlesh on about page`)
});

app.get('/contact', (req,res) =>{
  res.send(`welcom Mithlesh on contact page`)
});

app.listen(PORT, () =>{
  console.log(`My server is running at PORT ${PORT}`)
})