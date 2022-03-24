import { useDispatch, useSelector } from "react-redux";
import { defineUser } from "../toolkitRedux/userSlice";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Container } from "react-bootstrap";
import { defineDots } from "../toolkitRedux/toolkitSlice";
import { Link, Navigate } from 'react-router-dom'
import Register from "./register";

export default function Login() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const usr = useSelector(item => item.userSlice.username);

    if(usr !== 'initial_username') {
        return (
            <Navigate to="/logic" />
        )
    }

    async function sendRequest(user) {
        let url = "http://localhost:8080/api/login"
        let response = await fetch (url, {
            method  :   "POST",
            headers :   {
                "Content-Type"  :   "application/json;charset=utf-8"
            },
            body    :   JSON.stringify(user)
        }).then(response => response.json());

        if (response[0] !== null) {
            setError("");
            dispatch(defineUser(username));
            dispatch(defineDots(response));
        } else {
            setError("auth failed");
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        let user = {
            username    :   username,
            password    :   password
        }
        sendRequest(user);
    }

        return (
            <>
            <Container className="col-3" style={{ marginTop: '100px'}}>
            <Form onSubmit={handleSubmit}>
                <h3>Авторизация</h3>
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
                <Button variant="primary" type="submit">login</Button>
                <Link to="/register" element={<Register/>}>Register</Link>
            </Form>
            </Container>
            </>
        )
}