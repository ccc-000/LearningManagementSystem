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
import {Form, Input, Button, Card, Layout, Menu, Modal, Avatar, message} from 'antd';
import React, {useRef, useState} from 'react';
import Draggable from 'react-draggable';
import {Link, useNavigate } from 'react-router-dom';
import ShowCourse from '../components/CourseCard';

const {Content, Footer, Sider} = Layout;
const uid=localStorage.getItem('uid');
 
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
const grade = { quiz: {
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
    }};

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
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState({
        coursename: '1',
        creatorname: '1',
        coursedescription: '1',
        gradedistribution: JSON.stringify(grade),
    });

    const draggleRef = useRef(null);

    const handleSubmit = () => {
        form.validateFields().then(values => {
            console.log(values);
        // console.log('form data:',JSON.stringify(formData))
            fetch('http://localhost:8000/createcourses/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            }).then(async(response) => {
                const jsonRes = await response.json();
                if (response.status !== 200) {
                    message.error(jsonRes.error);
                    return;
                }
                message.success('Successful!');
                setShowModal(false);          
            });
        });
    
        

        // setShowCard(true);
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
                        <Button onClick={handleOpen}
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '10px',
                                }}>
                            Create Courses
                        </Button>
                        <div className='cardBox'>
                            <ShowCourse id={uid}/>
                            
                       </div>



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
                            onOk={form.submit}
                            onCancel={handleClose}
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
                                <><Button key='submit' type='primary' onClick={handleSubmit}>
                                    Submit
                                </Button>
                                <Button key='cancel' onClick={handleClose}>
                                    Close
                                </Button></>
                            ]}
                        >
                            <Form form={form} initialValues={initialValues} >
                                <Form.Item name="coursename" label='Course Name'>
                                    <Input
                                      
                                    ></Input>
                                </Form.Item>
                                <Form.Item name="creatorname" label='Creator Name'>
                                    <Input
                                        // name="creatorname"
                                        // value={formData.creatorname}
                                    ></Input>
                                </Form.Item>
                                <Form.Item name="coursedescription" label='Course Description'>
                                    <Input.TextArea
                                        // name="coursedescription"
                                        // defaultValue={formData.coursedescription}
                                    />
                                </Form.Item>
                                <Form.Item name="gradedistribution" label='Grade Distribution'>
                                    <Input.TextArea
                                        // name="gradedistribution"
                                        // defaultValue={JSON.stringify(formData.gradedistribution)}
                                    />
                                </Form.Item>
                                {/* <Form.Item>
                                    <Button type='primary' htmlType='submit'>
                                        Submit
                                    </Button>
                                </Form.Item> */}
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