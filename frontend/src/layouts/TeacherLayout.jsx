import React from "react";
import { Outlet, Link } from "react-router-dom";

function TeacherLayout() {
  return (
    <div className="flex">
      <aside className="w-64 bg-green-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Teacher Panel</h2>
        <Link to="/teacher">Dashboard</Link>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default TeacherLayout;
