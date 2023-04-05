import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Divider } from 'antd';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  DesktopOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

//Course description
function CourseDes () {
  return (
      <>
      <Divider orientation="left">
          <h2>Course Description</h2>
      </Divider>
      <p style={{fontSize:'20px'}}>
      A capstone software project. Students work in teams to define, implement and evaluate a real-world software system.
      Most of the work in this course is team-based project work, although there are some introductory lectures on software project management and teamwork strategies.
      Project teams meet weekly with project mentors to report on the progress of the project.
      </p>
      </>
  )
}

function Announcements () {
  return (
      <>
      <Divider orientation="left">
          <h2>Announcements</h2>
      </Divider>
      <Card style={{background:'lightblue'}}title="Week1 Lecture Recording is avaliable">
      <p style={{fontSize:'17px'}}>
      The recording for this afternoon's lecture is now available.
      Go to the Course Material page on the course website and you will find it under Week 1.
      </p>
      </Card>
      </>
  )
}

const Coursemainpage = (props) => {
  const navigate = useNavigate();

  function getItem(label, key, icon, onClick) {
    return {
      label,
      key,
      icon,
      onClick
    };
  }
  
  const items = [
    getItem('Announcements', '1', <DesktopOutlined />, () => {navigate('/forum')}),
    getItem('Online Lecture', '2', <VideoCameraOutlined />),
    getItem('Material', '3', <FileOutlined />),
    getItem('Forum', '4', <TeamOutlined />),
    getItem('Assignment', '5', <AppstoreOutlined />),
    getItem('Quiz', '6', <BarChartOutlined />),
  ];

  // These are the bottons on the sidebar
  const Items = props.role === 'lecturer' ? [
      UserOutlined,
      VideoCameraOutlined,
      UploadOutlined,
      BarChartOutlined,
      CloudOutlined,
      AppstoreOutlined,
      TeamOutlined,
      ShopOutlined,
  ].map((icon, index) => ({
      key: String(index + 1),
      icon: React.createElement(icon),
      label: `nav ${index + 1}`,
  })) : [
      UserOutlined,
      VideoCameraOutlined,
      UploadOutlined,
      ShopOutlined,
  ].map((icon, index) => ({
      key: String(index + 1),
      icon: React.createElement(icon),
      label: `nav ${index + 1}`,
  }));

  const {
      token: { colorBgContainer },
  } = theme.useToken();
  return (
      <Layout hasSider>
        <Sider
          style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
          }}
        >
          <div
              style={{
                  height: 32,
                  margin: 16,
                  background: 'rgba(255, 255, 255, 0.2)',
              }}
          />
          <Menu theme="dark" mode="inline" items={items} />
        </Sider>
      <Layout
          className="site-layout"
          style={{
              minHeight: '100vh',
              marginLeft: 210,
          }}
      >

              {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
              <Content
                style={{
                    margin: '24px 16px 0',
                    overflow: 'initial',
                }}
              >
                {props.children}
                <div>
                  <CourseDes />
                </div>
                <Announcements />
              </Content>
              <Footer
                  style={{
                      textAlign: 'center',
                  }}
              >
                  Hydra Learning management system©2023 Created by COMP9900 HYDRA Group
              </Footer>
          </Layout>
      </Layout>
  );
};

export default Coursemainpage;