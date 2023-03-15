const mongoos = require("mongoose");

const Schema = mongoos.Schema;

const movieSchema = new mongoos.Schema({
    id: {type: Schema.Types.ObjectId, require: true, unique: true},
    imdbId: {type: String, require:true, unique: true},
    title: {type: String, require:true},
    releaseDate:{type: String, require:true},
    trailerLink:{type: String, require:true},
    poster:{type: String, require:true},
    isFav:{type: Boolean, require:true},
    genres:{type: [String], require:true},
    backdrops:{type: [String], require: true},
    reviewIds: { type: [{ type: Schema.Types.ObjectId, ref: 'Review' }], require: true }
});

module.exports = mongoos.model("Movie", movieSchema);