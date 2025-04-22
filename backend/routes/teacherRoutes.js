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
// ...

// material routes
teacherRouter.post("/add-materials", addMaterials);
teacherRouter.get("/get-all-materials", getAllMaterials);
teacherRouter.get("/get-material-detail/:course_id", getMaterialById);

// grade student work routes
teacherRouter.put("/:id/grade", gradeWork);

// student routes
teacherRouter.post("/delete-student/:id", deleteStudent);

// courses routes
teacherRouter.get("/all-courses", getAllCourses);
teacherRouter.get("/course-students", viewCourseStudents);

module.exports = teacherRouter;
