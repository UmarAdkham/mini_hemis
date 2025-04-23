import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CreateCourse() {
  const { teacherId } = useParams();
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!name.trim()) {
      setError("Please enter the course name.");
      return;
    }

    if (!teacherId) {
      setError("Teacher ID is missing in the URL.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:4000/admin/create-course/${teacherId}`,
        { name }
      );

      setMessage(res.data.message);
      setName("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-12 px-6 py-8 bg-white rounded-2xl shadow-2xl"
    >
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
        Create a New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Course Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. Frontend Basics"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition duration-200"
        >
          Create Course
        </button>

        {message && (
          <p className="text-green-600 text-sm mt-2 text-center font-medium">
            ✅ {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 text-sm mt-2 text-center font-medium">
            ⚠️ {error}
          </p>
        )}
      </form>
    </div>
  );
}
