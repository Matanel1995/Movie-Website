import { useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom';

import React from 'react'

const MoviePage = ({ getSingleMovie, movie, reviews, setReviews }) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    //when getting into this page this function will provoke and fetch the data on that movie
    useEffect(() => {
        getSingleMovie(movieId);
    }, [])


    //Add review to specific movie


    return (
        <div className='MoviePage'>
            <h1>TEST IF WORKING</h1>
        </div>
    )
}

export default MoviePage