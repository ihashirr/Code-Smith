"use client";

import Link from 'next/link';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import { AuthContext } from '../../components/AuthContext';
import { FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const DataList = () => {
	const { fetchAllFormData, selectFormData, deleteFormDataById, selectedFormData } = useContext(AuthContext);
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
		<div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-6">
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
						<Link className="bg-blue-500 text-white rounded-md px-4 py-2 transform transition-transform hover:scale-105 duration-200" href="/create/new">
							Create New Data
						</Link>
					</div>
				) : (
					<ul className="overflow-auto max-h-64 space-y-2">
						{filteredData.map((data, index) => (
							<motion.li
								key={index}
								className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm transform transition-transform hover:scale-105 duration-200"
								whileHover={{ scale: 1.05 }}
							>
								<div className="flex items-center">
									<input
										type="checkbox"
										id={`data-${data.id}`}
										name="selectedData"
										value={data.id}
										checked={selectedId === data.id}
										onChange={() => handleSelect(data.id)}
										className="mr-2 cursor-pointer rounded focus:ring-blue-500 h-4 w-4"
									/>
									<label htmlFor={`data-${data.id}`} className="text-blue-500 cursor-pointer">
										{data.studentName} - {data.intake}
									</label>
								</div>
								<div className="flex items-center space-x-4">
									<button onClick={() => handleDelete(data.id)} className="text-red-500 transform transition-transform hover:scale-110 duration-200">
										<FaTrash />
									</button>
								</div>
							</motion.li>
						))}
					</ul>
				)}
			</div>
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
								{selectedFormData.monthlyFees ? (
									<>
										<p><strong>Student Name:</strong> {selectedFormData.studentName}</p>
										<p><strong>Intake:</strong> {selectedFormData.intake}</p>
										<div className="overflow-y-auto max-h-64">
											<h3 className="font-semibold mt-4">Monthly Fees</h3>
											{selectedFormData.monthlyFees.map((month, index) => (
												<p key={index}>{month.name}: Aed {month.fee} ({month.status})</p>
											))}
											<p><strong>Yearly Fees:</strong> Aed {parseFloat(selectedFormData.yearlyAmount || 0).toFixed(2)}</p>
											<p><strong>Total Paid Fees:</strong> Aed {calculateFees(selectedFormData.monthlyFees, 'Paid').toFixed(2)}</p>
											<p><strong>Remaining Due:</strong> Aed {(parseFloat(selectedFormData.yearlyAmount || 0) - calculateFees(selectedFormData.monthlyFees, 'Paid')).toFixed(2)}</p>
										</div>
									</>
								) : (
									<>
										<h3 className="font-semibold mt-4">Other Data</h3>
										{selectedFormData.otherFields.map((field, index) => (
											<p key={index}>{field.type}: {field.value}</p>
										))}
									</>
								)}
							</div>
							<div className="space-y-4 mt-4">
								<select
									value={fileType}
									onChange={handleFileTypeChange}
									className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
								>
									<option value="pdf">PDF</option>
									<option value="xlsx">Excel</option>
									<option value="csv">Google Sheets</option>
								</select>
								<input
									type="text"
									placeholder="File Name (optional)"
									value={fileName}
									onChange={handleFileNameChange}
									className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
								/>
								<motion.button
									onClick={handleGenerateFile}
									className="bg-green-500 text-white rounded-md px-4 py-2 transform transition-transform hover:scale-105 duration-200"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Download
								</motion.button>
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
		</div>
	);
};

export default DataList;
