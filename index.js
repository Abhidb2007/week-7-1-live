const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "asdasd123@gmail.com";

const app = express();
app.use(express.json());

// ✅ Middleware to protect routes
function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.userId = decodedData.userId; // must match what you encoded
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
}

// ✅ Signup Route
app.post("/signup", async function (req, res) {
    const { email, name, password } = req.body;

    await UserModel.create({ email, name, password });

    res.json({ message: "You are signed up" });
});

// ✅ Signin Route
app.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email, password });

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET); // ✅ match key

        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

// ✅ Protected Route: Get ToDos
app.get("/todo", auth, function (req, res) {
    const userId = req.userId;
    res.json({ message: "Get todos", userId });
});

// ✅ Protected Route: Create ToDos
app.post("/todos", auth, function (req, res) {
    const userId = req.userId;
    res.json({ message: "Create todo", userId });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});