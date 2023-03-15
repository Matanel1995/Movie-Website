const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const Movie = require("../models/Movie");
const tokenVerify = require('../verifyToken')

//Get all movies

router.get("/all", async (req, res) => {
    try{
        console.log("in all movies function!");
        const Movies = await Movie.find(); // get all movies.
        res.status(200).json(Movies); // return ok status and the movies in JSON 
        
    }catch(err){
        console.log(err);
        res.status(500).json(err); // return internal server error and the error message
    }
})

// Get all faviorite movies

router.get("/allFav", async (req, res) => {
    try{
        console.log("in all  favorite movies function!");
        const favMovies = await Movie.find({isFav: true}); // get all movies.
        res.status(200).json(favMovies); // return ok status and the movies in JSON 
        
    }catch(err){
        console.log(err);
        res.status(500).json(err); // return internal server error and the error message
    }
})

// Get movie by imdbId

router.get(`/:movieId`, async (req, res) => {
    try{
        console.log("in specific movies function!");
        const favMovies = await Movie.find({imdbId: req.params.movieId}); // get all movies.
        res.status(200).json(favMovies); // return ok status and the movies in JSON 
        
    }catch(err){
        console.log(err);
        res.status(500).json(err); // return internal server error and the error message
    }
})



module.exports = router;