// components/RoleBadge.jsx
import React from 'react';

/**
 * Role badge component
 * @param {Object} props - Component props
 * @param {string} props.role - User role
 */
const RoleBadge = ({ role }) => (
  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
    role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
  }`}>
    {role}
  </span>
);

export default RoleBadge;