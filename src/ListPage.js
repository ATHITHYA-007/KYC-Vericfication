import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// 🔹 Updated Sample Data
const sampleData = [
  {id: 1, firstName: "John", lastName: "Brown", email: "john.brown1@test.org", country: "Canada",},
  {id: 2, firstName: "Jane", lastName: "Williams", email: "jane.williams2@example.com", country: "UK",},
  {id: 3, firstName: "Charlie", lastName: "Brown", email: "charlie.brown3@mail.com", country: "USA",},
];

function ListPage() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // current page index
  const [totalPages, setTotalPages] = useState(0); // total pages from backend
  const [statuses, setStatuses] = useState({});

  const size = 100; // records per page

  const fetchData = (pageNumber) => {
    axios
      .get(`http://localhost:8080/records?page=${pageNumber}&size=${size}`)
      .then((response) => {
        console.log("API Response:", response.data);
       const fetchedRows = response.data.content;
      setRows(fetchedRows);
      setTotalPages(response.data.totalPages);

      // Set initial "Not Verified" for first 10 rows
      const initialStatuses = {};
      fetchedRows.slice(0, 10).forEach(row => {
        initialStatuses[row.email] = "Not Verified";
      });
      setStatuses(initialStatuses);
    })
      .catch((error) => {
        console.error("Error fetching API, using sampleData:", error);
        setRows(sampleData);
      setTotalPages(1);

      // Set initial "Not Verified" for first 10 rows in sampleData
      const initialStatuses = {};
      sampleData.slice(0, 10).forEach(row => {
        initialStatuses[row.email] = "Not Verified";
      });
      setStatuses(initialStatuses);
    });
};

  useEffect(() => {
    fetchData(page);
  }, [page]);



  // 🔹 Verify customer 
  const verifyCustomer = (row) => {
    axios
      .post("http://localhost:8080/verify-customer", {
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        country: row.country,
      })
      .then((response) => {
        setStatuses((prev) => ({
          ...prev,
          [row.email]: response.data, //Verified
        }));
      })
      .catch((error) => {
        console.error("Verification error:", error);
        setStatuses((prev) => ({
          ...prev,
          [row.email]: "Verification Failed ❌",
        }));
      });
  };

  return (
    <div>
      <h2
        className="List-header"
      >
        Customer's List 
      </h2>

      <table className="custom-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Address1</th>
            <th>Address2</th>
            <th>Postal Code</th>
            <th>Country</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.gender}</td>
              <td>{row.email}</td>
              <td>{row.address1}</td>
              <td>{row.address2}</td>
              <td>{row.postalCode}</td>
              <td>{row.country}</td>
              <td className="status-cell">{index < 10 ? statuses[row.email] : ""}</td>
              <td>
                {/* {index < 10 && (
                  <button className="verify-btn" onClick={() => verifyCustomer(row)}>
                    Verify
                  </button>
                )} */}
                <button className="verify-btn" onClick={() => verifyCustomer(row)}>
                    Verify
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Pagination Controls */}
      <div style={{marginTop: "20px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px", }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0} >
          PREVIOUS
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}  disabled={page >= totalPages - 1} >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default ListPage;
