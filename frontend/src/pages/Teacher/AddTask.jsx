"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UploadIcon, XIcon } from "./Icons"; // Mos ikonlarni import qiling

function AddTask() {
  const [activeTab, setActiveTab] = useState("add");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("course_id", 2); // kurs ID har doim o'zgaruvchan bo'lishi mumkin

    if (!title || !description || !file) {
      document.querySelector(".info").classList.remove("hidden");
      document.getElementById("info-msg").textContent =
        "Iltimos, barcha maydonlarni to‘ldiring.";
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/teacher/add-task", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        document.querySelector(".success").classList.remove("hidden");
        document.getElementById("success-msg").textContent = response.data.message;
        fetchTasks();
        setTitle("");
        setDescription("");
        setFile(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/teacher/get-all-tasks");
      if (response) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Topshiriqlar</h1>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "add"
                ? "border-b-3 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("add")}
          >
            Topshiriq Qo‘shish
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "list"
                ? "border-b-3 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("list")}
          >
            Barcha Topshiriqlar
          </button>
        </div>
      </div>

      {/* Add Task Form */}
      {activeTab === "add" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Yangi Topshiriq Qo‘shish</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Topshiriq Nomi</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Masalan: 1-labaratoriya"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Topshiriq Tavsifi</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Tavsif kiriting"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fayl</label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                  file ? "border-green-300 bg-green-50" : "border-gray-300"
                }`}
              >
                <input type="file" id="task-file" className="hidden" onChange={handleFileChange} />
                <label htmlFor="task-file" className="cursor-pointer w-full text-center">
                  {!file ? (
                    <div className="flex flex-col items-center gap-2">
                      <UploadIcon className="h-8 w-8 text-gray-400" />
                      <p className="text-sm font-medium">
                        Faylni tanlash uchun bosing yoki bu yerga tashlang
                      </p>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center w-full">
                      <span className="truncate">{file.name}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFile();
                        }}
                      >
                        <XIcon className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="p-4 my-4 text-green-800 rounded-lg bg-green-50 border border-green-300 hidden success">
              <span className="font-medium">Muvaffaqiyat!</span>{" "}
              <span id="success-msg"></span>
            </div>

            <div className="p-4 my-4 text-blue-800 bg-blue-50 border border-blue-300 rounded-lg hidden info">
              <span className="font-medium">Eslatma!</span>{" "}
              <span id="info-msg"></span>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Topshiriq Qo‘shish
            </button>
          </form>
        </div>
      )}

      {/* Task List */}
      {activeTab === "list" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Barcha Topshiriqlar</h2>
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 border rounded-md hover:bg-gray-50 transition"
                >
                  <h3 className="text-lg font-medium">{task.title}</h3>
                  <p className="text-gray-500">{task.description}</p>
                  <a
                    href={`http://localhost:4000/uploads/${task.filepath}`}
                    className="text-blue-600 text-sm underline mt-2 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Faylni ko‘rish / yuklab olish
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Topshiriqlar topilmadi</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;
