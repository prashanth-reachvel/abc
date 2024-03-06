import React, { useState, useEffect } from "react";
import "./ActiveInventory.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ActiveInventory = () => {
  const schoolName = localStorage.getItem("schoolName");
  const [inventoryData, setInventoryData] = useState([]);
  const [titles, setTitles] = useState([]);

  console.log(schoolName);

  // const fetchInventoryData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://schoolapi.sevabharath.com/api/inventory/${encodeURIComponent(schoolName)}`
  //     );
  //     console.log(response.data);
  //     setInventoryData(response.data);
  //     setTitles(response.data.map((item) => item.title)); // Use the titles from the response
  //   } catch (error) {
  //     console.error("Error fetching inventory data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchInventoryData();
  // }, []);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          `https://schoolapi.sevabharath.com/api/inventory/${schoolName}`
        );
        console.log(response.data);
        const uniqueTitles = Array.from(
          new Set(response.data.map((item) => item.title))
        );
        const uniqueInventoryData = uniqueTitles.map((title) => {
          const latestItem = response.data
            .filter((item) => item.title === title)
            .sort((a, b) => {
              const dateA = new Date(a.updatedDate || a.createdDate);
              const dateB = new Date(b.updatedDate || b.createdDate);
              return dateB - dateA;
            })[0];
          return latestItem;
        });
        setInventoryData(uniqueInventoryData);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchInventoryData();
  }, [schoolName]);

  console.log(inventoryData);

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
          {inventoryData.map((item, index) => {
            if (!item) {
              // Handle null items (items that were filtered out)
              return (
                <div className="member-green-card" key={index}>
                  <p className="menber-plan-head">No data available</p>
                </div>
              );
            }

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
