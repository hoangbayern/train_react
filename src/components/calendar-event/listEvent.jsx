import React, { useEffect, useState } from "react";
import { fetchAllEvent } from "../../services/api_events";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ListEvent() {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchAllEvent();
      const usersWithIds = response.data.data.data;
      //   console.log('>>> data event: ',usersWithIds);
      setRows(usersWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>List Event</h1>
      <Button component={Link} to="/user/createEvent" sx={{ backgroundColor: 'aliceblue' }} color="primary">
        Create Event
      </Button>
      {rows.map((row) => (
        <div key={row.id}>{row.title}</div>
      ))}
    </div>
  );
}
