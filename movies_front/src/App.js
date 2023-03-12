import { Route ,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/register" element={<SignUpPage/>} />
            </Routes>
        </>
    );
}

export default App;