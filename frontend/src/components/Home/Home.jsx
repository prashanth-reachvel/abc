import React from "react";
import ActiveInventory from "../ActiveInventory/ActiveInventory";
import Requests from "../Requests/Requests";
import { useLocation } from "react-router-dom";

const Home = ({ schoolName }) => {
  // const { state } = useLocation();
  // const schoolName = state ? state.schoolName : null;

  console.log(schoolName);

  return (
    <div className="home-main-container">
      <ActiveInventory schoolName={schoolName} />
      <Requests schoolName={schoolName} />
    </div>
  );
};

export default Home;
