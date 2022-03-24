import { useDispatch, useSelector } from "react-redux";
import UserForm from "../components/form";
import Graph from "../components/graph";
import UserTable from "../components/userTable";
import Box from '@mui/material/Box';
import { AppBar, Typography } from "@mui/material";
import { Navigate } from 'react-router-dom';
import { defineUser } from "../toolkitRedux/userSlice";
import Button from '@mui/material/Button';
import {Container, Row, Col} from "react-bootstrap";

export default function Logic() {
    const dispatch = useDispatch();

    const radius = useSelector(state => state.toolkit.radius);
    const dotsArr = useSelector(state => state.toolkit.dots);
    const username = useSelector(state => state.userSlice.username);

    if (username === 'initial_username') {
        return (
            < Navigate to="/login" />
        )
    }

    function handleLogOut() {
        dispatch(defineUser("initial_username"))
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
        <Button style={{marginTop: '5px', marginLeft: '10px'}} variant="outlined" onClick={handleLogOut}>Log Out</Button>

        <Container >
            <Row>
                <Col><Graph radius={radius} dotsArr={dotsArr} /></Col>
                <Col><UserForm /></Col>
                <Col><UserTable/></Col>
            </Row>
        </Container>

        
        </>
    )
}
