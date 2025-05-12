import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Secure Nest</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/residents" className="hover:underline">Residents</Link>
        <Link to="/visitors" className="hover:underline">Visitors</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </div>
    </nav>
  )
}