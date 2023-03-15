const mongoos = require("mongoose");

const reviewSchema = new mongoos.Schema({
    id: {type: ObjectId, require: true, unique:true},
    body: {type: String, require: true},
});

module.exports = mongoose.model("Review", reviewSchema);