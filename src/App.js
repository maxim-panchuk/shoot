import { Routes, Route } from 'react-router-dom';
import Logic from './pages/logic'

export default function App() {

    return (
        <>
            <header>
            <h1>jlskfdgj</h1>
            <a href="/main">logic</a>
            </header>
            

            <Routes>
                <Route path="/main" element={<Logic />}/>
            </Routes>
        </>
    );
}