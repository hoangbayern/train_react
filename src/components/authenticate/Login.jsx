import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Grid, Box, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { instanceAuth } from '../../services/api';
import { LoadingButton } from '@mui/lab';

function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token) {
      navigate('/user/list');
    } 
  }, []);

  const handleSubmit = async () => {

    setLoadingSubmit(true);

    try {
      const response = await instanceAuth.post('/login', {
        account: account,
        password: password
      });
      console.log('Login response:', response.data.status);
      if(response && response.data.status === 200) {
        localStorage.setItem("token", response.data.data.auth_token);
        setLoadingSubmit(false);
        navigate('/user/list');
        setLoginSuccess(true);
        setTimeout(() => {
            setLoginSuccess(false);
          }, 3000);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setMessage('Login Failed!');
        setOpenAlert(true);
        setLoadingSubmit(false);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email (customer-family2@dummy.com)"
            name="account"
            autoComplete="username"
            autoFocus
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
    
          <LoadingButton
            variant="contained"
            fullWidth
            loading={loadingSubmit}
            sx={{
              backgroundColor: '#1976d2',
              borderRadius: '5px',
              margin: '20px 0px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              '&:hover': {
                backgroundColor: '#7A7A7A',
                color: '#FFF',
                border: 'none',
              },
              '&.Mui-disabled': {
                backgroundColor: '#BABABA',
                border: 'none !important',
              },
            }}
            onClick={() => {
              handleSubmit();
            }}
            disabled={account === "" || password === ""}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {loginSuccess && (
            <Alert
              variant="filled"
              severity="success"
              sx={{ position: "fixed", top: 80, right: 10 }}
            >
              Login successfully!
            </Alert>
          )}
        </Box>
      </Box>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;
