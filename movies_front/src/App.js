import { Route, Routes } from 'react-router-dom';
import { useState } from "react";
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MoviePage from './pages/MoviePage/MoviePage';



const App = () => {

    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);

    // Function to recive data of specific movie (by movieID)

const getSingleMovie = async (movieId) => {
    try {
        const response = await fetch(`https://movie-back-oghj.onrender.com/api/movies/${movieId}`);
        const data = await response.json();
        console.log(data);
        setMovie(data);
    } catch (err) {
        console.log(err);
    }
}


    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/movies/:movieId" element ={<MoviePage getSingleMovie = {getSingleMovie} movie={movie}/>}></Route>
            </Routes>
        </>
    );
}

export default App;