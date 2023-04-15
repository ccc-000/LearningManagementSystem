import { Card, message } from 'antd';
import { useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import pic from '../img/unsw.jpeg';
import '../styles/CourseCard.css';

const { Meta } = Card;
const ShowCourse = ({uid, role}) => {
  let fetchUrl;
  if (role === 'lecturer') {
    fetchUrl = 'createdcourses';
  }
  else if (role === 'student'){
    fetchUrl = 'enrolledcourses';
  }
  console.log('show course',uid);
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  const handleNavigate = (id) => {
    localStorage.setItem('cid', id);
    navigate('/coursemainpage');
  };
  const getCourses = () => {
    fetch(`http://localhost:8000/${fetchUrl}/`, {
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
        console.log('show course list success');
        console.log(jsonRes.courses);
        setCourseList(jsonRes.courses);
    })
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className='coursecard'>
      {courseList.map(courses => (
        // <Card 
        // className='card'
        // title={courses.coursename} 
        // key={courses.cid}
        // onClick={() => handleNavigate(courses.cid)}>
        //   <p>{courses.coursedescription}</p>
        // </Card>
        <Card
          hoverable
          className='courseCard'
          cover={
              <img
                  alt="course"
                  src={pic}
              />}
          onClick={() => handleNavigate(courses.cid)}    
        >
          <Meta className='meta' title={courses.coursename}  description={courses.coursedescription}/>
        </Card>
      ))}
    </div>
  );
};

export default ShowCourse;

