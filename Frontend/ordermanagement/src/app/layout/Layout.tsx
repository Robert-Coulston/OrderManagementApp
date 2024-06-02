import React from 'react';
import NavBar from './nav/NavBar';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

interface Props {
    // Define the props for your component here
}

const Layout: React.FC<Props> = (props) => {
    return (
        <>
            <NavBar />
            <Container sx={{p: '2rem'}}>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;