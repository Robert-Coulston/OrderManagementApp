import React from "react";

import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Container>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link className="text-link" to="/">
                OrderManagement
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="Customers"
                sx={{ color: "white", my: 2, display: "block" }}
              >
                <Link className="text-link" to="/customers">
                  Customers
                </Link>
              </Button>
              <Button key="Orders" sx={{ color: "white", my: 2, display: "block" }}>
                <Link className="text-link" to="/orders">
                  Orders
                </Link>
              </Button>
              <Button key="NewCustomer" sx={{ color: "white", my: 2, display: "block" }}>
                <Link className="text-link" to="/customers/newCustomer">
                  New Customer
                </Link>
              </Button>
            </Box>
          </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
