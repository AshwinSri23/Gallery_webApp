const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Making the schema for a given art piece
let artSchema = new Schema({
    ArtistID: {
        type: Schema.Types.ObjectId, 
        ref: 'Artist'

    },
    Title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    Artist: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    Year:{
        type: Number,
        required: [true,"You need a price to sell an item"],
        min: [0,"Price must be positive"]
    },
    Category:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    Medium:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    Description:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500
    },
    Poster:{
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("Art", artSchema);