import { Card, message, Dropdown, Menu} from 'antd';
import {
  MoreOutlined
} from '@ant-design/icons';
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

  const dropCourse =({cid}) => {
    fetch('http://localhost:8000/dropcourses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({'uid': uid, 'cid': cid}),
    }).then(async(response) => {
      const jsonRes = await response.json();
      console.log(jsonRes);
      if (response.status !== 200) {
          message.error(jsonRes.error);
          return;
      }
      getCourses();
      message.success('Successful!');
    })};

  return (
    <div className='coursecard'>
      {courseList.map(courses => (
      //   <Card
      //   hoverable
      //   className='courseCard'
      //   cover={
      //     <img
      //       alt="course"
      //       src={pic}
      //     />
      //   }
      //   style={{ position: "relative" }}
      //   actions={[
      //     <Dropdown
      //       overlay={
      //         <Menu onClick={() => dropCourse(courses.cid)}>
      //           <Menu.Item key="1">Drop Course</Menu.Item>
      //         </Menu>
      //       }
      //       style={{ border: "none", position: "absolute", bottom: 0, right: 0 }}
      //     >
      //       <MoreOutlined style={{ fontSize: 16 }} onClick={() => {}} />
      //     </Dropdown>
      //   ]}
      // >
      //   <Meta
      //     className='meta'
      //     title={courses.coursename}
      //     description={courses.coursedescription}
      //   />
      //   <div onClick={() => handleNavigate(courses.cid)} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}></div>
      // </Card>
      
      
      
      
        <Card
          hoverable
          className="courseCard"
          cover={<img alt="course" src={pic} />}
        >
          
          <Meta
            className="meta"
            title={courses.coursename}
            description={courses.coursedescription}
          />
          <div style={{ position: "relative", display: "flex" }}>
            <Dropdown
              overlay={
                <Menu onClick={() => dropCourse(courses.cid)}>
                  <Menu.Item key="1">Drop Course</Menu.Item>
                </Menu>
              }
              style={{ border: "none" }}
              placement="bottomRight"
            >
              <button
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}
              >
                <MoreOutlined style={{ fontSize: 16 }} />
              </button>
            </Dropdown>
            <div
              onClick={() => handleNavigate(courses.cid)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
              }}
            ></div>
          </div>
        </Card>
      
      
      
      
      ))}
    </div>
  );
};

export default ShowCourse;
