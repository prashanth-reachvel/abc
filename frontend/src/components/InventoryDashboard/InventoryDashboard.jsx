import React, { useState, useEffect } from "react";
import "./InventoryDashboard.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const InventoryDashboard = () => {
  const { schoolName } = useParams();
  const [inventoryData, setInventoryData] = useState(new Map());

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/inventory/${encodeURIComponent(
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
    <div>
      <div className="inventory-box">
        <div className="inventory-top-row">
          <h3 className="inventory-heading">Active Inventory</h3>
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
          {/* <div className="member-green-card">
            <p className="menber-plan-head">
              Flavoured Milk<br></br> Distribution
            </p>
            <div className="white-inner-box">
              <p className="school-green-text">Distributed : 3200</p>
              <p className="school-green-text">Available : 3200</p>
              <p className="school-green-text">Total : 3200</p>
            </div>
            <button className="add-menber-btn">update</button>
          </div>
          <div className="member-green-card">
            <p className="menber-plan-head">
              Uniform <br></br> Distribution
            </p>
            <div className="white-inner-box">
              <p className="school-green-text">Distributed : 3200</p>
              <p className="school-green-text">Available : 3200</p>
              <p className="school-green-text">Total : 3200</p>
            </div>
            <button className="add-menber-btn">update</button>
          </div>
          <div className="member-green-card">
            <p className="menber-plan-head">
              Education <br></br> Kits
            </p>
            <div className="white-inner-box">
              <p className="school-green-text">Distributed : 3200</p>
              <p className="school-green-text">Available : 3200</p>
              <p className="school-green-text">Total : 3200</p>
            </div>

            <button className="add-menber-btn">update</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
