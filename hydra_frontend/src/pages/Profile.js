import React, {useEffect} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Avatar, Timeline, Select, message } from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/Profile.css';
const { Option } = Select;

//通过uid获取用户信息并显示
//将修改后的prefer language提交到数据库

function Profile() {
    const [messageApi, contextHolder] = message.useMessage();

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
        .then((data) => {
          const profile_data = data.profile;
          console.log(profile_data);
        });
    }, []);
    
    //update language
    function handleChange() {
      messageApi.open({
        type: 'loading',
        content: 'Updating...',
        duration: 2,
      });
      setTimeout(() => {
        messageApi.open({
          type: 'success',
          content: 'Updated!',
          duration: 2,
        });
      }, 2100);
    }

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
              <p>First Name:</p>
              <p>Last Name:</p>
              <p>Gender:</p>
              <p>Birthday:</p>
              <p>Email:</p>
              <div id="ProfileDetail-Language">
                <p>Preferred Language:</p>
                <Select placeholder="select preferred language" defaultValue="english" style={{marginLeft:20}}>
                    <Option value="english">English</Option>
                    <Option value="french">French</Option>
                    <Option value="chinese">Chinese</Option>
                </Select>
                {contextHolder}
                <Button id="ProfileDetail-Update" type="primary" onClick={handleChange}>Update</Button>
              </div>
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
                pending="Recording..."
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