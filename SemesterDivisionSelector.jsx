// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import "./SemesterDivisionSelector.css";

// const SemesterDivisionSelector = () => {
//   const [semesters, setSemesters] = useState([]);
//   const [divisions, setDivisions] = useState([]);
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedDivision, setSelectedDivision] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch semesters from backend
//     axios
//       .get("http://localhost:8000/semesters")
//       .then((response) => setSemesters(response.data))
//       .catch((err) => console.error("Error fetching semesters: ", err));
//   }, []);

//   const handleSemesterChange = (e) => {
//     const semesterId = e.target.value;
//     setSelectedSemester(semesterId);
//     if (semesterId) {
//       // Fetch divisions for selected semester
//       axios
//         .get(`http://localhost:8000/divisions/${semesterId}`)
//         .then((response) => setDivisions(response.data))
//         .catch((err) => console.error("Error fetching divisions: ", err));
//     } else {
//       setDivisions([]);
//     }
//   };

//   const handleShowTeachers = () => {
//     if (selectedSemester && selectedDivision) {
//       navigate(
//         `/teacher-courses?semesterId=${selectedSemester}&divisionId=${selectedDivision}`
//       );
//     } else {
//       alert("Please select both a semester and a division.");
//     }
//   };
//   const handleGoBack = () => {
//     navigate(-1); // Navigate to the previous page
//   };

//   return (
//     <>
//       <h1>ISA Management System</h1>
//       <div className="section">
//         <h2>Select Semester and Division</h2>
//         <label htmlFor="semester">Semester:</label>
//         <select
//           id="semester"
//           onChange={handleSemesterChange}
//           value={selectedSemester}
//         >
//           <option value="">Select Semester</option>
//           {semesters.map((semester) => (
//             <option key={semester.semester_id} value={semester.semester_id}>
//               {semester.semester_name}
//             </option>
//           ))}
//         </select>

//         <label htmlFor="division">Division:</label>
//         <select
//           id="division"
//           onChange={(e) => setSelectedDivision(e.target.value)}
//           value={selectedDivision}
//         >
//           <option value="">Select Division</option>
//           {divisions.map((division) => (
//             <option key={division.division_id} value={division.division_id}>
//               {division.division_name}
//             </option>
//           ))}
//         </select>

//         <button onClick={handleShowTeachers}>Show Teachers</button>
//         <button onClick={handleGoBack} style={{ marginLeft: "10px" }}>
//           Go Back
//         </button>
//       </div>
//     </>
//   );
// };

// export default SemesterDivisionSelector;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SemesterDivisionSelector = () => {
  const [semesters, setSemesters] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [semesterInput, setSemesterInput] = useState("");
  const [divisionInput, setDivisionInput] = useState("");
  const [filteredSemester, setFilteredSemester] = useState(null);
  const [filteredDivision, setFilteredDivision] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch semesters from backend
    axios
      .get("http://localhost:8000/semesters")
      .then((response) => setSemesters(response.data))
      .catch((err) => console.error("Error fetching semesters: ", err));
  }, []);

  const handleSemesterInputChange = (e) => {
    const input = e.target.value;
    setSemesterInput(input);

    if (input) {
      const matchedSemester = semesters.find((semester) =>
        semester.semester_id.toString().endsWith(input)
      );
      if (matchedSemester) {
        setFilteredSemester(matchedSemester);
        // Fetch divisions for the matched semester
        axios
          .get(`http://localhost:8000/divisions/${matchedSemester.semester_id}`)
          .then((response) => setDivisions(response.data))
          .catch((err) => console.error("Error fetching divisions: ", err));
      } else {
        setFilteredSemester(null);
        setDivisions([]);
      }
    } else {
      setFilteredSemester(null);
      setDivisions([]);
    }
  };

  const handleDivisionInputChange = (e) => {
    const input = e.target.value.toUpperCase();
    setDivisionInput(input);

    if (input && filteredSemester) {
      const matchedDivision = divisions.find(
        (division) => division.division_name === input
      );
      setFilteredDivision(matchedDivision);
    } else {
      setFilteredDivision(null);
    }
  };

  const handleShowTeachers = () => {
    if (filteredSemester && filteredDivision) {
      navigate(
        `/teacher-courses?semesterId=${filteredSemester.semester_id}&divisionId=${filteredDivision.division_id}`
      );
    } else {
      alert("Please enter valid semester and division inputs.");
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
      <h1>ISA Management System</h1>
      <div className="section">
        <h2>Select Semester and Division</h2>

        <label htmlFor="semester">Enter Semester:</label>
        <input
          type="number"
          id="semester"
          value={semesterInput}
          onChange={handleSemesterInputChange}
        />

        <label htmlFor="division">Enter Division:</label>
        <input
          type="text"
          id="division"
          value={divisionInput}
          onChange={handleDivisionInputChange}
          disabled={!filteredSemester} // Disable input until a valid semester is entered
          style={{ textTransform: "uppercase" }}
        />

        <button onClick={handleShowTeachers}>Show Teachers</button>
        <button onClick={handleGoBack} style={{ marginLeft: "10px" }}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default SemesterDivisionSelector;
