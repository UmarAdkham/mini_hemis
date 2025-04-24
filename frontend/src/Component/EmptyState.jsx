// components/EmptyState.jsx
import React from 'react';

/**
 * Empty state component for when no users are found
 */
const EmptyState = () => (
  <tr>
    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
      <div className="flex flex-col items-center">
        <svg className="h-12 w-12 text-gray-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-medium">Foydalanuvchilar topilmadi</p>
        <p className="text-sm text-gray-500 mt-1">Hozircha hech qanday foydalanuvchi mavjud emas</p>
      </div>
    </td>
  </tr>
);

export default EmptyState;