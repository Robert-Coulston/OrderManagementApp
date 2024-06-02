import React from "react";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"; 
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    noWrap 
                    sx={{ 
                        mr: 2, 
                        display: { xs: "none", md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight:700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none' }}><Link to="/">Order Management App</Link>
                </Typography>
                <Box sx={{ flexGrow: 1, display: {xs:'none', md:'flex'} }}>
                    <Button 
                        key="Customers" 
                        sx={{ color: 'white', my:2, display: 'block'}}>
                        <Link to="/customers">Customers</Link>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
