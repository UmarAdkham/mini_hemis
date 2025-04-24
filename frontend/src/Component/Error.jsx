// components/Error.jsx
import React from 'react';

/**
 * Error display component
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 */
const Error = ({ message }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-2xl mx-auto mt-5" role="alert">
    <div className="flex items-center">
      <div className="py-1">
        <svg className="h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="font-bold">Xato yuz berdi</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  </div>
);

export default Error;