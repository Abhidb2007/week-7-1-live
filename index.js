const bcrypt = require("bcrypt");
const express = require("express");   
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod");

mongoose.connect("mongodb://localhost:27017/mydatabase"); // Add your MongoDB URI

const app = express();
app.use(express.json());

// SIGNUP ROUTE
app.post("/signup", async function(req, res) {
    const requiredBody = z.object({
        email: z.string(),
        password: z.string,
        name: z.string


    })
    const parseData = requiredBody.parse(req.body);
    const parsedDatawithSuccess = requiredBody.safeParse(req.body);


    const { email, password, name } = req.body;
    if(typeof email !== "string" || email.length < 5 ||!email.includes("@")){
        res.json({
            message: "Email incorrect"
        })
        return
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    console.log("Hashed Password:", hashedPassword);

    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    });

    res.json({
        message: "You are signed up"
    });
});

// SIGNIN ROUTE
app.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(403).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
