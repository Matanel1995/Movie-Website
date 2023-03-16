import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom";
import './MoviePage.css'
import Trailer from '../componnents/trailer/Trailer';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';

import React from 'react'

const MoviePage = ({ getSingleMovie, movie, reviews, setReviews }) => {

    const [posterIndex, setPosterIndex] = useState(0);

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    // Change poster every 3 second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setPosterIndex(prevIndex => (prevIndex + 1) % movie[0]?.backdrops.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [movie]);

    //when getting into this page this function will provoke and fetch the data on that movie
    useEffect(() => {
        getSingleMovie(movieId);
    }, [])


    //Add review to specific movie


    return (
        <div className='MoviePage'>
            <h1></h1>
            <div className='movie-backgroun-image'>
                <img src={movie && movie[0]?.backdrops[posterIndex]} alt="" />
            </div>
            <div className='movie-poster-moviePage'>
                <img src={movie && movie[0]?.poster} alt='' />
            </div>
            <div className='movie-title-moviePage'>
                <h1>{movie && movie[0]?.title}</h1>
                <h2>Watch trailer:</h2>
            </div>
            <div className='tralier-container'>
                <ReactPlayer 
                className = "react-player"
                url={movie && movie[0]?.trailerLink}
                width = "1024px"
                height= "540px"/>
            </div>
            <div className='reviews'>
                <h2>Reviews:</h2>
            </div>
        </div>
    )
}

export default MoviePage