import React, { useState, useEffect } from 'react';

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API dan talabalarni olish
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:4000/student/students');
                if (!response.ok) {
                    throw new Error('Ma\'lumotlarni yuklashda xato');
                }
                const data = await response.json();
                setStudents(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Talabani o'chirish funksiyasi
    const handleDelete = async (id) => {
        if (window.confirm('Bu talaba ma\'lumotlarini o\'chirishni xohlaysizmi?')) {
            try {
                const response = await fetch(`http://localhost:4000/delete-student/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('O\'chirishda xato yuz berdi');
                }
                setStudents(students.filter((student) => student.id !== id));
            } catch (err) {
                alert('Xato: ' + err.message);
            }
        }
    };

    // Edit funksiyasi (vaqtincha placeholder)
    const handleEdit = (student) => {
        alert(`Talaba ID: ${student.student_id} uchun tahrirlash oynasi ochiladi`);
        // Bu yerga tahrirlash logikasini qo'shishingiz mumkin (modal yoki forma)
    };

    if (loading) {
        return <p className="text-center text-gray-500">Yuklanmoqda...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Xato: {error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Talabalar ro'yxati</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Ism</th>
                        <th className="border px-4 py-2">Familiya</th>
                        <th className="border px-4 py-2">Amallar</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.student_id}>
                            <td className="border px-4 py-2">{student.student_id}</td>
                            <td className="border px-4 py-2">{student.firstname}</td>
                            <td className="border px-4 py-2">{student.lastname}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(student)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Tahrirlash
                                </button>
                                <button
                                    onClick={() => handleDelete(student.student_id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    O'chirish
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;