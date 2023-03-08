import { useState, useEffect } from "react";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import './App.css'

import MovieCard from "./MovieCard";
import SearchIcon from './Photos/search.svg'


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/movies');
            const data = await response.json();
            setMovies(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSearch = () => {
        const filtered = movies.filter(movie => {
            return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResults(filtered);
    };

    useEffect(() => {
        const filtered = movies.filter(movie => {
          return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResults(filtered);
      }, [searchTerm, movies]);

    useEffect(() => {
        console.log(movies);
    }, [movies]);

    useEffect(() => {
        getMovies();
    }, []);

    const handleKeyDown = (event) => {

        handleSearch();
    };

    const movieList = searchResults.length > 0 || searchTerm!=='' ? searchResults : movies;

    return (
        <div className="app">
            <h1>Movies App</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                    onKeyDown={handleKeyDown}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={handleSearch}
                />
            </div>

            {
                movieList?.length > 0
                    ? (
                        <div className="container">
                            {movieList.map((movie, index) => (
                                <MovieCard key={uuidv4()} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;