import React from "react";

const MovieCard = ({movie}) => {
    return(
        <div className="movie">
            <div>
                <p>{movie.releaseDate}</p>
            </div>

            <div>
                <img src={movie.poster} alt={movie.title}/>
            </div>

            <div>
                <span>{movie.genres[0]}</span>
                <h3>{movie.title}</h3>
            </div>
        </div>
    );
}

export default MovieCard;