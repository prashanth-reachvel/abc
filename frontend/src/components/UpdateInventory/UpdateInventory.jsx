import React, { useState, useEffect } from "react";
import "./UpdateInventory.css";
import RecentUpdates from "../RecentUpdates/RecentUpdates";
import axios from "axios";
import qs from "qs";
import { useParams } from "react-router-dom";

const UpdateInventory = () => {
  const { school, title } = useParams();
  const [updatedDate, setUpdatedDate] = useState("");
  const [reason, setReason] = useState("");
  const [totalAddQuantity, setTotalAddQuantity] = useState(0);
  const [newTotalQuantity, setNewTotalQuantity] = useState(0);
  const [updatedBy, setUpdatedBy] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newAvailable, setNewAvilable] = useState(0);
  const [newDistributed, setNewDistributed] = useState(0);
  const source = school;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedTitle = encodeURIComponent(title);
        const response = await axios.get(
          `https://schoolapi.sevabharath.com/api/inventory/${school}/${encodedTitle}`
        );
        console.log(response.data);
        const { updatedDate, totalAddQuantity, available, distributed } =
          response.data;
        setNewAvilable(available);
        setNewDistributed(distributed);
        setUpdatedDate(updatedDate);
        setTotalAddQuantity(parseInt(totalAddQuantity));
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchData();
  }, [school, title]);

  const handleNewTotalQuantityChange = (value) => {
    if (parseInt(value) > newAvailable) {
      setErrorMessage("Please enter less than or equal to the Available Qty");
    } else if (parseInt(value) < 0) {
      setErrorMessage("Please enter the value greater the zero");
    } else {
      setErrorMessage("");
    }
    setNewTotalQuantity(value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(newTotalQuantity) > newAvailable) {
      setErrorMessage("Please enter less than or equal to the Available Qty");
      return;
    }

    try {
      const newTotal = newAvailable - parseInt(newTotalQuantity);
      await axios.post(
        `https://schoolapi.sevabharath.com/api/updateinventory/${school}/${title}`,
        {
          school,
          title: title.trim(),
          updatedDate,
          newTotalQuantity,
          totalAddQuantity,
          available: newTotal,
          distributed: parseInt(newDistributed) + parseInt(newTotalQuantity),
          reason,
          source,
          updatedBy,
        }
      );

      await axios.post(
        `https://schoolapi.sevabharath.com/api/inventory/${school}/${title}`,
        {
          totalAddQuantity,
          available: newTotal,
          distributed: parseInt(newDistributed) + parseInt(newTotalQuantity),
        }
      );
      console.log("Data Updated Successfully");
      setUpdatedDate("");
      setTotalAddQuantity(totalAddQuantity); // Update totalAddQuantity with the new total
      setNewAvilable(newTotal);
      setNewDistributed(parseInt(newDistributed) + parseInt(newTotalQuantity));
      window.location.reload(); // Reload the page
      alert("Request Updated Successfully");
    } catch (error) {
      console.error("Error updating inventory data:", error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2 className="update-inventory-heading" style={{ fontSize: "20px" }}>
          Flavoured Milk
        </h2>
        <form className="input-container" onSubmit={handleSubmit}>
          <div className="first-container">
            <div className="date-container">
              <label>Date :</label>
              <input
                type="date"
                className="date-input"
                onChange={(e) => setUpdatedDate(e.target.value)}
                required
              />
            </div>
            <div className="reason-container">
              <label>Reason :</label>
              <input
                type="text"
                className="reason input"
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="second-container">
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                className="quantity"
                placeholder={`Available Qty: ${newAvailable}`}
                // value={newTotalQuantity}
                onChange={(e) => handleNewTotalQuantityChange(e.target.value)}
                required
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div>
              <label>Updated By :</label>
              <input
                type="text"
                className="updated-by inp"
                onChange={(e) => setUpdatedBy(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="submit-btn-container">
            <button type="submit" className="submit-btn">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <RecentUpdates school={school} title={title} />
    </div>
  );
};

export default UpdateInventory;
