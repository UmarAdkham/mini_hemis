import React from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function TeacherLayout() {
  return (
    <div className="flex justify-center">
      <Sidebar paths={['teacher', 'teacher/add-materials', 'teacher/view-teacher-courses']} />
      <main className="flex-1 sm:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

export default TeacherLayout;
