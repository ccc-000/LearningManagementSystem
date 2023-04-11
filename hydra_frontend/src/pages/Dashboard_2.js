import pic from '../img/unsw.jpeg';
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
} from '@ant-design/icons';
import {Button, Card, Checkbox, Layout, Menu, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import Draggable from 'react-draggable';
import {Link, useEffect} from 'react-router-dom';

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

function DashboardPage() {
    const uid = localStorage.getItem('uid');
    const [showModal, setShowModal] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });
    useEffect(() => {

    },[])
    const sendCourses = () => {
        fetch(`http://localhost:8000/createdcourses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({'uid': uid}),
        }).then(async(response) => {
            const jsonRes = await response.json();
            console.log(jsonRes);
            if (response.status !== 200) {
                message.error(jsonRes.error);
                return;
            }
            message.success('Successful!');
            console.log(typeof jsonRes);
            console.log(jsonRes.courses);
            setCourseList(jsonRes.courses);
        })
    }
    const draggleRef = useRef(null);

    const handleOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleOptionClick = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items}/>
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
                            Enrol courses
                        </Button>
                        {selectedOptions.length > 0 && (
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
                        )}


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
                                    Enrol Courses
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
                                <Button onClick={handleClose}>Close</Button>,
                            ]}
                        >
                            <Checkbox
                                onChange={() => handleOptionClick('23t1COMP6080 	Web Front-End Programming')}>
                                23t1COMP6080 Web Front-End Programming
                            </Checkbox>
                            <br/>
                            <Checkbox
                                onChange={() => handleOptionClick('23t1COMP9318 	Data Warehousing and Data Mining')}>
                                23t1COMP9318 Data Warehousing and Data Mining
                            </Checkbox>
                            <br/>
                            <Checkbox onChange={() => handleOptionClick('23t1COMP9414 	Artificial Intelligence')}>
                                23t1COMP9414 Artificial Intelligence
                            </Checkbox>
                            <br/>
                            <Checkbox
                                onChange={() => handleOptionClick('23t1COMP9417 	Machine Learning and Data Mining')}>
                                23t1COMP9417 Machine Learning and Data Mining
                            </Checkbox>
                            <br/>
                            <Checkbox
                                onChange={() => handleOptionClick('23t1COMP9418 	Advanced Topics in Statistical Machine Learning')}>
                                23t1COMP9418 Advanced Topics in Statistical Machine Learning
                            </Checkbox>
                            <br/>
                            <Checkbox
                                onChange={() => handleOptionClick('23t1COMP9900 Information Technology Project')}>
                                23t1COMP9900	Information Technology Project
                            </Checkbox>
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

export default DashboardPage;