"use client"

import React, { useState ,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

function BillForm() {
	const [accountNumber, setAccountNumber] = useState('');
	const [amount, setAmount] = useState(0);
	const [dueDate, setDueDate] = useState('');
	const [description, setDescription] = useState('');
	const [bills, setBills] = useState([]); // State for retrieved and saved bills
  
	useEffect(() => {
	  const storedBills = JSON.parse(localStorage.getItem('bills')) || [];
	  setBills(storedBills);
	}, []);
  
	const handleSaveBill = (e) => {
		
		// Validate data
		if (!accountNumber || !amount || !dueDate || !description) {
			alert('Please fill in all required fields.');
			return;
		}
		
		const newBill = {
			id: uuidv4(), // Generate unique ID
			accountNumber,
			amount,
			dueDate,
			description,
		};
		
		const existingBills = JSON.parse(localStorage.getItem('bills')) || [];
		existingBills.push(newBill);
		localStorage.setItem('bills', JSON.stringify(existingBills));
		
		setAccountNumber('');
		setAmount(0);
		setDueDate('');
		setDescription('');
		
		alert('Bill saved successfully!');
		// e.preventDefault(); // Prevent default form submission behavior
	};
  
	const handleDeleteBill = (billId) => {
	  const updatedBills = bills.filter((bill) => bill.id !== billId);
	  setBills(updatedBills);
	  localStorage.setItem('bills', JSON.stringify(updatedBills));
	};
  return (
	<div>
	  <h2>Add a New Bill</h2>
	  <form onSubmit={handleSaveBill} className="grid grid-cols-1 gap-4">
		<div className="flex items-center">
		  <label htmlFor="accountNumber" className="w-1/3 text-sm font-medium mr-2">
			Account Number:
		  </label>
		  <input
			type="text"
			id="accountNumber"
			value={accountNumber}
			onChange={(e) => setAccountNumber(e.target.value)}
			required
			className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-sm"
		  />
		</div>
		<div className="flex items-center">
		  <label htmlFor="amount" className="w-1/3 text-sm font-medium mr-2">
			Amount:
		  </label>
		  <input
			type="number"
			id="amount"
			value={amount}
			onChange={(e) => setAmount(Number(e.target.value))}
			required
			className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-sm"
		  />
		</div>
		<div className="flex items-center">
		  <label htmlFor="dueDate" className="w-1/3 text-sm font-medium mr-2">
			Due Date:
		  </label>
		  <input
			type="date"
			id="dueDate"
			value={dueDate}
			onChange={(e) => setDueDate(e.target.value)}
			required
			className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-sm"
		  />
		</div>
		<div className="flex items-center">
		  <label htmlFor="description" className="w-1/3 text-sm font-medium mr-2">
			Description:
		  </label>
		  <textarea
			id="description"
			value={description}
			onChange={(e) => setDescription(e.target.value)}
			required
			className="rounded-md px-2 py-1 border border-gray-300 h-20 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-sm"
		  />
		</div>
		<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
		  Save Bill
		</button>
	  </form>
	  {/* Add code to display saved bills and delete functionality here */}
	  <ul>
      {bills.map((bill) => (
        <li key={bill.id}>
          {/* Display bill details (account number, amount, etc.) */}
          <span> {bill.accountNumber} - {bill.amount} - {bill.dueDate} </span>
          <button onClick={() => handleDeleteBill(bill.id)}>Delete</button>
        </li>
      ))}
    </ul>
	</div>
  );
  
}

export default BillForm;
