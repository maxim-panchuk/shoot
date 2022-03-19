import { Routes, Route, Link } from 'react-router-dom';
import Logic from './pages/logic';
import Login from './pages/login';
import Register from './pages/register';

export default function App() {

    

    return (
        <>
            <Link to="/login" element={<Login/>}>Login</Link>
            <Link to="/register" element={<Register />}>Register</Link>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logic" element={<Logic />} />
            </Routes>
        </>
    );
}