import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar paths={['admin','admin/add-user','admin/view-all-teachers']} panelName={'Admin'}/>
      <main className="flex-1 sm:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
