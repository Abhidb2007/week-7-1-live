const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "asdasd123@gmail.com";

const app = express();
app.use(express.json());

// ✅ Make the function async to use await
app.post("/signup", async function(req, res) {
    const { email, name, password } = req.body;

    await UserModel.create({
        email: email,
        name: name,
        password: password
    });

    res.json({
        message: "you are logged in"
    });
});


app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    });

    console.log(user);

    if (user) {
        // ✅ Add a secret key here (required)
        const token = jwt.sign(
            { id: user._id },
            "your_secret_key" // Replace with a real secret in production
        );

        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
});

// Dummy GET route for todos (not yet implemented)
app.get("/todo", function (req, res) {
    
});

// Dummy POST route for creating todos (not yet implemented)
app.get("/todos", function (req, res) {
    const userId = req. userID;
    res.json({
        userId: userId
    })

});
function auth(req, res, next){    
    const token = req.header.token;
    const decodedData = jwt.verify(token,JWT_SECRET);
    if(decodeData){
        req.userId = decodedData.userId;
        next();
    }else{
       res.status(403).json({
        message: "Incorrect credentials"
      }); 
    }

}
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});