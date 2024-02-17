import React, { useState } from "react";
import "./RequestInventory.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const RequestInventory = ({ addRequest }) => {
  const [otherOption, setOtherOption] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [inventory, setInventory] = useState("flavoured-milk");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [date, setDate] = useState();

  const handleOtherOption = (e) => {
    if (e.target.value === "Others") {
      setOtherOption(true);
      setInventory("Others");
    } else {
      setOtherOption(false);
      setInventory(e.target.value);
    }
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("schoolName", schoolName);
      formData.append("schoolId", schoolId);
      formData.append("inventory", inventory);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("date", date);
      selectedFiles.forEach((file, index) => {
        formData.append("fileInput", file);
      });

      const response = await axios.post(
        "https://mernbackendapp-4hcd.onrender.com/api/request",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      addRequest({
        inventory,
        quantity,
        date,
        status: "Pending",
      });

      // Clear all form fields after successful submission
      setSchoolName("");
      setSchoolId("");
      setInventory("flavoured-milk"); // Reset to default value
      setTitle("");
      setDescription("");
      setQuantity(0);
      setDate("");
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  // const handleSubmitRequest = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/request", {
  //       schoolName,
  //       schoolId,
  //       inventory,
  //       title,
  //       description,
  //       quantity,
  //       date,
  //       selectedFile,
  //     });
  //     console.log(response.data);
  //     addRequest({
  //       inventory,
  //       quantity,
  //       date,
  //       status: "Pending",
  //     });

  //     // Clear all form fields after successful submission
  //     setSchoolName("");
  //     setSchoolId("");
  //     setInventory("flavoured-milk"); // Reset to default value
  //     setTitle("");
  //     setDescription("");
  //     setQuantity(0);
  //     setDate("");
  //     setSelectedFile(null);
  //   } catch (error) {
  //     console.error("Error submitting request:", error);
  //   }
  // };

  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const updatedFiles = Array.from(files);
    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...updatedFiles,
    ]);
  };

  const handleFileCancel = (index) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  return (
    <div className="request-inventory-main-container">
      <div>
        <div className="inventory-box">
          <h2 className="request-inventory-heading">Request Inventory</h2>
          <form
            action="#"
            method="post"
            id="add-school-form"
            onSubmit={handleSubmitRequest}
          >
            <div className="form-group-request">
              <label htmlFor="schoolName" className="col-form-label-request">
                School Name :
              </label>
              <div className="">
                <input
                  type="text"
                  className="form-control-request"
                  id="schoolName"
                  name="schoolName"
                  placeholder="Enter School Name"
                  onChange={(e) => setSchoolName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group-request">
              <label htmlFor="schoolId" className="col-form-label-request">
                School ID :
              </label>
              <div className="">
                <input
                  type="text"
                  className="form-control-request"
                  id="schoolId"
                  name="schoolId"
                  placeholder="Enter School ID"
                  onChange={(e) => setSchoolId(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group-request">
              <label htmlFor="inventory" className="col-form-label-request">
                Select Inventory:
              </label>
              <div className="">
                <div className="select-with-icon">
                  <input
                    type="hidden"
                    id="inventory"
                    name="inventory"
                    required
                  />
                  <select
                    id="dropdown"
                    name="dropdown"
                    className="form-control-request"
                    onChange={handleOtherOption}
                    defaultValue="flavoured-milk"
                  >
                    <option value="flavoured-milk">Flavoured Milk</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
            </div>
            {otherOption && (
              <>
                <div className="form-group-request">
                  <label
                    htmlFor="school-title"
                    className="col-form-label-request"
                  >
                    Title :
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className="form-control-request"
                      id="school-title"
                      name="title"
                      placeholder="Enter your title request"
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group-request">
                  <label
                    htmlFor="school-description"
                    className="col-form-label-request"
                  >
                    Description :
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className="form-control-request"
                      id="school-description"
                      name="description"
                      placeholder="Please enter description"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            <div className="request-inventory-dis-side">
              <div className="form-group-request">
                <label htmlFor="mobile-1" className="col-form-label-request">
                  Quantity :
                </label>
                <input
                  type="number"
                  id="mobile-inventory-school"
                  name="mobile"
                  className="quantity-input-field"
                  placeholder="Please update quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="date-input-container">
                <label htmlFor="date" className="request-inventory-date-label">
                  Date :
                </label>
                <input
                  type="date"
                  id="date"
                  className="request-inventory-date-input"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group-request request-inventory-upload-docs">
              <label htmlFor="fileUpload" className="col-form-label-request">
                Upload Docs:
              </label>
              <label className="upload-button" htmlFor="fileInput">
                Upload
                <input
                  type="file"
                  id="fileInput"
                  name="fileInput"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
              <div className="uploaded-files">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="uploaded-file">
                    <span>{index + 1}. </span>
                    {file.name}
                    <button
                      className="cancel-button"
                      onClick={() => handleFileCancel(index)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="form-group-request request-inventory-upload-docs">
              <label htmlFor="fileUpload" className="col-form-label-request">
                Upload Docs:
              </label>
              <input
                type="file"
                className="school-up-btn-request"
                onChange={handleFileChange}
              />
            </div> */}

            <div className="request-inventory">
              <button type="submit" className="org-sub-btn-request">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestInventory;
