import * as React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate, Link } from "react-router-dom";
import { createEvent } from "../../services/api_events";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";

const today = dayjs();
const tomorrow = dayjs().add(1, "day");

function CreateEvent() {
  const [eventData, setEventData] = React.useState({
    type: "",
    title: "",
    description: "",
    start_at: null,
    end_at: null,
    color: "",
    notify_at: [],
  });
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    setEventData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  const formatDateTime = (dateTime) => {
    return dateTime ? dayjs(dateTime).format("YYYY-MM-DD HH:mm:ss") : null;
  };

  const formatDateTimeNotify = (dateTime) => {
    return dateTime ? [dayjs(dateTime).format("YYYY-MM-DD HH:mm:ss")] : [];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const formattedData = {
        ...eventData,
        start_at: formatDateTime(eventData.start_at),
        end_at: formatDateTime(eventData.end_at),
        notify_at: formatDateTimeNotify(eventData.notify_at),
      };

      console.log(formattedData);
      const response = await createEvent(formattedData);
      console.log("Create event response:", response.data);
      setLoadingSubmit(false);
      navigate("/user/listEvent");
    } catch (error) {
      console.error("Error creating event:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setMessage("Failed to create event");
        setOpenAlert(true);
        setLoadingSubmit(false);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create Event
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="type"
            label="Type"
            name="type"
            value={eventData.type}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Start Date"
                value={eventData.start_at}
                onChange={(date) => handleDateChange(date, "start_at")}
              />
              <DateTimePicker
                label="End Date"
                value={eventData.end_at}
                onChange={(date) => handleDateChange(date, "end_at")}
              />
              <DateTimePicker
                label="Notify At"
                value={eventData.end_at}
                onChange={(date) => handleDateChange(date, "notify_at")}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loadingSubmit}
          >
            {loadingSubmit ? "Creating..." : "Create Event"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                component={Link}
                to="/user/listEvent"
                variant="text"
                color="primary"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
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
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CreateEvent;
