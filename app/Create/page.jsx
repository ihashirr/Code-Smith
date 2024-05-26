"use client";

import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../components/AuthContext';

const DataEntry = () => {
  const { register, handleSubmit, getValues } = useForm();
  const { saveFormDataById } = useContext(AuthContext);
  const [dataType, setDataType] = useState('monthlyFees');
  const [months, setMonths] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const addMonth = () => {
    const nextMonthIndex = months.length % 12;
    const nextMonthName = monthNames[nextMonthIndex];
    setMonths([...months, { name: nextMonthName, fee: '', status: 'Unpaid' }]);
  };

  const deleteMonth = (index) => {
    setMonths(months.filter((_, i) => i !== index));
  };

  const addOtherData = () => {
    setOtherData([...otherData, { type: '', value: '' }]);
  };

  const deleteOtherData = (index) => {
    setOtherData(otherData.filter((_, i) => i !== index));
  };

  const onSubmit = () => {
    const { studentName, intake } = getValues();
    let dataToSend;
    if (dataType === 'monthlyFees') {
      const { yearlyAmount } = getValues();
      dataToSend = { studentName, intake, yearlyAmount, monthlyFees: months.map(({ name, fee, status }) => ({ name, fee, status })) };
    } else {
      dataToSend = { studentName, intake, otherFields: otherData.map(({ type, value }) => ({ type, value })) };
    }

    const id = new Date().getTime(); // Generate a unique ID (timestamp)
    saveFormDataById(id, dataToSend); // Save form data with the ID
  };

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg md:max-w-md overflow-y-auto"
        style={{ maxHeight: '80vh' }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Data Entry</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Student Name"
            {...register('studentName')}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Intake (e.g., September 2023)"
            {...register('intake')}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          {dataType === 'monthlyFees' && (
            <input
              type="number"
              placeholder="Yearly Amount"
              {...register('yearlyAmount')}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          )}
          <div className="flex items-center space-x-4">
            <select
              value={dataType}
              onChange={handleDataTypeChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
            >
              <option value="monthlyFees">Monthly Fees</option>
              <option value="otherData">Other Data</option>
            </select>
            <button
              type="button"
              onClick={dataType === 'monthlyFees' ? addMonth : addOtherData}
              className="flex items-center justify-center w-1/2 py-2 px-4 bg-green-500 text-white rounded-md"
            >
              <FaPlus className="mr-2" /> Add {dataType === 'monthlyFees' ? 'Month' : 'Data'}
            </button>
          </div>
          {dataType === 'monthlyFees' && (
            <div className="space-y-2">
              {months.map((month, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Month Name"
                    value={month.name}
                    onChange={(e) => {
                      const newMonths = [...months];
                      newMonths[index].name = e.target.value;
                      setMonths(newMonths);
                    }}
                    className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
                  />
                  <input
                    type="number"
                    placeholder="Fee"
                    value={month.fee}
                    onChange={(e) => {
                      const newMonths = [...months];
                      newMonths[index].fee = e.target.value;
                      setMonths(newMonths);
                    }}
                    className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
                  />
                  <select
                    value={month.status}
                    onChange={(e) => {
                      const newMonths = [...months];
                      newMonths[index].status = e.target.value;
                      setMonths(newMonths);
                    }}
                    className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => deleteMonth(index)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
          {dataType === 'otherData' && (
            <div className="space-y-2">
              {otherData.map((data, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Data Type"
                    value={data.type}
                    onChange={(e) => {
                      const newOtherData = [...otherData];
                      newOtherData[index].type = e.target.value;
                      setOtherData(newOtherData);
                    }}
                    className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
                  />
                  <input
                    type="text"
                    placeholder="Data Value"
                    value={data.value}
                    onChange={(e) => {
                      const newOtherData = [...otherData];
                      newOtherData[index].value = e.target.value;
                      setOtherData(newOtherData);
                    }}
                    className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
                  />
                  <button
                    type="button"
                    onClick={() => deleteOtherData(index)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white rounded-md px-4 py-2 w-full"
          >
            Save Data
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default DataEntry;
