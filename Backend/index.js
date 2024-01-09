const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app =express();

const userRoutes = require('./Routes/userRoutes')
const adminRoutes = require('./Routes/adminRoutes')

app.use(express.json());
app.use(express.urlencoded({extended : true}));


// app.use('/', userRoutes);
// app.use('/admin' , adminRoutes);



app.get('/',(req,res)=>{
    res.json({
        message: "Hello World !!"
    })
})

app.listen(8000,()=>{
    console.log(`Server running on ${'http://localhost:8000'}`);
})