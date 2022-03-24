import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { defineUser } from '../toolkitRedux/userSlice';
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Login from "./login"
import Box from '@mui/material/Box';
import { AppBar, Typography } from "@mui/material";

export default function Register() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");

    const[error, setError] = useState("");

    if(useSelector(item => item.userSlice.username) !== 'initial_username') {
        return (
            <Navigate to="/logic" />
        )
    }

    async function sendRequest(user) {
        let url = "http://localhost:8080/api/register"
        let response = await fetch (url, {
            method  :   "POST",
            headers :   {
                "Content-Type"  :   "application/json;charset=utf-8"
            },
            body    :   JSON.stringify(user)

        })
        if (response.status === 400) {
            setError("user already exists");
        } else {
            dispatch(defineUser(username));
        }
        
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        if (password !== repPassword) {
            setError("passwords don't match");
        } else {
            let user = {
                username    :   username,
                password    :   password
            }
            sendRequest(user);
        }
    }
    
    return (
        <>
        <header>
            <AppBar position="static" style={{height: 50}}>
                <Box 
                    sx={{
                    display: 'grid',
                    gridAutoFlow: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                    
                }}>
                    <Box sx={{gridColumn: '1', gridRow: '1/1'}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                            P3214
                        </Typography>
                    </Box>
                    <Box sx={{gridColumn: '2', gridRow: '1/1'}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                            Панчук Максим
                        </Typography>
                    </Box>
                    <Box sx={{gridColumn: '3', gridRow: '1/1'}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                            Lab 4
                        </Typography>
                    </Box>
                </Box>
            </AppBar>
        </header>
        <Container className="col-3" style={{ marginTop: '100px'}}>  
        <Form onSubmit={handleSubmit}>
            <h3>Регистрация</h3>
            <div className="text-danger">{error}</div>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="enter username" 
                    onChange={(event) => setUsername(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="enter your password" 
                    onChange={(event) => setPassword(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control type="password" placeholder="repeat your password" 
                    onChange={(event) => setRepPassword(event.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
            <Link style={{ marginLeft: "20px"}} to="/login" element={<Login />}>Login</Link>
        </Form>
        </Container>
        </>
        )
}