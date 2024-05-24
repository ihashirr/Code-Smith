"use client"
import React, { useState, useEffect } from 'react';

function BillList() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const storedBills = JSON.parse(localStorage.getItem('bills'));
    if (storedBills) {
      setBills(storedBills);
    }
  }, []);

  return (
    <div>
      <h2>Bills</h2>
      {bills.length > 0 ? (
        <ul>
          {bills.map((bill) => (
            <li key={bill.id || bill.accountNumber}>
              <p>Account Number: {bill.accountNumber}</p>
              <p>Amount: {bill.amount}</p>
              <p>Due Date: {bill.dueDate}</p>
              <p>Description: {bill.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bills saved yet.</p>
      )}
    </div>
  );
}

export default BillList;
