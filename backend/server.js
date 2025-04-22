const gradeRoute = require('./routes/teacherRoutes');
const cors = require("cors");
require('dotenv').config();
const express = require("express");
const app = express();

const teacherRoutes = require('./routes/teacherRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRouter = require("./routes/studentRoutes");


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.use('/studentWork', gradeRoute);

app.use('/', authRoutes);
// app.use('/admin', adminRoutes);
// app.use('/teacher', teacherRoutes);
app.use('/student', studentRouter);
app.use('/teacher', teacherRoutes);

app.listen(PORT, () => {
  console.log(`Girgitton ${PORT}-portda xizmatda`);
});
