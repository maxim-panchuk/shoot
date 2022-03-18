import { useDispatch, useSelector } from "react-redux";
import { defineUser } from "../toolkitRedux/userSlice";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { defineDots } from "../toolkitRedux/toolkitSlice";

export default function Login() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const usr = useSelector(item => item.userSlice.username);
    console.log(usr)

    if(usr !== 'initial_username') {
        return (
            <Navigate to="/logic" />
        )
    }

    async function sendRequest(user) {
        let url = "http://localhost:8080/api/login"
        const response = await fetch (url, {
            method  :   "POST",
            headers :   {
                "Content-Type"  :   "application/json;charset=utf-8"
            },
            body    :   JSON.stringify(user)

        }).then(response => response.json());

        if (response.status !== 400) {
            dispatch(defineUser(username));
            dispatch(defineDots(response));
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
            <Container className="col-3" style={{ marginTop: '100px'}}>
            <Form onSubmit={handleSubmit}>
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
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            </Container>
            
        )
    
}