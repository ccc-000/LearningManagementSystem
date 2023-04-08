//This navigation bar is for students.
import { useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  BarChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  FileOutlined,
  PieChartOutlined,
  LogoutOutlined
  } from '@ant-design/icons';
  import { Layout, Menu, theme } from 'antd';
  import React from 'react';
  const { Header, Content, Footer, Sider } = Layout;
 
  const Navibar = () => {
    const navigate = useNavigate();
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const logOut = () => {
      localStorage.clear();
      navigate('/');
    }
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
          <Menu theme="dark" mode="inline" items={[
            {
              key: '1',
              icon: <DesktopOutlined />,
              label: 'Announcements',
              onClick: () => {navigate('/coursemainpage/announcements')},
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Online Lecture',
              onClick: () => {navigate('/coursemainpage/onlinelecture')},
            },
            {
              key: '3',
              icon: <FileOutlined />,
              label: 'Material',
              onClick: () => {navigate('/coursemainpage/material')},
            },
            {
              key: '4',
              icon: <TeamOutlined />,
              label: 'Forum',
              onClick: () => {navigate('/coursemainpage/forum')},
            },
            {
              key: '5',
              icon: <AppstoreOutlined />,
              label: 'Assignment',
              onClick: () => {navigate('/coursemainpage/assignmentStudent')},
            },
            {
              key: '6',
              icon: <BarChartOutlined />,
              label: 'Quiz',
              onClick: () => {navigate('/coursemainpage/quizStudent')},
            },
            {
                key: '7',
                icon: <PieChartOutlined />,
                label: 'Grade',
                onClick: () => {navigate('/coursemainpage/grade')},
            },
            {
              key: '8',
              icon: <LogoutOutlined />,
              label: 'Logout',
              style: { position: 'absolute', bottom: 0 },
              onClick: logOut(),
            }
          ]} />
        </Sider>
      </Layout>
    );
  };
  export default Navibar;