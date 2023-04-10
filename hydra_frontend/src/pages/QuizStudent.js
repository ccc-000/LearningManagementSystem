import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Divider, List, Typography, Layout } from 'antd';
import Navibar from '../components/Navibar';
import { Button, Modal, Space, Input, Radio, Tooltip } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function AllQuiz () {
    //Modal
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpen(false);
        }, 1500);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
        <Layout
        className="site-layout"
        style={{
            minHeight: '100vh',
            marginLeft: 200,
        }}>
        {/* <Header courseName={getCourseName()} style={{padding:'5px 10px'}} > */}
        <Header style={{padding:'2px 10px'}} >
            <Link to='/Dashboard'>
            <Tooltip title="Back">
                <Button type='link' shape="circle" icon={<RollbackOutlined />} />
            </Tooltip>
            </Link>
            {/* <h2>{props.courseName}</h2> */}
        </Header>
        <Divider orientation="left" style={{fontSize:'25px'}}>Quiz</Divider>
        <Space style={{marginLeft:'50px', marginBottom:'15px'}}>
            <li>
            <Button type="link" style={{fontSize:'20px'}} onClick={showModal}>Quiz1</Button>
            <Modal
                open={open}
                title="Quiz1"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                <Button key="back" onClick={handleCancel}> Cancel </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}> Submit </Button>,
                ]}
            >
                <div style={{marginLeft:'15px', marginBottom:'15px'}}>
                    <p>Question1. When is Easter in 2023?</p>
                    <Radio.Group >
                        <Radio value={1}>A. 07/04</Radio>
                        <Radio value={2}>B. 08/04</Radio>
                        <Radio value={3}>C. 09/04</Radio>
                        <Radio value={4}>D. 10/04</Radio>
                    </Radio.Group>
                </div>
                <div style={{marginLeft:'15px', marginBottom:'15px'}}>
                    <p>Question2. How about Hydra learning management system?</p>
                    <Radio.Group >
                        <Radio value={1}>A. Good!</Radio>
                        <Radio value={2}>B. Great!</Radio>
                        <Radio value={3}>C. Amazing!</Radio>
                        <Radio value={4}>D. Excellent!</Radio>
                    </Radio.Group>
                </div>
            </Modal>                
            </li>
        </Space>
        {/* <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                    title={<a href="https://ant.design">{item.title}</a>}
                    />
                </List.Item>
            )}
        /> */}
        <Navibar />
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Hydra Learning management system©2023 Created by COMP9900 HYDRA Group
        </Footer>

        </Layout>
        </>
    );
}

export default AllQuiz;