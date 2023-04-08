import { Card, message } from 'antd';
import { useState, useEffect } from 'react';


const ShowCourse = ({uid}) => {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/createdcourses/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(uid),
    }).then(async(response) => {
        const jsonRes = await response.json();
        if (response.status !== 200) {
            message.error(jsonRes.error);
            return;
        }
        message.success('Successful!');
        setCourseList(jsonRes);
    })
  }, []);
  return (
    <div>
      {courseList.map(course => (
        <Card title={course.coursename} key={course.cid}>
          <p>{course.coursedescription}</p>
    
        </Card>
      ))}
    </div>
  );
};

export default ShowCourse;
