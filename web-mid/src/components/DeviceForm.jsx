import React, { useState } from 'react';

const DeviceForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type) {
      setError('All fields are required.');
      setSuccess(false);
      return;
    }
    onAdd({ id: Date.now(), name, type });
    setName('');
    setType('');
    setError('');
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6">
      <div className="mb-3">
        <label className="block font-semibold">Device Name:</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="block font-semibold">Device Type:</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mt-1"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Device
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">Device added successfully!</p>}
    </form>
  );
};

export default DeviceForm;
