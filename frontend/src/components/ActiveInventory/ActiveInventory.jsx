import React, { useState, useEffect } from "react";
import "./ActiveInventory.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ActiveInventory = () => {
  const schoolName = localStorage.getItem("schoolName");
  const [inventoryData, setInventoryData] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          `https://schoolapi.sevabharath.com/api/inventory/${encodeURIComponent(
            schoolName
          )}`
        );
        console.log(response.data);
        setInventoryData(response.data);

        // Extract and store unique titles
        const uniqueTitles = Array.from(
          new Set(response.data.map((item) => item.title.trim()))
        );
        setTitles(uniqueTitles);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchInventoryData();
  }, [schoolName]);

  // console.log(inventoryData);
  // console.log(titles);

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
            const items = inventoryData
              .filter((item) => item.title === title)
              .sort(
                (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate)
              );
            if (items.length === 0) {
              return null;
            }

            const item = items[0]; // Selecting the latest item
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
