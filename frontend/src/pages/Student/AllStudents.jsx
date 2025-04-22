import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AllStudents() {
    const [students, setStudents] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:4000/students`)
        .then(res => {
            setStudents(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
        })
    }, []);
  return (
    <div>{
    students?.map(student => {
        return (
            <div className="student_table">
                <h2>{student.firstname} {student.lastname}</h2>
            </div>
        )
    })    
    }</div>
  )
}
