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
import SingleCourse from "../pages/Teacher/SingleCourse";
import StudentTable from "../pages/Admin/AllUsers";
import StudentCoursePage from "../pages/Student/StudentCoursePage";
import MyCourse from "../pages/Student/MyCourse";
 
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
      { path: "add-materials/:course_id", element: <AddMaterials /> },
      { path: ":teacherId/courses", element: <ViewAllCourses /> },
      { path: "view-teacher-courses", element: <ViewAllCourses /> },
      { path: "add-task", element: <AddTask /> },
      { path: "single-course/:id", element: <SingleCourse />}
    ],
  },
  {
    path: "/student",
    layout: StudentLayout,
    children: [
      { path: "", element: <Student /> },
      { path: "viewStudent", element: <ViewStudents /> },
      { path: "view-all-course", element: <StudentCoursePage /> },
      { path: "my-course", element: <MyCourse /> }



    ],
  },
];

export default routes;
