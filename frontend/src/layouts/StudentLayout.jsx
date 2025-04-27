import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function StudentLayout() {
  return (
    <div>
      <Sidebar paths={['/','view-all-course','my-course']} panelName={'student'}/>
      <main className="sm:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;