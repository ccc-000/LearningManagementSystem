import pic from '../img/unsw.jpeg';
import avatar from '../img/avatar.png';
import '../styles/DashboardPage.css';
import {
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {Form, Input, Button, Card, Layout, Menu, Modal, Avatar, message} from 'antd';
import React, {useRef, useState} from 'react';
import Draggable from 'react-draggable';
import {Link, useNavigate } from 'react-router-dom';
import ShowCourse from '../components/CourseCard';

const {Content, Footer, Sider} = Layout;



function Dashboard() {
    const uid=localStorage.getItem('uid');
    const role=localStorage.getItem('role');
    const navigate = useNavigate();
  

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    };
    const handleProfile = () => {
        navigate('/profile')
    };
    const handleEditAvatar = () => {
        navigate('/editavatar')
    };
    console.log('dashboard',uid);
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

                    }}
                />

                <Menu theme="dark" mode="inline">
                    <Avatar 
                    style={{
                        size: 40,
                        cursor: 'pointer',
                        marginLeft: '80px',
                    }}
                    src={avatar} onClick={handleEditAvatar}/>
                    <Menu.Item
                        key="profile"
                        icon={<UserOutlined />}
                        onClick={handleProfile}
                        >
                        Profile
                    </Menu.Item>
                    <Menu.Item
                        key="logout"
                        icon={<LogoutOutlined />}
                        style={{ position: 'absolute', bottom: 0 }}
                        onClick={handleLogout}
                        >
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout
                className="site-layout"
                style={{
                    marginLeft: 200,
                }}
            >

                <Content
                    className='content'
                >
                    <div className='topper'><h2>Dashboard</h2></div>
                    <div className='divider'></div>

                    <div style={{position: 'relative'}}>
                        <Button onClick={() => navigate('/dashboard/enrolment')}
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '10px',
                                }}>
                            Enrol Courses
                        </Button>
                        <div className='cardBox'>
                            <ShowCourse uid={uid} role={role}/>
                            
                        </div>
                    </div>
                </Content>
                <Footer
                    className='footer'
                >
                    ©2023 Created by Hydra
                </Footer>
            </Layout>
        </Layout>


    );
}

export default Dashboard;