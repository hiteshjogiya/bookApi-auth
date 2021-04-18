const express = require('express');
const mongoose = require('mongoose');
const route = require('./route');
const bodyparser = require('body-parser');
const cors = require('cors');


mongoose.connect('mongodb://localhost:27017/emp',{useNewUrlParser:true,useUnifiedTopology:true}).then(

 ()=>{
    const app = express();
    app.use(cors());
    app.use(bodyparser.urlencoded({extended:true}));
    app.use(express.json());
    app.use('/api',route);
    

    app.listen(3000,(req,res)=>{
        console.log("server started");
    });
} 

)
.catch(
    (err)=>{
        console.log(err);
    }
)