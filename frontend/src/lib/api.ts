// api.js
const API_BASE_URL = 'http://localhost:4000';

/**
 * Get authentication token from local storage
 * @returns {string} The authentication token
 */
const getAuthToken = () => localStorage.getItem('token');

/**
 * Create headers with authentication token
 * @returns {Object} Headers object with content type and auth token
 */
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`
});

/**
 * Fetch all users from the API
 * @returns {Promise} Promise resolving to users data
 */
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Ma\'lumotlarni yuklashda xato: ' + error.message);
  }
};

/**
 * Delete a user by ID
 * @param {number} id - The ID of the user to delete
 * @returns {Promise} Promise resolving to the delete operation result
 */
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/delete-student/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('O\'chirishda xato yuz berdi: ' + error.message);
  }
};