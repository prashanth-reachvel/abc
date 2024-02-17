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
  const source = school;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedTitle = encodeURIComponent(title);
        const response = await axios.get(
          `https://mernbackendapp-4hcd.onrender.com/api/inventory/${school}/${encodedTitle}`
        );
        const { updatedDate, totalAddQuantity } = response.data;
        setUpdatedDate(updatedDate);
        setTotalAddQuantity(parseInt(totalAddQuantity));
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchData();
  }, [school, title]);

  const handleNewTotalQuantityChange = (value) => {
    if (parseInt(value) > totalAddQuantity) {
      setErrorMessage("Please enter less than or equal to the Available Qty");
    } else {
      setErrorMessage("");
    }
    setNewTotalQuantity(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(newTotalQuantity) > totalAddQuantity) {
      setErrorMessage("Please enter less than or equal to the Available Qty");
      return;
    }

    try {
      const newTotal = totalAddQuantity - parseInt(newTotalQuantity);
      await axios.post(
        `https://module-api.vercel.app/api/updateinventory/${school}/${title}`,
        {
          school,
          title,
          updatedDate,
          newTotalQuantity,
          totalAddQuantity: newTotal,
          available: newTotal,
          distributed: newTotalQuantity,
          reason,
          source,
          updatedBy,
        }
      );

      await axios.post(
        `https://mernbackendapp-4hcd.onrender.com/api/inventory/${school}/${title}`,
        {
          totalAddQuantity: newTotal,
          available: newTotal,
          distributed: newTotalQuantity,
        }
      );
      console.log("Data Updated Successfully");
      setUpdatedDate("");
      setTotalAddQuantity(totalAddQuantity); // Update totalAddQuantity with the new total
      window.location.reload(); // Reload the page
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
              />
            </div>
            <div className="reason-container">
              <label>Reason :</label>
              <input
                type="text"
                className="reason input"
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
          <div className="second-container">
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                className="quantity"
                placeholder={`Available Qty: ${totalAddQuantity}`}
                // value={newTotalQuantity}
                onChange={(e) => handleNewTotalQuantityChange(e.target.value)}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div>
              <label>Updated By :</label>
              <input
                type="text"
                className="updated-by inp"
                onChange={(e) => setUpdatedBy(e.target.value)}
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
      <RecentUpdates />
    </div>
  );
};

export default UpdateInventory;
