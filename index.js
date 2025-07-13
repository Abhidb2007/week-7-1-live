const express = require("express");
const { UserModel,TodoModel } = require("./db");
const app = express();
app.post("/signup",function(req, res){
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.name;


    UserModel.insert({
        name: "abhi",
        password: "123",
        email: "abhishekdb81@gmail.com"
    })
    res.json({
        message: "you are logged in"
    })

});

app.post("/signin",function(req, res){

});

app.get("/todo",function(req, res){

});

app.post("/todos",function(req, res){

});
app.listen(3000);