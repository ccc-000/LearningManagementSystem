import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Avatar, Timeline, Select, message } from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/reset.css';
import './Profile.css';
const { Option } = Select;


function Profile() {
    const [messageApi, contextHolder] = message.useMessage();
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
    //时间轴
    return (
      <div className="ProfileDetail">
        <div id="ProfileDetail-Avatar">
          <Link to="/EditAvatar">
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
            <Link to="/EditProfile">
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
            <Link to="/CourseHistory">
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