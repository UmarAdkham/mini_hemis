import React, { useEffect, useState } from 'react';

const ViewStudentWork = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem("studentId"); // yoki prop orqali ham berilishi mumkin

  useEffect(() => {
    if (!studentId) return;

    fetch(`http://localhost:4000/api/students/view-grades/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return <div className="text-center mt-10 text-xl font-medium">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Topshirilgan Ishlar</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-purple-100">
            <tr>
              <th className="text-left px-4 py-2 border">Sarlavha</th>
              <th className="text-left px-4 py-2 border">Fayl</th>
              <th className="text-left px-4 py-2 border">Baho</th>
              <th className="text-left px-4 py-2 border">Topshiriq ID</th>
            </tr>
          </thead>
          <tbody>
            {works.map((work, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-2 border">{work.title}</td>
                <td className="px-4 py-2 border">
                  <a href={`http://localhost:4000/${work.filepath}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">Yuklab olish</a>
                </td>
                <td className="px-4 py-2 border">{work.grade ?? "Baholanmagan"}</td>
                <td className="px-4 py-2 border">{work.task_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudentWork;
