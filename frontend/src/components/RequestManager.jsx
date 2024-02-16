import React, { useState, useEffect } from "react";
import RequestInventory from "./RequestInventory/RequestInventory";
import Requests from "./Requests/Requests";
import axios from "axios";

const RequestManager = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <RequestInventory />
      <Requests requests={requests} />
    </div>
  );
};

export default RequestManager;
