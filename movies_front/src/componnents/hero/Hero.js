import React from 'react'
import './Hero.css'
import Carousel from 'react-material-ui-carousel';
import { Button, Paper } from '@mui/material';
import {Link, useNavigate} from "react-router-dom";


const Hero = ({ favMovies }) => {

    const navigate = useNavigate();

    function toMoviePage(movieId)
    {
        navigate(`/movies/${movieId}`);
    }

        return (
            <div className='movie-carousel-container'>
                <Carousel>
                    {
                        favMovies.map((movie) => {
                            return (
                                <Paper>
                                    <div className='movie-card-container'>
                                        <div className='movie-card' style={{ "--img": `url(${movie.backdrops[0]})` }}>
                                            <div className='movie-detail'>
                                                <div className='movie-poster'>
                                                    <img src={movie.poster} alt='' />
                                                </div>
                                                <div className='movie-title'>
                                                    <h4>{movie.title}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            )
                        })
                    }
                </Carousel>
            </div>
        )
    }

export default Hero