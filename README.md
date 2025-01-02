# ISA_management
The "In-Semester Assessment System" is a platform designed to efficiently show semester-wise and division-wise teacher allocations and monitor question paper submissions. This system allows faculties to efficiently allocate question papers to specific courses, divisions, and semesters. It keeps track of the submission counts for question papers across different courses and divisions, ensuring that no details are missed. With a user-friendly interface and secure access controls, it ensures smooth operations and a seamless experience to faculty members.

Objectives
To automate semester-wise and division-wise teacher allocations for efficient management.
To monitor and count question paper submissions for each allocated class and division.
To provide detailed reports on teacher class allocations, and submission counts.
To ensure secure access and data integrity through role-based permissions.
Technologies Used
Frontend:
HTML, CSS, JavaScript 
Framework: React.js for building an interactive and dynamic user interface
Backend:
Node.js with Express.js for server-side operations
Database:
 mysql
Problem Analysis and Requirement Specification
Functional Requirements
The system shall allow the user to input the semester and division details. 
The system shall retrieve and display the course details (course name, course code, and teacher's name) associated with the selected semester and division. 
The system shall provide a button labeled "View Requirements" that, when clicked, displays the allocated exam sections and the number of question papers required for each section. 
The system shall handle the data retrieval of exam section allocations(available) and question paper counts accurately and in real-time .
Non-Functional Requirements
Performance and Scalability: The system shall support up to 500 concurrent users without performance degradation and provide a response time of fewer than 2 seconds for standard operations.
Usability: The system shall have a user-friendly interface for easy navigation. 
Reliability: The system shall ensure 99.9% uptime during academic periods.
Data Integrity: The system shall ensure the accuracy and consistency of all stored data, preventing duplicate entries and maintaining clear relationships between entities.
Cross-Platform Compatibility: The system shall function seamlessly on various devices, including desktops, tablets, and mobile phones, across all modern web browsers.
