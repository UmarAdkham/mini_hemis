import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import StudentLayout from "../layouts/StudentLayout";
import Admin from "../pages/Admin";
import Teacher from "../pages/Teacher";
import Student from "../pages/Student/viewstudent";
import AddMaterials from "../pages/Teacher/AddMaterials";
import AddTask from "../pages/Teacher/AddTask";
import ViewAllCourses from "../pages/Teacher/ViewTeacherCourses"
import ViewStudents from "../pages/Student/viewstudent";
import AdminPage from "../pages/Admin/AddUserpage";
import ViewAllTeachers from "../pages/Admin/ViewAllTeacher";

export const routes = [
  {
    path: "/admin",
    layout: AdminLayout,
    children: [
      { path: "", element: <Admin /> },
      { path: "all-users", element: <StudentTable /> },
      { path: 'add-user', element: <AdminPage /> },
      { path: 'view-all-teachers', element: <ViewAllTeachers /> }
    ],
  },
  {
    path: "/teacher",
    layout: TeacherLayout,
    children: [
      { path: "", element: <Teacher /> },
      { path: "add-materials", element: <AddMaterials /> },
      { path: ":teacherId/courses", element: <ViewAllCourses /> },
      { path: "view-teacher-courses", element: <ViewAllCourses /> },
      { path: "add-task", element: <AddTask /> }
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
