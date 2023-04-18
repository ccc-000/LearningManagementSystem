import React, {useState, useEffect} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Avatar, Timeline} from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/Profile.css';

function Profile() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    console.log(data2.courses);

    const role = localStorage.getItem('role');
    console.log('role', role);

    const jsonToList = (data2) => {
      const enrollment_list = data2.courses.map((course) => {
        return {
          children: course.coursename
        }
      });
      enrollment_list.sort(function(a, b) {
        return b.children.localeCompare(a.children);
      });
      return enrollment_list.slice(0, 3);
    }

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
        .then(data2 => {
          setData2(jsonToList(data2));
        });
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
            fontSize: 15,
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
          { role === "student" ?
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
                  items={data2}
              />
              <Link to="/enrolmenthistory">
                <div id="ProfileDetail-Button">
                  <Button type="primary" size="large" style={{width:100}}>
                    Detail
                  </Button>
                </div>
              </Link>
            </Card>
          :
            <Card
                title="Course History"
                bordered={false}
                style={{
                width: 380,
                height: 400,
                marginLeft: 15,
                }}
                >
                <Timeline
                    pending="More"
                    items={data2}
                />
                <Link to="/enrolmenthistory">
                  <div id="ProfileDetail-Button">
                    <Button type="primary" size="large" style={{width:100}}>
                      Detail
                    </Button>
                  </div>
                </Link>
              </Card>
          }
        </div>
      </div>
    );
  }
export default Profile;