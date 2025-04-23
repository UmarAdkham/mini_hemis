const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();

// const authRoutes = require("./routes/authRoutes");
const studentRouter = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const adminRoute = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const { authentication } = require("./middlewares/authentication");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/", authRoutes);

app.use(authentication);

app.use("/admin", adminRoute);
app.use("/student", studentRouter);
app.use("/teacher", teacherRoutes);

app.listen(PORT, () => {
  console.log(`Girgitton ${PORT}-portda xizmatda`);
});
