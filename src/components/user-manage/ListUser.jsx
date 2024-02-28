import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip, Button, Modal, Box, Typography, Grid, Alert, Snackbar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { deleteUser, fetchAllUser } from '../../services/api_user';
import ModalUser from '../molecules/Modal/ModalUser';
import ModalEditUser from '../molecules/Modal/ModalEditUser';
import ModalShow from '../molecules/Modal/ModalShow';
import { CSVLink } from 'react-csv';

const columns = [
  { field: 'user_id', headerName: 'ID', width: 100 },
  { field: 'username', headerName: 'UserName', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 300 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'address', headerName: 'Address', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    renderCell: (params) => (
      <>
        <Tooltip title="Show">
          <IconButton>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Update">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalShow, setOpenModalShow] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [dataUpdate, setDataUpdate] = useState([]);

    const fetchData = async () => {
      try {
        const response = await fetchAllUser();
        // console.log(response);
        const usersWithIds = response.data.Items.map((user) => ({
          ...user,
          id: user.user_id,
        }));
        setRows(usersWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  useEffect(()=> {
    fetchData();
  }, []);

  const handleCreateUser = () => {
    setOpenModal(true);
  };

  const handleOpenModalEdit = (data) => {
    // console.log(data);
    setOpenModalEdit(true);
    setDataUpdate(data);
  }

  const handleOpenModalShow = (data) => {
    // console.log(data);
    setOpenModalShow(true);
    setDataUpdate(data);
  }

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUserId);

      setMessage('Delete User Successfully');
      handleCloseDeleteConfirmationModal();
  
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCloseAlert = ()=> {
    setOpenAlert(false);
  };

  const handleOpenDeleteConfirmationModal = (userId) => {
    setDeleteConfirmModalOpen(true);
    setSelectedUserId(userId);
  };
  
  const handleCloseDeleteConfirmationModal = () => {
    setDeleteConfirmModalOpen(false);
  };

  const headers = [
    { label: "ID", key: "id" },
    { label: "UserName", key: "username" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" }
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1>List User</h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleCreateUser}
        style={{ marginBottom: "1rem" }}
      >
        Create
      </Button>
      <Button
        variant="contained"
        startIcon={<DownloadIcon />}
        style={{ marginBottom: "1rem" }}
        sx={{ marginLeft: '1rem' }}
      >
        <CSVLink data={rows} headers={headers}>Export File</CSVLink>
      </Button>
      <ModalUser
        open={openModal}
        handleClose={() => setOpenModal(false)}
        fetchData={fetchData}
      />
      <ModalEditUser
        open={openModalEdit}
        handleClose={() => setOpenModalEdit(false)}
        dataUpdate={dataUpdate}
        fetchData={fetchData}
      />
      <ModalShow
        open={openModalShow}
        handleClose={() => setOpenModalShow(false)}
        dataUpdate={dataUpdate}
      />
      <Modal
        open={deleteConfirmModalOpen}
        onClose={handleCloseDeleteConfirmationModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
            maxWidth: 600,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this user?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDelete}
              >
                Yes
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseDeleteConfirmationModal}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          renderCell: (params) => {
            if (column.field === "actions") {
              return (
                <>
                  <Tooltip title="Show">
                    <IconButton onClick={() => handleOpenModalShow(params.row)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Update">
                    <IconButton onClick={() => handleOpenModalEdit(params.row)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() =>
                        handleOpenDeleteConfirmationModal(params.row.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              );
            }
            return params.value;
          },
        }))}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
