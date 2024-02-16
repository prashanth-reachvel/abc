import React from "react";
import ActiveInventory from "../ActiveInventory/ActiveInventory";
import Requests from "../Requests/Requests";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { schoolName } = useLocation().state;

  console.log(schoolName);

  return (
    <div className="home-main-container">
      <ActiveInventory schoolName={schoolName} />
      <Requests />
    </div>
  );
};

export default Home;
