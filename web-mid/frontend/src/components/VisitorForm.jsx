import { useEffect, useState } from "react";
import VisitorList from './VisitorList';

export default function VisitorForm() {
  const [formData, setFormData] = useState({ name: "", toVisit: "", purpose: ""});
  const [message, setMessage] = useState("");
  const [visitors, setVisitors] = useState([]);

  // Fetch visitors from backend
  useEffect(() => {
    fetch("/api/visitors")
      .then(res => res.json())
      .then(data => setVisitors(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch("/api/visitors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  // Log response status and response body
  const data = await response.json();
  console.log("Response:", data);

  if (response.ok) {
    setVisitors([data, ...visitors]);
    setMessage("Visitor logged successfully! ✅");
    setFormData({ name: "", toVisit: "", purpose: ""}); // Reset form
  } else {
    console.log("Error:", data); // Log error
    setMessage("Failed to log visitor.");
  }
};


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Visitor Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Visitor Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="toVisit" placeholder="Resident to Visit" value={formData.toVisit} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="purpose" placeholder="Purpose" value={formData.purpose} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>
      </form>
      {message && <p className="mt-4 text-blue-600">{message}</p>}
      <VisitorList visitors={visitors} />
    </div>
  );
}
