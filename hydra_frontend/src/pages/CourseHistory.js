import React, { useState, useEffect } from 'react';
import { Card, Button, Timeline } from 'antd';
import 'antd/dist/reset.css';
import '../styles/CourseHistory.css';

function CourseHistory() {
    const [reverse, setReverse] = useState(false);
    const [data, setData] = useState([]);

    const role = localStorage.getItem('role');
    console.log('role', role);

    //reverse timeline
    const handleClick = () => {
        setReverse(!reverse);
    };

    const jsonToList = (data2) => {
        const enrollment_list = data2.courses.map((course) => {
          return {
            children: course.coursename
          }
        });
        enrollment_list.sort(function(a, b) {
          return b.children.localeCompare(a.children);
        });
        return enrollment_list;
      }

      useEffect(() => {  
        fetch('http://localhost:8000/enrolledcourses/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: localStorage.uid
          }),
        })
          .then(response => response.json())
          .then(data => {
            setData(jsonToList(data));
          });
      }, []);

    return (
        <div className="EnrolmentHistory">
            <Card
                id="EnrolmentHistory-Card"
                bordered={false}
                style={{
                width: 780,
                height: 500,
                }}
            >
                {role === "student" ? <div id="EnrolmentHistory-Title"><span>Enrolment History</span></div> : <div id="EnrolmentHistory-Title"><span>Course History</span></div>}
                <div id="EnrolmentHistory-Content">
                    <Timeline
                        reverse={reverse}
                        items={data}
                    />
                </div>
                <div id="EnrolmentHistory-ToggleReverse"><Button type="primary" onClick={handleClick} size="large">Toggle Reverse</Button></div>
            </Card>
        </div>
    );
}

export default CourseHistory;