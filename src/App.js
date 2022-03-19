import { Routes, Route } from 'react-router-dom';
import Logic from './pages/logic';
import Login from './pages/login';
import Register from './pages/register';

export default function App() {

    

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logic" element={<Logic />} />
            </Routes>
        </>
    );
}