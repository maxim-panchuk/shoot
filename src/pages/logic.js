import { useSelector } from "react-redux";
import UserForm from "../components/form";
import Graph from "../components/graph";
import UserTable from "../components/userTable";
import Box from '@mui/material/Box';
import { AppBar, Typography } from "@mui/material";
import { Navigate } from 'react-router-dom';

export default function Logic() {
    const radius = useSelector(state => state.toolkit.radius);
    const dotsArr = useSelector(state => state.toolkit.dots);
    const username = useSelector(state => state.userSlice.username);
    if (username === 'initial_username') {
        return (
            < Navigate to="/login" />
        )
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

        <Box 
            sx={{
                display: 'grid',
                gridAutoFlow: 'row',
                marginTop: 3
            }}>
            <Box sx={{gridColumn: '1', gridRow: '1/1'}}><Graph radius={radius} dotsArr={dotsArr} /></Box>
            <Box sx={{gridColumn: '2', gridRow: '1/1'}}><UserForm /></Box>
            <Box sx={{gridColumn: '3', gridRow: '1/1'}}><UserTable /></Box>
        </Box>
        </>
    )
}
