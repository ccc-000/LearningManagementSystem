import { Card, message } from 'antd';
import { useState, useEffect } from 'react';
import '../styles/CourseCard.css';

const ShowCourse = ({uid}) => {
  console.log('show course',uid);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    console.log(uid);
    fetch(`http://localhost:8000/createdcourses/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({'uid': uid}),
    }).then(async(response) => {
        const jsonRes = await response.json();
        console.log(jsonRes);
        if (response.status !== 200) {
            message.error(jsonRes.error);
            return;
        }
        message.success('Successful!');
        console.log(typeof jsonRes);
        console.log(jsonRes.courses);
        setCourseList(jsonRes.courses);
        // if (Array.isArray(jsonRes)) {
        //   setCourseList(jsonRes);
        // }
        // else {
        //   console.log('not an array', typeof jsonRes);
        // }
    })
  }, []);
  return (
    <div className='coursecard'>
      {courseList.map(courses => (
        <Card title={courses.coursename} key={courses.cid}>
          <p>{courses.coursedescription}</p>
        </Card>
      ))}
    </div>
  );
};

export default ShowCourse;

