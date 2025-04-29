import React from 'react';

const DeviceList = ({ devices }) => {
  if (devices.length === 0) {
    return <p className="text-center text-gray-600">No devices added yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {devices.map((device) => (
        <div key={device.id} className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg">{device.name}</h2>
          <p className="text-gray-600">Type: {device.type}</p>
        </div>
      ))}
    </div>
  );
};

export default DeviceList;
