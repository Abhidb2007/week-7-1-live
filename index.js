const express = require("express");
const { UserModel,TodoModel } = require("./db");
const app = express();
app.use(express.json());
app.post("/signup",function(req, res){
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;


    await UserModel.insert({
        email: email,
        password: password,
        name: name
    })
    res.json({
        message: "you are logged in"
    })

});

app.post("/signin",async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await UserModel.findOne({
        email: email,
        password: password
    })
    console.log(user);

    if (user){
        const token = jwt.sign({
            id: user._id
        });
        res.json({
            token: token
        });
    }else{
        res.status(403).json({
            message: "Incorrect  credentials"
        })
    }

});

app.get("/todo",function(req, res){

});

app.post("/todos",function(req, res){

});
app.listen(3000);