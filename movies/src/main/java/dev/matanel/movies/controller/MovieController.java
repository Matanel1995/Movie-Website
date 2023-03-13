package dev.matanel.movies.controller;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import dev.matanel.movies.entity.Movie;
import dev.matanel.movies.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/movies")
public class MovieController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private MovieService movieService;

    /// Function to get all movies from the DB
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies(){
        LOGGER.info("Got to all movies function");
        return new ResponseEntity<List<Movie>>(movieService.allMovies(),HttpStatus.OK);
    }

    /// Function to get single movie from the DB by its imdb ID
    @GetMapping("/imdbId/{imdbId}")
    public ResponseEntity<Optional<Movie>> getSingleMovieByImdbId(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Movie>>(movieService.singleMovieByImdbid(imdbId), HttpStatus.OK);
    }

    /// Function to get single movie from the DB by its title
    @GetMapping("/title/{title}")
    public  ResponseEntity<Optional<Movie>> getSingleMovieByTitle(@PathVariable String title){
        return new ResponseEntity<Optional<Movie>>(movieService.singleMovieByTitle(title), HttpStatus.OK);
    }

    /// Function to get all favorite movie from the DB
    @GetMapping("/favorite/{isFav}")
    public ResponseEntity<Optional<List<Movie>>> getMoviesByIsFav(@PathVariable Boolean isFav){
        return new ResponseEntity<Optional<List<Movie>>>(movieService.movieByIsFav(isFav), HttpStatus.OK);
    }
}
