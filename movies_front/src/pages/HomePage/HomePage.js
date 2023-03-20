import { useState, useEffect } from "react";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate , useLocation} from "react-router-dom";
import './HomePage.css'
import Header from '../../componnents/header/Header'
import MovieCard from "../../componnents/MovieCard";
import SearchIcon from '../../Photos/search.svg';
import Hero from "../../componnents/hero/Hero";


const HomePage = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [favMovies, setFavMovies] = useState([]);
    const location = useLocation();

    //Functions


    let navigate = useNavigate();
    const routeChange = (newPath) => {
        let path = newPath;
        navigate(path);
    }

    const getMovies = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/movies/all');
            const data = await response.json();
            setMovies(data);
        } catch (err) {
            console.log(err);
        }
    }

    const getFavMovies = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/movies/allFav");
            console.log(response);
            const data = await response.json();
            console.log(data);
            setFavMovies(data);
            console.log("favMovies length: ", favMovies.length);
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
    }, [searchTerm]);

    useEffect(() => {
        getMovies();
    }, [location.pathname]);


    useEffect(() => {
        getFavMovies();
    }, []);

    const handleKeyDown = (event) => {

        handleSearch();
    };

    const movieList = searchResults.length > 0 || searchTerm !== '' ? searchResults : movies;

    return (
        <div className="app">
            <Header />
            <div className="without-header">
                <div onClick={() => {}}>
                    <h1>Movies App</h1>
                </div>
                {
                    favMovies?.length > 0 ?
                        (<Hero favMovies={favMovies} />)
                        : (<h2>Add movies to favarites to see them here!</h2>)
                }

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
                                    <MovieCard key={uuidv4()} movie={movie} onClick = { () => {routeChange(`/movies/${movie.imdbId}`)}}/>
                                ))}
                            </div>
                        ) : (
                            <div className="empty">
                                <h2>No movies found</h2>
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default HomePage;