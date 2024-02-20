import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Signin from "./components/Signin/Signin";
import ActiveInventory from "./components/ActiveInventory/ActiveInventory";
import Requests from "./components/Requests/Requests";
import Home from "./components/Home/Home";
import RequestInventory from "./components/RequestInventory/RequestInventory";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar"; // Import the Sidebar component
import UpdateInventory from "./components/UpdateInventory/UpdateInventory";
import Register from "./components/Register/Register";
import InventoryDashboard from "./components/InventoryDashboard/InventoryDashboard";
import RecentUpdates from "./components/RecentUpdates/RecentUpdates";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [schoolName, setSchoolName] = useState("");

  console.log(schoolName);

  // Update localStorage whenever login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Function to handle successful login
  const handleLogin = (schoolName) => {
    setIsLoggedIn(true);
    setSchoolName(schoolName);
    // navigate("/home", { state: { schoolName } });
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setSchoolName("");
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <BrowserRouter>
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        schoolName={schoolName}
      />
      <div style={{ display: "flex" }}>
        {/* Render the Sidebar only if logged in and not on the sign-in page */}
        {isLoggedIn && (
          <Sidebar
            onLogout={handleLogout}
            schoolName={schoolName}
            navigateTo={navigateTo}
          />
        )}
        <Routes>
          <Route path="/" element={<Signin onLogin={handleLogin} />} />
          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <Home schoolName={schoolName} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/active-inventory"
            element={
              isLoggedIn ? (
                <ActiveInventory schoolName={schoolName} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/requests"
            element={isLoggedIn ? <Requests /> : <Navigate to="/signin" />}
          />
          <Route
            path="/request-inventory"
            element={
              isLoggedIn ? <RequestInventory /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/update-inventory/:school/:title"
            element={<UpdateInventory />}
          />
          <Route
            path="/inventorydb/:schoolName"
            element={<InventoryDashboard />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/recent-updates"
            element={<RecentUpdates schoolName={schoolName} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
