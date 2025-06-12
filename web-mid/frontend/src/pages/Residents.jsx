import ResidentList from "../components/ResidentList";

export default function Residents() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resident Management</h1>
        <p className="text-gray-600">
          Manage your building's residents information
        </p>
      </div>
      <ResidentList />
    </div>
  );
}
