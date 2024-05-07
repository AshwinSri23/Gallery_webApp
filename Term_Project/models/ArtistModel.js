const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Making the schema for each artist account
let artistSchema = new Schema({
    Name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    
});

//Instance method that finds the art pieces made by the given artist. 
artistSchema.methods.findArt = function(callback){
    this.model("Art").find()
    .where("ArtistID").equals(this._id)
    .exec()
    .then(callback);
};

module.exports = mongoose.model("Artist", artistSchema);