const cors = require("cors");
require('dotenv').config();
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// app.use('/', authRoutes);
// app.use('/admin', adminRoutes);
// app.use('/teacher', teacherRoutes);
// app.use('/student', studentRoutes);

app.listen(PORT, () => {
  console.log(`Girgitton ${PORT}-portda xizmatda`);
});
