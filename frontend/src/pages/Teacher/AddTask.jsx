import axios from "axios";
import React, { useEffect, useState } from "react";

const AddTask = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

     
  
  // const handleSubmit = async () => {
  //   try {
  //     const result = await axios.post(`http://localhost:4000/teacher/add-task`,{
  //       "title": title,
  //       "description": description,
  //       "course_id"
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-5">Add New Task</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTask;
