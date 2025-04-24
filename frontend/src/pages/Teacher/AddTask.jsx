import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddTask = () => {
  const { course_id } = useParams(); // URL params orqali course_id olinadi
  const [tasks, setTasks] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...tasks];
    updated[index][field] = value;
    setTasks(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...tasks];
    updated[index].file = file;
    setTasks(updated);
  };

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { id: Date.now(), title: "", description: "", file: null },
    ]);
  };

  const handleSubmit = async (task) => {
    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("description", task.description);
    formData.append("course_id", course_id); // URL params orqali keldi
    formData.append("file", task.file);

    try {
      const res = await axios.post(
        "http://localhost:4000/teacher/add-task",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Topshiriq yuborildi");
      console.log(res.data);
    } catch (err) {
      console.error("Xatolik:", err);
      alert("Xatolik yuz berdi");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Topshiriq Qo‘shish</h1>

      <button
        onClick={handleAddTask}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        + Yangi Topshiriq
      </button>

      <div className="space-y-6">
        {tasks.map((task, i) => (
          <div key={task.id} className="bg-white rounded-2xl shadow-md p-5 space-y-4">
            <input
              type="text"
              placeholder="Sarlavha"
              className="w-full p-3 border border-gray-300 rounded-xl"
              value={task.title}
              onChange={(e) => handleChange(i, "title", e.target.value)}
            />
            <textarea
              placeholder="Tavsif"
              className="w-full p-3 border border-gray-300 rounded-xl"
              value={task.description}
              onChange={(e) => handleChange(i, "description", e.target.value)}
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="w-full border border-dashed border-gray-400 p-3 rounded-xl bg-gray-50"
              onChange={(e) => handleFileChange(i, e.target.files[0])}
            />
            <button
              onClick={() => handleSubmit(task)}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              Yuborish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddTask;
