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
// ...

// material routes
teacherRouter.post("/add-materials", addMaterials);
teacherRouter.get("/get-all-materials", getAllMaterials);
teacherRouter.get("/get-material-detail/:course_id", getMaterialById);

// grade student work routes
teacherRouter.put("/:id/grade", gradeWork);

// student routes
// ...

// courses routes
teacherRouter.get("/all-courses", getAllCourses);

module.exports = teacherRouter;
