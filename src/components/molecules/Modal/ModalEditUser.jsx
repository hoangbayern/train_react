import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Grid, Button } from '@mui/material';
import { updateUser } from '../../../services/api_user';

export default function ModalEditUser({ open, handleClose, dataUpdate,fetchData }) {
  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  useEffect(() => {
    if (dataUpdate) {
      setUserName(dataUpdate.username || '');
      setName(dataUpdate.name || '');
      setEmail(dataUpdate.email || '');
      setPhone(dataUpdate.phone || '');
      setAddress(dataUpdate.address || '');
    }
  }, [dataUpdate]);

//   const resetData = () => {
//     setUserName('');
//     setName('');
//     setEmail('');
//     setPhone('');
//     setAddress('');
//   };

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
        phone,
        address
      };
      const response = await updateUser(dataUpdate.id, dataBody);

      if (response.status === 200) {
        handleCloseModalEdit();
        fetchData();
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleCloseModalEdit = () => {
    handleClose();
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
          Edit User
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
              value={username}
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
              value={name}
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
              value={email}
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
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
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
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} align="right">
            <Button variant="contained" color="secondary" onClick={handleCloseModalEdit} sx={{ marginRight: '10px' }}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
