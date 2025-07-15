const express = require("express");
const { UserModel, TodoModel } = require("./db");
const {auth,JWT_SECRET} = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose.connect("");
 const app = express();
 app.use(express.json());


app.post("/signup",function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    });
    res.json({
        message: "you are signed up"
    })
});
app.post("/signin",function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
        password: password,
    });

    if(response){
        const token = jwt.sign({
            id:response._id.toString()
        },JWT_SECRET);
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

app.listen(3000);
