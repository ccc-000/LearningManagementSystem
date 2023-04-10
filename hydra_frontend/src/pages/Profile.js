import React, {useState, useEffect} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Avatar, Timeline} from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/Profile.css';

//通过uid获取用户信息并显示
//将修改后的prefer language提交到数据库

function Profile() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    // console.log(data2.courses);

    // const jsonToList = (data2) => {
    //   const enrollment_list = [];
    //   data2.courses.map((course) => {
    //     enrollment_list.push({
    //       children: {course}
    //     });
    //   }
    //   console.log(enrollment_list);
    //   return data2;
    // }

    useEffect(() => {
      fetch('http://localhost:8000/showprofile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: localStorage.uid
        }),
      })
        .then((response) => response.json())
        .then((data1) => {
          setData1(data1);
        });

      // fetch('http://localhost:8000/enrolledcourses/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     uid: localStorage.uid
      //   }),
      // })
      //   .then(response => response.json())
      //   .then(data2 => {
      //     setData2(data2);
      //   });
    }, []);

    return (
      <div className="ProfileDetail">
        <div id="ProfileDetail-Avatar">
          <Link to="/editavatar">
            <Avatar shape="square" size={110} icon={<UserOutlined />} />
          </Link>
        </div>
        <div id="ProfileDetail-Content">
          <Card
            title="Personal Information"
            bordered={false}
            style={{
            width: 380,
            height: 400,
            marginRight: 15,
            }}
          >
            <div>
              <p><span style={{ fontWeight: 'bold' }}>First Name:</span>{'\u00A0'}{'\u00A0'}{data1.Firstname}</p>
              <p><span style={{ fontWeight: 'bold' }}>Last Name:</span>{'\u00A0'}{'\u00A0'}{data1.Lastname}</p>
              <p><span style={{ fontWeight: 'bold' }}>Gender:</span>{'\u00A0'}{'\u00A0'}{data1.gender}</p>
              <p><span style={{ fontWeight: 'bold' }}>Birthday:</span>{'\u00A0'}{'\u00A0'}{data1.birthday}</p>
              <p><span style={{ fontWeight: 'bold' }}>Email:</span>{'\u00A0'}{'\u00A0'}{data1.email}</p>
              <p><span style={{ fontWeight: 'bold' }}>Preferred Language:</span>{'\u00A0'}{'\u00A0'}{data1.language}</p>
            </div>
            <Link to="/editprofile">
              <div id="ProfileDetail-Button">
                <Button type="primary" size="large" style={{width:100}}>
                  Edit
                </Button>
              </div>
            </Link>
          </Card>
          <Card
            title="Enrolment History"
            bordered={false}
            style={{
            width: 380,
            height: 400,
            marginLeft: 15,
            }}
            >
            <Timeline
                pending="More"
                items={[
                {
                    children: 'Term One, 2023 COMP9900',
                },
                {
                    children: 'Term One, 2023 COMP9321',
                },
                {
                    children: 'Term One, 2023 MATH5905',
                },
                ]}
            />
            <Link to="/enrolmenthistory">
              <div id="ProfileDetail-Button">
                <Button type="primary" size="large" style={{width:100}}>
                  Detail
                </Button>
              </div>
            </Link>
          </Card>
        </div>
      </div>
    );
  }
export default Profile;