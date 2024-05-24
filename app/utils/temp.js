"use client"
import React, { useState } from 'react';

const TemplateManager = ({ templates, setTemplates, setSelectedTemplate }) => {
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateFields, setNewTemplateFields] = useState([{ name: '', type: 'text' }]);

  const addField = () => {
    setNewTemplateFields([...newTemplateFields, { name: '', type: 'text' }]);
  };

  const deleteField = (index) => {
    setNewTemplateFields(newTemplateFields.filter((_, i) => i !== index));
  };

  const saveTemplate = () => {
    const newTemplate = {
      name: newTemplateName,
      fields: newTemplateFields
    };
    setTemplates([...templates, newTemplate]);
    setNewTemplateName('');
    setNewTemplateFields([{ name: '', type: 'text' }]);
  };

  return (
    <div>
      <h2>Manage Templates</h2>
      <input
        type="text"
        placeholder="Template Name"
        value={newTemplateName}
        onChange={(e) => setNewTemplateName(e.target.value)}
      />
      {newTemplateFields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Field Name"
            value={field.name}
            onChange={(e) => {
              const newFields = [...newTemplateFields];
              newFields[index].name = e.target.value;
              setNewTemplateFields(newFields);
            }}
          />
          <select
            value={field.type}
            onChange={(e) => {
              const newFields = [...newTemplateFields];
              newFields[index].type = e.target.value;
              setNewTemplateFields(newFields);
            }}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            {/* Add more field types as needed */}
          </select>
          <button onClick={() => deleteField(index)}>Delete Field</button>
        </div>
      ))}
      <button onClick={addField}>Add Field</button>
      <button onClick={saveTemplate}>Save Template</button>

      <h2>Existing Templates</h2>
      <ul>
        {templates.map((template, index) => (
          <li key={index}>
            <button onClick={() => setSelectedTemplate(template)}>
              {template.name}
            </button>
            <button onClick={() => setTemplates(templates.filter((_, i) => i !== index))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateManager;
