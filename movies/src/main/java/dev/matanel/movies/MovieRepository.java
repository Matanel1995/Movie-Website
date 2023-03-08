package dev.matanel.movies;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.io.ObjectInput;
import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends MongoRepository<Movie, ObjectInput> {
    Optional<Movie> findMovieByImdbId(String imdbId);
    Optional<Movie> findMovieByTitle(String title);
    Optional<List<Movie>> findMoviesByIsFav(Boolean fav);
}
