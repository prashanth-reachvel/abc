import React, { useState, useEffect } from "react";
import "./ActiveInventory.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ActiveInventory = () => {
  const schoolName = localStorage.getItem("schoolName");
  const [inventoryData, setInventoryData] = useState([]);
  const [titles, setTitles] = useState([]);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get(
        `https://schoolapi.sevabharath.com/api/inventory/${encodeURIComponent(schoolName)}`
      );
      console.log(response.data);
      setInventoryData(response.data);
      setTitles(response.data.map((item) => item.title)); // Use the titles from the response
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  console.log(inventoryData[0]);

  return (
    <div className="active-inventory-main-container">
      <div className="inventory-box">
        <div className="inventory-heading-btn-container">
          <h3 className="inventory-heading">Active Inventory</h3>
          <Link to={`/inventorydb/${schoolName}`}>
            <button className="inventory-viewall-btn">VIEW ALL</button>
          </Link>
        </div>
        <div className="membership-cards">
          {titles.map((title, index) => {
            let items = inventoryData
              .filter((item) => item.title === title)
              .sort(
                (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate)
              );

            if (items.length === 0) {
              // Find the next latest item for this title
              const previousItems = inventoryData
                .filter((item) => item.title === title)
                .sort(
                  (a, b) => new Date(a.updatedDate) - new Date(b.updatedDate)
                );
              if (previousItems.length > 0) {
                items = [previousItems[previousItems.length - 1]];
              }
            }

            if (items.length === 0) {
              return null;
            }

            const item = items[0]; // Selecting the latest item
            console.log(items);
            console.log(item);
            return (
              <div className="member-green-card" key={index}>
                <p className="menber-plan-head">{item.title}</p>
                <div className="white-inner-box">
                  <p className="school-green-text">
                    Distributed : {item.distributed}
                  </p>
                  <p className="school-green-text">
                    Available : {item.available}
                  </p>
                  <p className="school-green-text">
                    Total : {item.totalAddQuantity}
                  </p>
                </div>
                <Link
                  to={`/update-inventory/${encodeURIComponent(
                    item.school
                  )}/${encodeURIComponent(item.title)}`}
                >
                  <button className="add-menber-btn">Update</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActiveInventory;
