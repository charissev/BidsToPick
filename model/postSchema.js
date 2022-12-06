const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema( {

    postedBy: {
        type: String,
        required: true
    },
    posterImg: {
        type: String,
        required: true
    },
    postImg: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    postDetails: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    likers: [{
        likerUserName: {
            type: String,
            required: true
        }
    }],
    
    startingBid: {
        type: Number,
        required: true
    },
    buyOutPrice: {
        type: Number,
        required: true
    },
    minimumIncrement: {
        type: Number,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },

    comments: [{
        commentedBy: {
            type: String,
            required: true
        },
        commentDetails: {
            type: String,
            required: true
        }
    }]

});

//name of the schema, usersSchema (the var)
module.exports = mongoose.model('post', postSchema);
