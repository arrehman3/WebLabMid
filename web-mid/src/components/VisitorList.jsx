// src/components/VisitorList.jsx
export default function VisitorList({ visitors }) {
    return (
      <div>
        <h3 className="text-xl font-bold mb-4">Visitor List</h3>
        {visitors.length === 0 ? (
          <p className="text-gray-500">No visitors logged yet.</p>
        ) : (
          <ul className="space-y-2">
            {visitors.map((visitor, index) => (
              <li key={index} className="border p-3 rounded shadow">
                <p className="font-medium">{visitor.name}</p>
                <p className="text-sm text-gray-600">Visiting: {visitor.toVisit}</p>
                <p className="text-sm text-gray-600">Purpose: {visitor.purpose}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  