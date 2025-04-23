import React, { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [teacherForm, setTeacherForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const [studentForm, setStudentForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const [teacherError, setTeacherError] = useState("");
  const [teacherSuccess, setTeacherSuccess] = useState("");
  const [studentError, setStudentError] = useState("");
  const [studentSuccess, setStudentSuccess] = useState("");

  const handleTeacherChange = (e) => {
    setTeacherForm({ ...teacherForm, [e.target.name]: e.target.value });
  };

  const handleStudentChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleTeacherSubmit = async () => {
    // Validate form fields
    if (
      !teacherForm.firstname ||
      !teacherForm.lastname ||
      !teacherForm.username ||
      !teacherForm.password
    ) {
      setTeacherError("Barcha maydonlar to'ldirilishi kerak!");
      return;
    }

    try {
      // Log the data being sent for debugging
      console.log("Sending teacher data:", teacherForm);

      const response = await axios.post(
        "http://localhost:4000/admin/add-teacher",
        teacherForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Log the response for debugging
      console.log("Teacher API response:", response);

      setTeacherSuccess(response.data.message);
      setTeacherError("");
      setTeacherForm({ firstname: "", lastname: "", username: "", password: "" });
    } catch (err) {
      // Log the full error for debugging
      console.error("Error adding teacher:", err);
      const errorMessage =
        err.response?.data?.error || "Failed to add teacher.";
      setTeacherError(errorMessage);
      setTeacherSuccess("");
    }
  };

  const handleStudentSubmit = async () => {
    if (
      !studentForm.firstname ||
      !studentForm.lastname ||
      !studentForm.username ||
      !studentForm.password
    ) {
      setStudentError("Barcha maydonlar to'ldirilishi kerak!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/admin/add-student",
        studentForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStudentSuccess(response.data.message);
      setStudentError("");
      setStudentForm({ firstname: "", lastname: "", username: "", password: "" });
    } catch (err) {
      setStudentError(err.response?.data?.error || "Failed to add student.");
      setStudentSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Panel
        </h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add Teacher
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstname"
              value={teacherForm.firstname}
              onChange={handleTeacherChange}
              placeholder="First Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastname"
              value={teacherForm.lastname}
              onChange={handleTeacherChange}
              placeholder="Last Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="username"
              value={teacherForm.username}
              onChange={handleTeacherChange}
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              value={teacherForm.password}
              onChange={handleTeacherChange}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleTeacherSubmit}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Teacher
          </button>
          {teacherError && (
            <p className="text-red-500 text-sm mt-2">{teacherError}</p>
          )}
          {teacherSuccess && (
            <p className="text-green-500 text-sm mt-2">{teacherSuccess}</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add Student
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstname"
              value={studentForm.firstname}
              onChange={handleStudentChange}
              placeholder="First Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastname"
              value={studentForm.lastname}
              onChange={handleStudentChange}
              placeholder="Last Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="username"
              value={studentForm.username}
              onChange={handleStudentChange}
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              value={studentForm.password}
              onChange={handleStudentChange}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleStudentSubmit}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add Student
          </button>
          {studentError && (
            <p className="text-red-500 text-sm mt-2">{studentError}</p>
          )}
          {studentSuccess && (
            <p className="text-green-500 text-sm mt-2">{studentSuccess}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;