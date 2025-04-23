import React from "react";
import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex">
      <aside className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <Link to="/admin">Dashboard</Link>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
