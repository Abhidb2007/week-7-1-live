const express = require("express");
const { UserModel,TodoModel } = require("./db");
const app = express();
app.post("/signup",function(req, res){
    UserModel.insert({
        name: "abhi",
        password: "123",
        email: "abhishekdb81@gmail.com"
    })

});

app.post("/signin",function(req, res){

});

app.get("/todo",function(req, res){

});

app.post("/todos",function(req, res){

});
app.listen(3000);