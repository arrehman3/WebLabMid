import { useState } from "react";
import {
  validateResident,
  isDuplicateFlat,
  formatContact,
  sortResidents,
} from "../utils/residentValidation";

const initialResidents = [
  {
    id: 1,
    name: "Ali Raza",
    flat: "A-101",
    contact: "0333-1234567",
    moveInDate: "2024-01-01",
  },
  {
    id: 2,
    name: "Sara Khan",
    flat: "B-203",
    contact: "0312-9876543",
    moveInDate: "2024-02-15",
  },
];

export default function ResidentList() {
  const [residents, setResidents] = useState(initialResidents);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingResident, setEditingResident] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    flat: "",
    contact: "",
    moveInDate: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [sortConfig, setSortConfig] = useState({ field: "name", order: "asc" });
  const [selectedResidents, setSelectedResidents] = useState(new Set());

  // Filter residents based on search term
  const filteredResidents = residents.filter(
    (resident) =>
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.contact.includes(searchTerm)
  );

  // Sort filtered residents
  const sortedResidents = sortResidents(
    filteredResidents,
    sortConfig.field,
    sortConfig.order
  );

  const handleSort = (field) => {
    setSortConfig((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const validateForm = () => {
    const errors = validateResident(formData);

    // Check for duplicate flat
    if (
      !errors?.flat &&
      isDuplicateFlat(formData.flat, residents, editingResident?.id)
    ) {
      return { ...errors, flat: "This flat number is already occupied" };
    }

    // Validate move-in date
    if (!formData.moveInDate) {
      return { ...errors, moveInDate: "Move-in date is required" };
    }

    const moveInDate = new Date(formData.moveInDate);
    const today = new Date();
    if (moveInDate > today) {
      return { ...errors, moveInDate: "Move-in date cannot be in the future" };
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (errors) {
      setFormErrors(errors);
      return;
    }

    // Format contact number
    const formattedContact = formatContact(formData.contact);

    if (editingResident) {
      // Update existing resident
      setResidents(
        residents.map((res) =>
          res.id === editingResident.id
            ? { ...formData, id: res.id, contact: formattedContact }
            : res
        )
      );
    } else {
      // Add new resident
      setResidents([
        ...residents,
        { ...formData, id: Date.now(), contact: formattedContact },
      ]);
    }

    // Reset form
    setShowForm(false);
    setEditingResident(null);
    setFormData({ name: "", flat: "", contact: "", moveInDate: "" });
    setFormErrors({});
  };

  const handleEdit = (resident) => {
    setEditingResident(resident);
    setFormData(resident);
    setShowForm(true);
    setFormErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this resident?")) {
      setResidents(residents.filter((res) => res.id !== id));
      setSelectedResidents((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleBulkDelete = () => {
    if (selectedResidents.size === 0) return;

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedResidents.size} residents?`
      )
    ) {
      setResidents(residents.filter((res) => !selectedResidents.has(res.id)));
      setSelectedResidents(new Set());
    }
  };

  const toggleSelect = (id) => {
    setSelectedResidents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    if (selectedResidents.size === filteredResidents.length) {
      setSelectedResidents(new Set());
    } else {
      setSelectedResidents(new Set(filteredResidents.map((r) => r.id)));
    }
  };

  return (
    <div>
      {/* Search, Sort, and Actions */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search residents..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="search-input"
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortConfig.field}
            onChange={(e) => handleSort(e.target.value)}
            data-testid="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="flat">Sort by Flat</option>
            <option value="moveInDate">Sort by Move-in Date</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          {selectedResidents.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              data-testid="bulk-delete-button"
            >
              Delete Selected ({selectedResidents.size})
            </button>
          )}
          <button
            onClick={() => {
              setShowForm(true);
              setEditingResident(null);
              setFormData({ name: "", flat: "", contact: "", moveInDate: "" });
              setFormErrors({});
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            data-testid="add-resident-button"
          >
            Add New Resident
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            {editingResident ? "Edit Resident" : "Add New Resident"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-testid="resident-form"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setFormErrors({ ...formErrors, name: null });
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                data-testid="name-input"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flat Number (Format: A-101)
              </label>
              <input
                type="text"
                value={formData.flat}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    flat: e.target.value.toUpperCase(),
                  });
                  setFormErrors({ ...formErrors, flat: null });
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.flat ? "border-red-500" : ""
                }`}
                data-testid="flat-input"
              />
              {formErrors.flat && (
                <p className="text-red-500 text-sm mt-1">{formErrors.flat}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact (Format: 0333-1234567)
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => {
                  setFormData({ ...formData, contact: e.target.value });
                  setFormErrors({ ...formErrors, contact: null });
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.contact ? "border-red-500" : ""
                }`}
                data-testid="contact-input"
              />
              {formErrors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.contact}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Move-in Date
              </label>
              <input
                type="date"
                value={formData.moveInDate}
                onChange={(e) => {
                  setFormData({ ...formData, moveInDate: e.target.value });
                  setFormErrors({ ...formErrors, moveInDate: null });
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.moveInDate ? "border-red-500" : ""
                }`}
                data-testid="move-in-date-input"
              />
              {formErrors.moveInDate && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.moveInDate}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                data-testid="submit-button"
              >
                {editingResident ? "Update" : "Add"} Resident
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormErrors({});
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                data-testid="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Residents List */}
      {sortedResidents.length === 0 ? (
        <p
          className="text-gray-500 text-center py-4"
          data-testid="no-residents-message"
        >
          No residents found.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedResidents.size === filteredResidents.length}
              onChange={selectAll}
              className="mr-2"
              data-testid="select-all-checkbox"
            />
            <span className="text-sm text-gray-600">
              Select All ({selectedResidents.size}/{filteredResidents.length})
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedResidents.map((resident) => (
              <div
                key={resident.id}
                className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                data-testid={`resident-card-${resident.id}`}
              >
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={selectedResidents.has(resident.id)}
                    onChange={() => toggleSelect(resident.id)}
                    className="mt-1"
                    data-testid={`resident-checkbox-${resident.id}`}
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{resident.name}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(resident)}
                          className="text-blue-600 hover:text-blue-800"
                          data-testid={`edit-button-${resident.id}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(resident.id)}
                          className="text-red-600 hover:text-red-800"
                          data-testid={`delete-button-${resident.id}`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600">Flat: {resident.flat}</p>
                    <p className="text-gray-600">Contact: {resident.contact}</p>
                    <p className="text-gray-600">
                      Move-in: {resident.moveInDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
