const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const User = new Schema({
    email: String,
    password: String,
    name: string

})

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})