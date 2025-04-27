import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function TeacherLayout() {
  return (
    <div>
      <Sidebar paths={['/', 'view-teacher-courses']} panelName={'teacher'}/>
      <main className="sm:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

export default TeacherLayout;
