const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cookieParser());
app.use(express.json());
require("dotenv/config");

app.use(cors());

mongoose.connect(process.env.DB_CONNECTION_STRING,{useNewUrlParser : true,useUnifiedTopology: true},(req,res)=>{
    console.log('successfully connected to database');
});

const userRouter = require('./routes/User');
app.use('/user',userRouter);

app.listen(5000,()=>{
    console.log('express server started');
});