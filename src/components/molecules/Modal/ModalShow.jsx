import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Grid, Button } from '@mui/material';

export default function ModalShow({ open, handleClose, dataUpdate }) {
  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

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

  const handleCloseModalShow = () => {
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
          Show User
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={name}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type='email'
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address}
              disabled
            />
          </Grid>
          <Grid item xs={12} align="right">
            <Button variant="contained" color="secondary" onClick={handleCloseModalShow} sx={{ marginRight: '10px' }}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
