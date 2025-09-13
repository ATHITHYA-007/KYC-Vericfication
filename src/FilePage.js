import React, { useState } from "react";
import axios from "axios";
import "./App.css"; 
// import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function FilePage() {
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 
  // const [rows, setRows] = useState([]);
   const navigate = useNavigate();

  function moveFile(e) {
    e.preventDefault();
    console.log("Yes")
    setLoading(true);
    // setMessage("Records will be listed after file moved successfully ");

    axios.post("http://localhost:8080/move")
      .then(function (response) {
        console.log(response);
        // setRows(response.data);
        // setMessage(response.data); 
        alert(response.data);
        navigate("/listpage");

      })
      .catch(function (error) {
        console.error(error);
        setMessage(error.response?.data || "Error moving file"); 
      })
      .finally(function () {
        setLoading(false);
      });
  }




  return (
    <div className="filepage-container">
    <form className="file-form">
      <h3>Welcome To KYC Verfication</h3>
      <button onClick={moveFile} disabled={loading}> 
        {loading ? "Moving..." : "Process Customer File"}
      </button>
      {message && <p>{message}</p>}
      </form>
    </div>

  );
}

export default FilePage;
