// Validation for resident name
export const validateName = (name) => {
    if (!name || typeof name !== 'string') return 'Name is required';
    if (name.trim().length < 3) return 'Name must be at least 3 characters long';
    if (name.trim().length > 50) return 'Name must be less than 50 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    return null;
};

// Validation for flat number
export const validateFlat = (flat) => {
    if (!flat || typeof flat !== 'string') return 'Flat number is required';
    if (!/^[A-Z]-\d{3}$/.test(flat)) return 'Flat number must be in format A-101';
    return null;
};

// Validation for contact number
export const validateContact = (contact) => {
    if (!contact || typeof contact !== 'string') return 'Contact number is required';
    if (!/^\d{4}-\d{7}$/.test(contact)) return 'Contact must be in format 0333-1234567';
    return null;
};

// Validation for resident object
export const validateResident = (resident) => {
    const errors = {};

    const nameError = validateName(resident.name);
    if (nameError) errors.name = nameError;

    const flatError = validateFlat(resident.flat);
    if (flatError) errors.flat = flatError;

    const contactError = validateContact(resident.contact);
    if (contactError) errors.contact = contactError;

    return Object.keys(errors).length > 0 ? errors : null;
};

// Check for duplicate flat
export const isDuplicateFlat = (flat, residents, excludeId = null) => {
    return residents.some(r => r.flat === flat && r.id !== excludeId);
};

// Format contact number
export const formatContact = (contact) => {
    // Remove all non-digits
    const digits = contact.replace(/\D/g, '');
    if (digits.length !== 11) return contact;
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
};

// Sort residents by various fields
export const sortResidents = (residents, sortBy = 'name', sortOrder = 'asc') => {
    return [...residents].sort((a, b) => {
        const aValue = a[sortBy].toLowerCase();
        const bValue = b[sortBy].toLowerCase();
        return sortOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
    });
}; 