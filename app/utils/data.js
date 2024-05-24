"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash } from 'react-icons/fa';

const DataEntry = ({ selectedTemplate }) => {
  const { register, handleSubmit, getValues } = useForm();
  const [formData, setFormData] = useState([]);

  const addField = (fieldName) => {
    setFormData([...formData, { name: fieldName, value: '' }]);
  };

  const deleteField = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, value) => {
    const newData = [...formData];
    newData[index].value = value;
    setFormData(newData);
  };

  const onSubmit = () => {
    const dataToSend = {
      ...getValues(),
      fields: formData
    };
    // Save dataToSend to backend or local storage
    console.log('Saved Data:', dataToSend);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md overflow-y-auto"
        style={{ maxHeight: '80vh' }}
      >
        <h1 className="text-2xl font-bold mb-4">{selectedTemplate?.name || 'Select a Template'}</h1>
        {selectedTemplate ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {selectedTemplate.fields.map((field, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type={field.type}
                  placeholder={field.name}
                  value={formData[index]?.value || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  {...register(field.name)}
                />
                <button type="button" onClick={() => deleteField(index)} className="text-red-500">
                  <FaTrash />
                </button>
              </div>
            ))}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white rounded-md px-4 py-2 w-full"
            >
              Save Data
            </motion.button>
          </form>
        ) : (
          <p>Please select a template to continue.</p>
        )}
      </motion.div>
    </div>
  );
};

export default DataEntry;
