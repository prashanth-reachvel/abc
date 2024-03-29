import React, { useEffect, useState } from "react";
import "./RecentUpdates.css";
import axios from "axios";

const RecentUpdates = ({ school, title }) => {
  const [updates, setUpdates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // console.log(school);
  // console.log(title);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get(
          `https://schoolapi.sevabharath.com/api/updates/${encodeURIComponent(
            school
          )}/${encodeURIComponent(title)}?limit=5`
        );
        setUpdates(response.data);
      } catch (err) {
        console.error("Error fetching updates:", err);
      }
    };

    fetchUpdates();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  // console.log(updates);

  const filteredUpdates = updates.filter((update) => {
    const updateDate = new Date(update.updatedDate);
    return (
      (!selectedDate ||
        updateDate.toISOString().split("T")[0] === selectedDate) &&
      (!searchQuery ||
        (update.title &&
          update.title.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  });

  return (
    <div className="inventory-box top-gap">
      <div className="inventory-top-row">
        <h3 className="inventory-heading">Recent Updates</h3>
        <div className="date-search-input-container">
          <input
            className="date-filter date-input"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <div className="search-update">
            <div className="school-db-search">
              <input
                type="search"
                className="search-input"
                placeholder="Search here"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      <table className="school-table">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Inventory</th>
            <th>Qty</th>
            <th>Date</th>
            <th>Remarks</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {filteredUpdates.map((update, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{update.title}</td>
              {/* <td>{update.newTotalQuantity}</td> */}
              <td
                className={
                  update.source === update.school ? "negative" : "positive"
                }
              >
                {update.source === update.school ? "-" : "+"}{" "}
                {update.newTotalQuantity}
              </td>
              <td>{update.updatedDate}</td>
              <td>{update.reason}</td>
              <td>{update.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentUpdates;
