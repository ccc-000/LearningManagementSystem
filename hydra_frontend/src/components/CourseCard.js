import { Card, message } from 'antd';
import { useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import '../styles/CourseCard.css';

const ShowCourse = ({uid}) => {
  console.log('show course',uid);
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  const handleNavigate = (id) => {
    localStorage.setItem('cid', id);
    navigate('/coursemainpage');
  };
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
    })
  }, []);
  return (
    <div className='coursecard'>
      {courseList.map(courses => (
        <Card 
        className='card'
        title={courses.coursename} 
        key={courses.cid}
        onClick={() => handleNavigate(courses.cid)}>
          <p>{courses.coursedescription}</p>
        </Card>
      ))}
    </div>
  );
};

export default ShowCourse;

