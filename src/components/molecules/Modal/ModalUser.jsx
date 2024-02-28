import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Grid, Button } from '@mui/material';
import { createUser } from '../../../services/api_user';

export default function ModalUser({ open, handleClose, fetchData }) {
  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const resetData = () => {
    setUserName('');
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setAddress('');
  };

  const validateFields = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError(true);
      setUsernameErrorMessage('Please enter a username.');
      isValid = false;
    }
    if (!name.trim()) {
      setNameError(true);
      setNameErrorMessage('Please enter a name.');
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError(true);
      setEmailErrorMessage('Please enter an email.');
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError(true);
      setPasswordErrorMessage('Please enter a password.');
      isValid = false;
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const dataBody = {
        username,
        name,
        email,
        password,
        phone,
        address
      };
      const response = await createUser(dataBody);

      if (response.status === 201) {
        handleClose();
        resetData();
        fetchData();
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleCloseModal = () => {
    handleClose();
    resetData();
    setUsernameErrorMessage('');
    setNameErrorMessage('');
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    setUsernameError(false);
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
  }

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 400,
          maxWidth: 600,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Create User
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              error={usernameError}
              onChange={(e) => {
                setUserName(e.target.value);
                setUsernameError(false);
                setUsernameErrorMessage('');
              }}
            />
            {usernameErrorMessage && <p className='errorMessage'>{usernameErrorMessage}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              error={nameError}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
                setNameErrorMessage('');
              }}
            />
            {nameErrorMessage && <p>{nameErrorMessage}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type='email'
              variant="outlined"
              fullWidth
              margin="normal"
              required
              error={emailError}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
                setEmailErrorMessage('');
              }}
            />
            {emailErrorMessage && <p>{emailErrorMessage}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type='password'
              variant="outlined"
              fullWidth
              margin="normal"
              required
              error={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
                setPasswordErrorMessage('');
              }}
            />
            {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} align="right">
            <Button variant="contained" color="secondary" onClick={handleCloseModal} sx={{ marginRight: '10px' }}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
