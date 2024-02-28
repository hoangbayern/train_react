import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import thư viện Link

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React Train
        </Typography>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="/login" color="inherit">Login</Button>
        <Button component={Link} to="/register" color="inherit">Register</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
