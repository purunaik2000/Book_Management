const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("", {useNewUrlParser: true})
.then(()=>console.log("Connected to database..."))
.catch((err)=>console.log(err));

const route = require('./route/route');

app.use('/', route);

app.listen(3000,(err)=>{
    if(err) console.log(err.message);
    console.log("Application is running on port 3000...");
});