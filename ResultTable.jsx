import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "./Modal";
import attendance_booklet from "../../team5/App5";

const ResultTable = ({ setShowTable }) => {
  const [data, setData] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/results")
      .then((res) => res.json())
      .then((data) => {
        setData(data); // Save the data directly from the response
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOpenModal = (classid, tableName) => {
    setSelectedClass(classid);
    setSelectedTable(tableName);
  };

  const handleCloseModal = () => {
    setSelectedClass(null);
    setSelectedTable(null);
  };

  const dropExistingTable = (tableName) => {
    const subject = tableName.replace("allocation_", "");
    fetch("http://localhost:8000/drop-table", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject }),
    })
      .then((response) => {
        if (response.ok) {
          alert(`Table ${tableName} dropped successfully!`);
        } else {
          alert("Failed to drop table");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setShowTable(false);
  };

  // Group data by table (allocation_<semester>_<subject>)
  const groupDataByTable = () => {
    const groupedData = {};

    Object.keys(data).forEach((semester) => {
      data[semester].forEach((row) => {
        const subject = row.Subject || ""; // Default to empty string if Subject is undefined or null
        const tableName = `${subject.replace(/\s+/g, "_").toLowerCase()}`;

        if (!groupedData[tableName]) {
          groupedData[tableName] = [];
        }
        groupedData[tableName].push(row);
      });
    });

    return groupedData;
  };

  const groupedData = groupDataByTable();

  return (
    <div>
      <h2>Allocation Results</h2>
      {Object.keys(groupedData).length > 0 ? (
        Object.keys(groupedData).map((tableName) => (
          <div key={tableName}>
            <h3>{tableName.replace(/_/g, " ")}</h3>
            <table style={{ width: "95%" }}>
              <thead>
                <tr>
                  <th>UniqueID</th>
                  <th>RollNumbers</th>
                  <th>QuestionPaperCount</th>
                  <th>Actions</th>
                  <th style={{ width: "12%" }}>
                    Add attendence and booklet numbers
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedData[tableName].map((row, index) => (
                  <tr key={index}>
                    <td>{row.classid}</td>
                    <td>{row.RollNumbers}</td>
                    <td>{row.QuestionPaperCount}</td>
                    <td>
                      <button
                        onClick={() => handleOpenModal(row.classid, tableName)}
                      >
                        Manage
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(
                            `/team5?rollNo=${row.RollNumbers}&classid=${
                              row.classid
                            }&subject=${tableName
                              .split("_")
                              .slice(1)
                              .join("_")}`
                          )
                        }
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => dropExistingTable(tableName)}
              style={{ marginRight: "10px" }}
            >
              Drop Table
            </button>
            <button
              onClick={() => {
                const csvContent = [
                  Object.keys(groupedData[tableName][0]).join(","),
                  ...groupedData[tableName].map((row) =>
                    Object.values(row).join(",")
                  ),
                ].join("\n");

                const blob = new Blob([csvContent], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `${tableName}.csv`;
                link.click();
                URL.revokeObjectURL(url);
              }}
              style={{
                backgroundColor: "#2196F3",
                color: "white",
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Download Table
            </button>
          </div>
        ))
      ) : (
        <p>Loading allocation results...</p>
      )}

      {selectedClass && selectedTable && (
        <Modal
          classID={selectedClass}
          tableName={selectedTable}
          onClose={handleCloseModal}
          setShowTable={setShowTable}
        />
      )}
    </div>
  );
};

ResultTable.propTypes = {
  setShowTable: PropTypes.func.isRequired,
};

export default ResultTable;
