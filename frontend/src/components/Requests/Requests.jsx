import React, { useState, useEffect } from "react";
import "./Requests.css";
import axios from "axios";

const Requests = () => {
  const schoolName = localStorage.getItem("schoolName");
  const [requests, setRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  console.log(schoolName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://schoolapi.sevabharath.com/api/requests/${encodeURIComponent(
            schoolName
          )}?limit=5`
        );
        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchData();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRequests = requests.filter((request) => {
    return (
      (!selectedDate || request.date === selectedDate) &&
      (!searchQuery ||
        (request.inventory &&
          request.inventory
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (request.quantity &&
          request.quantity.toString().includes(searchQuery.toLowerCase())))
    );
  });

  return (
    <div className="requests-outer-box">
      <div className="requests-top-row">
        <p className="request-head">Requests</p>
        <div className="filter-right">
          {/* <select className="filter-field select-field">
            <option selected disabled>
              Filter
            </option>
            <option>Option1</option>
            <option>Option2</option>
          </select> */}
          <input
            type="date"
            className="filter-field date-field"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <div className="search-group">
            <input
              type="search"
              className="search-input"
              placeholder="Search here"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            {/* <button className="search-btn">Search</button> */}
          </div>
        </div>
      </div>
      {/* table start */}

      <table>
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Inventory</th>
            <th>Qty</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request, index) => (
            <tr key={index}>
              <td className="td-text-style">{index + 1}</td>
              <td>{request.inventory}</td>
              <td>{request.quantity}</td>
              <td>{new Date(request.date).toLocaleDateString()}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
