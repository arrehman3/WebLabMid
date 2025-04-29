import { useState } from 'react'

const initialResidents = [
  { name: 'Ali Raza', flat: 'A-101', contact: '0333-1234567' },
  { name: 'Sara Khan', flat: 'B-203', contact: '0312-9876543' },
]

export default function ResidentList() {
  const [residents, setResidents] = useState(initialResidents)

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Residents</h2>
      {residents.length === 0 ? (
        <p className="text-gray-500">No residents yet.</p>
      ) : (
        <ul className="space-y-2">
          {residents.map((res, index) => (
            <li key={index} className="border p-3 rounded shadow">
              <p className="font-medium">{res.name}</p>
              <p className="text-sm text-gray-600">Flat: {res.flat} — {res.contact}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
