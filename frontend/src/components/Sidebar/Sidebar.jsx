import React, { useState } from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ onLogout, schoolName, navigateTo }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isInventoryDropdown, setIsInventoryDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState(""); // State to track active item

  const handleSignout = () => {
    setIsLoggedOut(true);
    onLogout();
  };

  if (isLoggedOut) {
    navigateTo("/");
  }

  const handleInventoryDropdown = () => {
    setIsInventoryDropdown(!isInventoryDropdown);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName); // Update active item when clicked
  };

  console.log(schoolName);

  return (
    <div className="sidebar-main-container">
      <div className="sidebar-inner-container">
        <NavLink
          to={{
            pathname: "/home",
            state: { schoolName },
          }}
          activeClassName="active-link"
        >
          <p
            className={`sidebar-items ${
              activeItem === "Home" && "active-item"
            }`}
            onClick={() => handleItemClick("Home")}
          >
            Home
          </p>
        </NavLink>
        <NavLink to="/active-inventory" activeClassName="active-link">
          <p
            className={`sidebar-items ${
              activeItem === "Inventory" && "active-item"
            }`}
            onClick={() => {
              handleInventoryDropdown();
              handleItemClick("Inventory");
            }}
          >
            Inventory
          </p>
        </NavLink>
        {isInventoryDropdown ? (
          <>
            <Link to="/active-inventory">
              <p
                className={`inventory-item ${
                  activeItem === "Active Inventory" && "active-item"
                }`}
                onClick={() => handleItemClick("Active Inventory")}
              >
                Active Inventory
              </p>
            </Link>
            <Link to="/update-inventory">
              <p
                className={`inventory-item update-inventory-item ${
                  activeItem === "Update Inventory" && "active-item"
                }`}
                onClick={() => handleItemClick("Update Inventory")}
              >
                Update Inventory
              </p>
            </Link>
          </>
        ) : (
          ""
        )}
        <NavLink
          to={`/request-inventory?schoolName=${schoolName}`}
          activeClassName="active-link"
        >
          <p
            className={`sidebar-items ${
              activeItem === "Request Inventory" && "active-item"
            }`}
            onClick={() => handleItemClick("Request Inventory")}
          >
            Request Inventory
          </p>
        </NavLink>
      </div>
      <button
        className="signout-button"
        onClick={() => {
          handleSignout();
          handleItemClick("signout");
        }}
      >
        Signout
      </button>
    </div>
  );
};

export default Sidebar;
