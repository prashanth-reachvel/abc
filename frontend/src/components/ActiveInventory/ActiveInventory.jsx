import React, { useState, useEffect } from "react";
import "./ActiveInventory.css";
import Sidebar from "../Sidebar/Sidebar";
import Requests from "../Requests/Requests";
import { Link } from "react-router-dom";
import axios from "axios";

const ActiveInventory = () => {
  const schoolName = localStorage.getItem("schoolName");
  const [inventoryData, setInventoryData] = useState(new Map());

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          `https://schoolapi.sevabharath.com/api/inventory/${encodeURIComponent(
            schoolName
          )}`
        );
        console.log(response.data);

        // Update the inventory data map
        const newInventoryData = new Map(inventoryData);
        response.data.forEach((item) => {
          newInventoryData.set(item.title, item);
        });

        setInventoryData(newInventoryData);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchInventoryData();
  }, [schoolName]);

  return (
    <div className="active-inventory-main-container">
      {/* <Sidebar /> */}
      <div className="inventory-box">
        <div className="inventory-heading-btn-container">
          <h3 className="inventory-heading">Active Inventory</h3>
          <Link to={`/inventorydb/${schoolName}`}>
            <button className="inventory-viewall-btn">VIEW ALL</button>
          </Link>
        </div>
        <div className="membership-cards">
          {[...inventoryData.values()].map((item, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveInventory;
