import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API dan talabalarni olish
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:4000/admin/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                });
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

    console.log(students);

    // Talabani o'chirish funksiyasi
    const handleDelete = async (id) => {
        if (window.confirm('Bu talaba ma\'lumotlarini o\'chirishni xohlaysizmi?')) {
            try {
                const response = await fetch(`http://localhost:4000/admin/delete-student/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('O\'chirishda xato yuz berdi');
                }
                setStudents(students?.filter((student) => student.id !== id));
            } catch (err) {
                alert('Xato: ' + err.message);
            }
        }
    };

    const handleEdit = (student) => {
        alert(`Talaba ID: ${student.student_id} uchun tahrirlash oynasi ochiladi`);
        // Bu yerga tahrirlash logikasini qo'shishingiz mumkin (modal yoki forma)
    };

    if (loading) {
        return <p className="text-center text-gray-500 mt-5">Yuklanmoqda...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Xato: {error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Foydalanuvchilar ro'yxati</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Ism</th>
                        <th className="border px-4 py-2">Familiya</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Amallar</th>
                    </tr>
                </thead>
                <tbody>
                    {students?.users.map((student) => (
                        <tr key={student.id}>
                            <td className="border px-4 py-2">{student.id}</td>
                            <td className="border px-4 py-2">{student.firstname}</td>
                            <td className="border px-4 py-2">{student.lastname}</td>
                            <td className="border px-4 py-2">{student.role}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(student)}
                                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition focus:outline-none mx-4"
                                    title="Tahrirlash"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition focus:outline-none"
                                    title="O'chirish"
                                >
                                    <TrashIcon className="h-5 w-5" />
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