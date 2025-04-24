// StudentTable.jsx
import React, { useState, useEffect } from 'react';
import { deleteUser, fetchUsers } from '../../lib/api';
import Toast from '../../Component/toast';
import ConfirmDialog from '../../Component/confirmDIalog';
import EmptyState from '../../Component/EmptyState';
import RoleBadge from '../../Component/UserRolebadge';
import Loading from '../../Component/loading';

/**
 * StudentTable component for displaying and managing users
 */
const StudentTable = () => {
  // State management
  const [students, setStudents] = useState({ users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  /**
   * Load users from API
   */
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Show confirmation dialog for user deletion
   * @param {Object} student - Student to delete
   */
  const confirmDelete = (student) => {
    setStudentToDelete(student);
    setShowConfirmModal(true);
  };

  /**
   * Handle user deletion
   */
  const handleDelete = async () => {
    if (!studentToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteUser(studentToDelete.id);
      
      // Update the students.users array
      setStudents({
        ...students,
        users: students.users.filter((student) => student.id !== studentToDelete.id)
      });
      
      // Show success toast
      showToast('Foydalanuvchi muvaffaqiyatli o\'chirildi', 'success');
      
    } catch (err) {
      // Show error toast
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
      setShowConfirmModal(false);
      setStudentToDelete(null);
    }
  };

  /**
   * Show toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type ('success' or 'error')
   */
  const showToast = (message, type) => {
    setToast({
      show: true,
      message,
      type
    });
  };

  /**
   * Close toast notification
   */
  const closeToast = () => {
    setToast({ ...toast, show: false });
  };

  // Render loading state
  if (loading) {
    return <Loading />;
  }

  // Render error state
  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Toast Notification */}
      <Toast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        show={showConfirmModal}
        user={studentToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* Main Table Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h1 className="text-2xl font-bold text-gray-800">Foydalanuvchilar ro'yxati</h1>
          <p className="text-sm text-gray-600 mt-1">Barcha ro'yxatdan o'tgan foydalanuvchilar</p>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    ID
                    <svg className="ml-1 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    Ism
                    <svg className="ml-1 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    Familiya
                    <svg className="ml-1 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    Role
                    <svg className="ml-1 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students?.users && students.users.length === 0 ? (
                <EmptyState />
              ) : (
                students?.users?.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.firstname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.lastname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <RoleBadge role={student.role} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => confirmDelete(student)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        title="O'chirish"
                        disabled={isDeleting}
                      >
                        <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        O'chirish
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer with pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Jami: <span className="font-medium">{students?.users?.length || 0}</span> foydalanuvchi
          </p>
          
          {/* Pagination placeholder */}
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
              Oldingi
            </button>
            <span className="text-sm text-gray-700">
              <span className="font-medium">1</span> / <span>1</span>
            </span>
            <button className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
              Keyingi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;