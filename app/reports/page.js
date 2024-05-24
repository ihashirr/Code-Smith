"use client"
// import React from "react";
// import "../styling/report.css";

// function App() {
//   return (
//     <div className="report">
// 	  <main>
//         <h1>Report Section</h1>
//         <div class="centered">
//             <section id="reportFilters">
//                 <h2>Filters</h2>
//                 <label for="categoryFilter">Category:</label>
//                 <select id="categoryFilter">
//                     <option value="all">All Categories</option>
//                     <option value="Category A">Category A</option>
//                     <option value="Category B">Category B</option>

//                 </select>
//                 <label for="dateFilter">Date:</label>
//                 <input type="date" id="dateFilter"/>
//                 <button id="applyFilters">Apply</button>
//             </section>
        
//             <section id="reportActions">
//                 <h2>Actions</h2>
//                 <button id="exportPDF">Export to PDF</button>
//                 <button id="exportCSV">Export to CSV</button>
//             </section>
//         </div>
//         <div class="table-container">
//             <table id="reportTable">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Title</th>
//                         <th>Category</th>
//                         <th>Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>3</td>
//                         <td>Report 3</td>
//                         <td>Category A</td>
//                         <td>2024-05-03</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//         <div id="paginationContainer"></div>
//     </main>
//     </div>
//   );
// }

// export default App;

// Client Component (e.g., Reports.jsx)
// import React from 'react';
// import jsPDF from 'jspdf';

// 	const Reports = () => {
// 		const generatePDFReport = () => {
// 			const doc = new jsPDF(); // Create a new PDF document
		  
// 			// Get data from local storage
// 			const data = JSON.parse(localStorage.getItem('bills'));
		  
// 			if (data && data.length > 0) {
// 			  let verticalOffset = 16; // Initial vertical offset
// 			  data.forEach((item, index) => {
// 				// Add data to PDF
// 				doc.text(`Item ${index + 1}`, 14, verticalOffset);
// 				doc.text(`Account Number: ${item.accountNumber}`, 14, verticalOffset + 10);
// 				doc.text(`Amount: ${item.amount}`, 14, verticalOffset + 20);
// 				doc.text(`Description: ${item.description}`, 14, verticalOffset + 30);
// 				doc.text(`Due Date: ${item.dueDate}`, 14, verticalOffset + 40);
// 				doc.text(`ID: ${item.id}`, 14, verticalOffset + 50);
		  
// 				verticalOffset += 60; // Increase the vertical offset for the next item
// 			  });
// 			} else {
// 			  doc.text('No data found in local storage.', 14, 16); // Add text at (14, 16) coordinates
// 			}
		  
// 			doc.save('sample_report.pdf'); // Save the PDF with a chosen filename
// 		  };
	
// 	  return (
// 		<div>
// 		  <h1>Generate PDF Report</h1>
// 		  <button onClick={generatePDFReport}>Generate PDF</button>
// 		</div>
// 	  );
// 	};
	
// 	export default Reports;
	
// import React, { useState, useEffect } from 'react';
// import jsPDF from 'jspdf';

// const Reports = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Load data from local storage when the component mounts
//     const loadData = JSON.parse(localStorage.getItem('bills'));
//     if (loadData) {
//       setData(loadData);
//     }
//   }, []);

//   const generatePDFReport = () => {
//     const doc = new jsPDF(); // Create a new PDF document

//     if (data && data.length > 0) {
//       let verticalOffset = 16; // Initial vertical offset
//       data.forEach((item, index) => {
//         // Add data to PDF
//         doc.text(`Item ${index + 1}`, 14, verticalOffset);
//         doc.text(`Account Number: ${item.accountNumber}`, 14, verticalOffset + 10);
//         doc.text(`Amount: ${item.amount}`, 14, verticalOffset + 20);
//         doc.text(`Description: ${item.description}`, 14, verticalOffset + 30);
//         doc.text(`Due Date: ${item.dueDate}`, 14, verticalOffset + 40);
//         doc.text(`ID: ${item.id}`, 14, verticalOffset + 50);

//         verticalOffset += 60; // Increase the vertical offset for the next item
//       });
//     } else {
//       doc.text('No data found in local storage.', 14, 16); // Add text at (14, 16) coordinates
//     }

//     doc.save('sample_report.pdf'); // Save the PDF with a chosen filename
//   };

//   return (
//     <div>
//       <h1>Generate PDF Report</h1>
//       <button onClick={generatePDFReport}>Generate PDF</button>
//     </div>
//   );
// };

// export default Reports;




import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from local storage when the component mounts
    const loadData = JSON.parse(localStorage.getItem('bills'));
    if (loadData) {
      setData(loadData);
    }
  }, []);

  const generatePDFReport = (items) => {
	const doc = new jsPDF(); // Create a new PDF document
  
	if (items && items.length > 0) {
	  let verticalOffset = 16; // Initial vertical offset
	  items.forEach((item, index) => {
		// Add data to PDF
		doc.text(`Item ${index + 1}`, 14, verticalOffset);
		doc.text(`Account Number: ${item.accountNumber}`, 14, verticalOffset + 10);
		doc.text(`Amount: ${item.amount}`, 14, verticalOffset + 20);
		doc.text(`Description: ${item.description}`, 14, verticalOffset + 30);
		doc.text(`Due Date: ${item.dueDate}`, 14, verticalOffset + 40);
		doc.text(`ID: ${item.id}`, 14, verticalOffset + 50);
  
		verticalOffset += 60; // Increase the vertical offset for the next item
	  });
	} else {
	  doc.text('No data found.', 14, 16); // Add text at (14, 16) coordinates
	}
  
	doc.save('sample_report.pdf'); // Save the PDF with a chosen filename
  };
  
  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="p-6 bg-white rounded shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Generate PDF Report</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <p className="font-bold text-lg mb-2">Item {index + 1}</p>
              <p>Account Number: <span className="font-medium">{item.accountNumber}</span></p>
              <p>Amount: <span className="font-medium">{item.amount}</span></p>
              <p>Description: <span className="font-medium">{item.description}</span></p>
              <p>Due Date: <span className="font-medium">{item.dueDate}</span></p>
              <p>ID: <span className="font-medium">{item.id}</span></p>
              <button onClick={() => generatePDFReport([item])} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">Generate Report for this Item</button>
            </div>
          ))
        ) : (
          <p className="text-red-500">No data found in local storage.</p>
        )}
      </div>
      <button onClick={() => generatePDFReport(data)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Generate Report for All Items</button>
    </div>
  </div>
);
};

export default Reports;