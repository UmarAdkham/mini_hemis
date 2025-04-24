const express = require("express");
const teacherRouter = express.Router();

// import materials controllers
const {
  addMaterials,
  getAllMaterials,
  getMaterialById,
} = require("../controllers/teacher/addMaterial");

// import student work controllers
const { gradeWork } = require("../controllers/teacher/gradeStudent");

// import student controllers
// ...

// import courses controllers
const { getAllCourses } = require("../controllers/teacher/viewCourses");
const { deleteStudent } = require("../controllers/teacher/deleteStudent");
const { viewCourseStudents } = require("../controllers/student/viewCourses");
const uploadMiddleware = require("../middlewares/uploadFile");
const viewStudentsOfCourse = require("../controllers/student/viewCourseByStudentId");
// ...

// material routes
teacherRouter.post("/add-materials", uploadMiddleware, addMaterials);
teacherRouter.get("/get-all-materials", getAllMaterials);
teacherRouter.get("/get-material-detail/:course_id", getMaterialById);
teacherRouter.get("/get-course-students/:course_id", viewStudentsOfCourse);

// grade student work routes
teacherRouter.put("/:id/grade", gradeWork);

// student routes
teacherRouter.delete("/delete-student/:id", deleteStudent);

// courses routes
teacherRouter.get("/:teacherId/courses", getAllCourses);
teacherRouter.get("/course-students", viewCourseStudents);

module.exports = teacherRouter;
