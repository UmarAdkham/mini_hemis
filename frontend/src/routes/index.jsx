import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import StudentLayout from "../layouts/StudentLayout";
import Admin from "../pages/Admin";
import Teacher from "../pages/Teacher";
import Student from "../pages/Student/viewstudent";
import AddMaterials from "../pages/Teacher/AddMaterials";
import ViewAllCourses from "../pages/Teacher/ViewTeacherCourses";
import ViewStudents from "../pages/Student/viewstudent";
export const routes = [
  {
    path: "/admin",
    layout: AdminLayout,
    children: [
      { path: "", element: <Admin /> },
      { path: 'add-user', element: <AdminPage /> },
    ],
  },
  {
    path: "/teacher",
    layout: TeacherLayout,
    children: [
      { path: "", element: <Teacher /> },
      { path: "add-materials", element: <AddMaterials /> },
      { path: ":teacherId/courses", element: <ViewAllCourses />}
    ],
  },
  {
    path: "/student",
    layout: StudentLayout,
    children: [
      { path: "", element: <Student /> },
      { path: "viewStudent", element: <ViewStudents /> },
    ],
  },
];

export default routes;
