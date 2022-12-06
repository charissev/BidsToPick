const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema( {
    firstName: { 
        type: String, 
        required: true,
    },

    lastName: { 
        type: String, 
        required: true,
    },

    idNum: {
        type: Number,
        required: true,
        unique: true,
        minLength: 8,
        maxLength: 8
    },

    userName: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        default: ""
    },

    profileImg: {
        // TODO:
        // might have to change this if ever? 
        // maybe into a blob, or modify controller to use file paths
        type: String, 
        default: "/images/dp/dp_default.png"
    }
});

//name of the schema, usersSchema (the var)
module.exports = mongoose.model('users', usersSchema);