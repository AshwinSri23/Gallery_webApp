const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Making the schema for each artist account
let workshopSchema = new Schema({
    Host: {
        type: Schema.Types.ObjectId, 
        ref:'Artist'
    },
    Title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },    
});