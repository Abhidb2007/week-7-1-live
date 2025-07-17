const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = ("./routes/user");
const { adminRouter } = ("./routes/admin");
const { courseRouter } = ("./routes/course");
const app = ("express");
app.use = (express. json());
app("api/v1/user", userRouter);
app("api/v1/admin", adminRouter);
app("api/v1/course", courseRouter);
async function main(){
    await mongoose.connect("")
    console.log("")
}