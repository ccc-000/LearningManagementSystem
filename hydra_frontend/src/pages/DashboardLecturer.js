import pic from '../img/unsw.jpeg';
import avatar from '../img/avatar.png';
import '../styles/DashboardPage.css';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {Form, Input, Button, Card, Layout, Menu, Modal, Avatar} from 'antd';
import React, {useRef, useState} from 'react';
import Draggable from 'react-draggable';
import {Link, useNavigate } from 'react-router-dom';

const {Content, Footer, Sider} = Layout;

 
const items = [
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
}));

function DashboardLecturer() {
    const navigate = useNavigate();
    const [showCard, setShowCard] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // const [options, setOptions] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });
    const [formData, setFormData] = useState({
        coursename: '',
        creatorname: '',
        coursedescription: '',
        gradedistribution: { 
            quiz: {
            quiz1: 9,
            quiz2: 9,
            quiz3: 9
            },
            ass: {
            ass1: 15,
            ass2: 15,
            ass3: 15
            },
            final: {
            'final exam': 28
            }}
    });

    const draggleRef = useRef(null);

    const handleSubmit = () => {
        setShowModal(false);
        setShowCard(true);
      };
    const handleOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const onStart = (_event, uiData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
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
                        <div>
                            <Button onClick={handleOpen}
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '10px',
                                    }}>
                                Create Courses
                            </Button>
                        </div>
                        <div className='cardBox'>
                            <Link to='/coursemainpageLecturer'>
                                <Card
                                    hoverable
                                    className='courseCard'
                                    cover={
                                        <img
                                            alt="course"
                                            src={pic}
                                        />
                                    }
                                >
                                    <Card.Meta className='meta' title="23t1COMP9900	Information Technology Project" description="It's the last course of 8543."/>
                                </Card>
                            </Link>
                        {showCard && (
                           
                            <Link to='/coursemainpageLecturer'>
                                <Card
                                    hoverable
                                    className='courseCard'
                                    cover={
                                        <img
                                            alt="course"
                                            src={pic}
                                        />
                                    }
                                >
                                    <Card.Meta className='meta' title={formData.coursename} description={formData.coursedescription}/>
                                </Card>
                            </Link>
                        )}
                       </div>


                        {/* {selectedOptions.length > 0 && (
                            <div className='cardBox'>
                                {selectedOptions.map((option, index) => (
                                    <Link to='/coursemainpage'>
                                        <Card
                                            hoverable
                                            key={index}
                                            className='courseCard'
                                            cover={
                                                <img
                                                    alt="course"
                                                    src={pic}
                                                />
                                            }
                                        >
                                            <Card.Meta className='meta' title={option}/>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )} */}


                        <Modal
                            title={
                                <div
                                    style={{
                                        width: '100%',
                                        cursor: 'move',
                                    }}
                                    onMouseOver={() => {
                                        if (disabled) {
                                            setDisabled(false);
                                        }
                                    }}
                                    onMouseOut={() => {
                                        setDisabled(true);
                                    }}
                                    onFocus={() => {
                                    }}
                                    onBlur={() => {
                                    }}
                                    // end
                                >
                                    Course Information
                                </div>
                            }
                            open={showModal}
                            onOk={handleClose}
                            closable={false}
                            modalRender={(modal) => (
                                <Draggable
                                    disabled={disabled}
                                    bounds={bounds}
                                    onStart={(event, uiData) => onStart(event, uiData)}
                                >
                                    <div ref={draggleRef}>{modal}</div>
                                </Draggable>
                            )}
                            footer={[
                                <><Button type='primary' onClick={handleSubmit}>
                                    Submit
                                </Button>
                                <Button onClick={handleClose}>
                                    Close
                                </Button></>
                            ]}
                        >
                            <Form>
                                <Form.Item label='Course Name'>
                                    <Input
                                        name="coursename"
                                        value={formData.coursename}
                                        onChange={(e) => setFormData({ ...formData, coursename: e.target.value })}></Input>
                                </Form.Item>
                                <Form.Item label='Creator Name'>
                                    <Input
                                        name="creatorname"
                                        value={formData.creatorname}
                                        onChange={(e) => setFormData({ ...formData, creatorname: e.target.value })}></Input>
                                </Form.Item>
                                <Form.Item label='Course Description'>
                                    <Input.TextArea
                                        name="coursedescription"
                                        defaultValue={formData.coursedescription}
                                        onChange={(e) => setFormData({ ...formData, coursedescription: e.target.value })}
                                    />
                                </Form.Item>
                                <Form.Item label='Grade Distribution'>
                                    <Input.TextArea
                                        name="gradedistribution"
                                        defaultValue={JSON.stringify(formData.gradedistribution)}
                                        onChange={(e) => setFormData({ ...formData, gradedistribution: e.target.value })}
                                    />
                                </Form.Item>
                            </Form>
    
                        </Modal>
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

export default DashboardLecturer;