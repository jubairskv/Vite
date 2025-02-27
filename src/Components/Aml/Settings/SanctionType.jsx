import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaExclamationCircle } from 'react-icons/fa';

const SanctionListType = () => {
  const [sanctionName, setSanctionName] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const fileTypes = ['xml', 'html', 'csv'];

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!sanctionName.trim()) {
      setError('Sanction name is required');
      return;
    }

    if (selectedTypes.length === 0) {
      setError('Please select at least one file type');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/create-sanction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanctionName,
          fileTypes: selectedTypes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create sanction type');
      }

      setSanctionName('');
      setSelectedTypes([]);
      setSuccess('Sanction type created successfully');
      navigate('/sanction-list');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Sanction List Type</h2>
      {error && <p className="text-red-500 flex items-center"><FaExclamationCircle className="mr-2" /> {error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Sanction Name</label>
          <input
            type="text"
            value={sanctionName}
            onChange={(e) => setSanctionName(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
            placeholder="Enter sanction name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Allowed File Types</label>
          <div className="space-y-2">
            {fileTypes.map(type => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="rounded border-gray-300"
                />
                <span className="text-gray-700 uppercase">{type}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <FaUpload /> Create Sanction Type
        </button>
      </form>
    </div>
  );
};

export default SanctionListType;
