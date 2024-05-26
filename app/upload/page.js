"use client";
import Link from 'next/link'; // Import Link component from next/link
import React, { useContext, useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import { AuthContext } from '../components/AuthContext';
import { FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const { fetchAllFormData, selectFormData, deleteFormDataById, selectedFormData, user } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [fileType, setFileType] = useState('pdf');
  const [fileName, setFileName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef();

  useEffect(() => {
    const data = fetchAllFormData();
    setAllData(data);
  }, [fetchAllFormData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
    selectFormData(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteFormDataById(id);
    setAllData(allData.filter(item => item.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleGenerateFile = async () => {
    if (!selectedFormData) return;

    const response = await fetch(`/api/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...selectedFormData, fileName, fileType }), // Ensure all necessary data is sent
    });

    if (!response.ok) {
      console.error('Error generating file:', await response.text());
      return;
    }

    const blob = await response.blob();
    saveAs(blob, `${fileName || 'document'}.${fileType}`);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered data based on search term
  const filteredData = allData.filter(data =>
    data.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.intake?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateFees = (fees, status) => {
    return fees
      .filter(fee => fee.status === status)
      .reduce((total, fee) => total + parseFloat(fee.fee || 0), 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <main className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Start Today!
          </motion.h1>
          <motion.p
            className="text-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Manage all your data effortlessly with CodeSmith. Create new entries or generate detailed reports with just a few clicks.
          </motion.p>
        </div>

        <div className="flex space-x-4">
          <Link href="/Create">
            <motion.button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Create New
            </motion.button>
          </Link>
          <Link href="/upload/Reports">
            <motion.button
              className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Report
            </motion.button>
          </Link>
        </div>
      </main>

      <section className="flex flex-col items-center bg-white p-6">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl transform transition-transform hover:scale-105 duration-200">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Saved Data</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {allData.length === 0 ? (
            <div className="text-center mt-4">
              <p className="text-gray-600 mb-4">No data available.</p>
              <Link className="bg-blue-500 text-white rounded-md px-4 py-2 transform transition-transform hover:scale-105 duration-200" href="/Create">
                Create New Data
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredData.map((data, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow-sm transform transition-transform hover:scale-105 duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-blue-500">{data.studentName}</p>
                      <p className="text-sm text-gray-700">Intake: {data.intake}</p>
                    </div>
                    <button onClick={() => handleDelete(data.id)} className="text-red-500 transform transition-transform hover:scale-110 duration-200">
                      <FaTrash />
                    </button>
                  </div>
                  <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                    onClick={() => handleSelect(data.id)}
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <AnimatePresence>
        {showModal && selectedFormData && (
          <motion.div
            key={`modal-${selectedId}`}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-transform hover:scale-105 duration-200 overflow-y-auto max-h-65"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">Selected Data</h2>
              <div>
                <p><strong>Student Name:</strong> {selectedFormData.studentName}</p>
                <p><strong>Intake:</strong> {selectedFormData.intake}</p>
                {selectedFormData.monthlyFees && (
                  <div className="overflow-y-auto max-h-64">
                    <h3 className="font-semibold mt-4">Monthly Fees</h3>
                    {selectedFormData.monthlyFees.map((month, index) => (
                      <p key={index}>{month.name}: Aed {month.fee} ({month.status})</p>
                    ))}
                    <p><strong>Yearly Fees:</strong> Aed {parseFloat(selectedFormData.yearlyAmount || 0).toFixed(2)}</p>
                    <p><strong>Total Paid Fees:</strong> Aed {calculateFees(selectedFormData.monthlyFees, 'Paid').toFixed(2)}</p>
                    <p><strong>Total Unpaid Fees:</strong> Aed {calculateFees(selectedFormData.monthlyFees, 'Unpaid').toFixed(2)}</p>
                    <p><strong>Remaining Due:</strong> Aed {(parseFloat(selectedFormData.yearlyAmount || 0) - calculateFees(selectedFormData.monthlyFees, 'Paid')).toFixed(2)}</p>
                  </div>
                )}
                {selectedFormData.otherFields && (
                  <div>
                    <h3 className="font-semibold mt-4">Other Data</h3>
                    {selectedFormData.otherFields.map((field, index) => (
                      <p key={index}>{field.type}: {field.value}</p>
                    ))}
                  </div>
                )}
              </div>
              <motion.button
                onClick={closeModal}
                className="bg-red-500 text-white rounded-md px-4 py-2 mt-4 transform transition-transform hover:scale-105 duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <h5 className="text-lg font-bold mb-2">CodeSmith</h5>
              <p className="text-sm">
				Where you stop stresing management and start enjoying it.
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <h5 className="text-lg font-bold mb-2">Quick Links</h5>
              <ul>
                <li className="mb-1">
                  <Link className="hover:underline" href="/">
                    Home
                  </Link>
                </li>
                {user && (
                  <>
                    <li className="mb-1">
                      <Link className="hover:underline" href="/upload/new">
                         Upload
                      </Link>
                    </li>
                    <li className="mb-1">
                      <Link className="hover:underline" href="/generate/report">
                         Generate Reports
                      </Link>
                    </li>
                  </>
                )}
                {!user && (
                  <li className="mb-1">
                    <Link className="hover:underline" href="/login">
                       Login
                    </Link>
                  </li>
                )}
                <li className="mb-1">
                  <Link className="hover:underline" href="/payment">
                     Payment
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-4">
            <div className="text-center">
              <p>&copy; {new Date().getFullYear()} CodeSmith. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
