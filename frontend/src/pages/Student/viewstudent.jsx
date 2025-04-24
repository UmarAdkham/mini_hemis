// import React, { useEffect, useState } from 'react';

// const ViewStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:4000/student/students',{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "Authorization": `Bearer ${localStorage.getItem('token')}`,
//       },
//     }) // Endpoint manzilingiz
//       .then(res => res.json())
//       .then(data => {
//         setStudents(data.students); // backendda `students: result.rows` bor
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Xatolik:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-10 text-xl font-medium">Yuklanmoqda...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-center mb-6">Talabalar ro'yxati</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead className="bg-blue-100">
//             <tr>
//               <th className="text-left px-4 py-2 border">ID</th>
//               <th className="text-left px-4 py-2 border">Ismi</th>
//               <th className="text-left px-4 py-2 border">Familiyasi</th>
//               <th className="text-left px-4 py-2 border">Foydalanuvchi nomi</th>
//               <th className="text-left px-4 py-2 border">Roli</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student, index) => (
//               <tr key={student.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                 <td className="px-4 py-2 border">{student.id}</td>
//                 <td className="px-4 py-2 border">{student.firstname}</td>
//                 <td className="px-4 py-2 border">{student.lastname}</td>
//                 <td className="px-4 py-2 border">{student.username}</td>
//                 <td className="px-4 py-2 border capitalize">{student.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewStudents;

import React from 'react'

function viewstudent() {
  return (
    <div>viewstudent</div>
  )
}

export default viewstudent