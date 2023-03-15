import { Route, Routes } from 'react-router-dom';
import { useState } from "react";
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MoviePage from './pages/MoviePage';



const App = () => {

    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);

    // Function to recive data of specific movie (by movieID)

const getSingleMovie = async (movieId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/movies/${movieId}`);
        const data = await response.json();
        setMovie(data);
        setReviews(data.reviews);
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
                <Route path="/movies/:movieId" element ={<MoviePage getSingleMovie = {getSingleMovie} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            </Routes>
        </>
    );
}

export default App;