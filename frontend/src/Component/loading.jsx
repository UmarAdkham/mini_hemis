// components/Loading.jsx
import React from 'react';

/**
 * Loading spinner component
 */
const Loading = () => (
  <div className="flex justify-center items-center h-64">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      <p className="mt-4 text-gray-600 font-medium">Yuklanmoqda...</p>
    </div>
  </div>
);

export default Loading;