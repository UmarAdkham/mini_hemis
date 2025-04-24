// components/ConfirmDialog.jsx
import React from 'react';

/**
 * Confirmation dialog component
 * @param {Object} props - Component props
 * @param {boolean} props.show - Whether to show the dialog
 * @param {Object} props.user - User to be deleted
 * @param {boolean} props.isDeleting - Whether deletion is in progress
 * @param {Function} props.onConfirm - Function to call when confirming
 * @param {Function} props.onCancel - Function to call when canceling
 */
const ConfirmDialog = ({ show, user, isDeleting, onConfirm, onCancel }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black bg-opacity-30" 
        onClick={() => !isDeleting && onCancel()}
      ></div>
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto z-10 shadow-lg">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mt-4">
            Foydalanuvchini o'chirish
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            {user?.firstname} {user?.lastname} foydalanuvchisini o'chirishni istaysizmi?
          </p>
        </div>
        <div className="mt-5 flex justify-center space-x-3">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Bekor qilish
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                O'chirilmoqda...
              </div>
            ) : "O'chirish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;