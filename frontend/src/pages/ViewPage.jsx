import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewPage() {
    const [viewGrade, setViewGrade] = useState([]);
    const { student_id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/student/view-grades/${student_id}`)
            .then(res => {
                setViewGrade(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [student_id]);

    return (
        <div className='view_page'>
            {viewGrade.length === 0 ? (
                <p>Loading or no grades available.</p>
            ) : (
                viewGrade.map(student => (
                    <div className="student_page" key={student.id}>
                        <h2>{student.grade}</h2>
                    </div>
                ))
            )}
        </div>
    );
}

export default ViewPage;