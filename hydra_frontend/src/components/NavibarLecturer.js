//This navigation bar is for lecturers.
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
              onClick: () => {navigate('/coursemainpageLecturer/announcementsLecturer')},
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Online Lecture',
              onClick: () => {navigate('/coursemainpageLecturer/onlinelecture')},
            },
            {
              key: '3',
              icon: <FileOutlined />,
              label: 'Material',
              onClick: () => {navigate('/coursemainpageLecturer/material')},
            },
            {
              key: '4',
              icon: <TeamOutlined />,
              label: 'Forum',
              onClick: () => {navigate('/coursemainpageLecturer/forum')},
            },
            {
              key: '5',
              icon: <AppstoreOutlined />,
              label: 'Assignment',
              onClick: () => {navigate('/coursemainpageLecturer/assignmentLecturer')},
            },
            {
              key: '6',
              icon: <BarChartOutlined />,
              label: 'Quiz',
              onClick: () => {navigate('/coursemainpageLecturer/quizLecturer')},
            },
            {
              key: '7',
              icon: <LogoutOutlined />,
              label: 'Logout',
              style: { position: 'absolute', bottom: 0 },
              onClick: () => {navigate('/')},
            }
          ]} />
        </Sider>
      </Layout>
    );
  };
  export default Navibar;