const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let accountSchema = new Schema({
    userName: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    passWord: {
        type: String,
        minlength: 3,
        maxlength: 50
    }
});

module.exports = mongoose.model("Account", accountSchema);