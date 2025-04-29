// src/components/VisitorForm.jsx
import { useState } from "react";
import VisitorList from './VisitorList';

export default function VisitorForm() {
  const [formData, setFormData] = useState({
    name: "",
    toVisit: "",
    purpose: "",
    time:""
  });
  const [message, setMessage] = useState("");
  const [visitors, setVisitors] = useState([]);
  const timestamp = new Date().toLocaleString();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.toVisit || !formData.purpose) {
      setMessage("Please fill in all fields.");
      return;
    }

    setVisitors([...visitors, { ...formData, timestamp }]); // Add the new visitor
    setMessage("Visitor logged successfully! ✅");
    setFormData({ name: "", toVisit: "", purpose: "" }); // Reset form
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Visitor Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Visitor Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="toVisit"
          placeholder="Resident to Visit"
          value={formData.toVisit}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="purpose"
          placeholder="Purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>

      {message && <p className="mt-4 text-blue-600">{message}</p>}

      {/* Display the Visitor List */}
      <VisitorList visitors={visitors} />
    </div>
  );
}
