const mongoos = require("mongoose");

const userSchema = new mongoos.Schema({
    userName: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
}, { timestamps: true });

module.exports = mongoos.model("User", userSchema);