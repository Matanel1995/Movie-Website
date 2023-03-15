package dev.matanel.movies.service;

import dev.matanel.movies.repository.MovieRepository;
import dev.matanel.movies.entity.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


//In this class i will write the database access methods

@Service
public class MovieService {
    @Autowired //the framework will instantiate the movieRepository for us
    private MovieRepository movieRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<Movie> allMovies(){
        return movieRepository.findAll();
    }
    public Optional<Movie> singleMovieByImdbid(String imdbId){return movieRepository.findMovieByImdbId(imdbId);}
    public Optional<Movie> singleMovieByTitle(String title){return movieRepository.findMovieByTitle(title);}
    public  Optional<List<Movie>> movieByIsFav(Boolean isFav){ return  movieRepository.findMoviesByIsFav(isFav);}
}
