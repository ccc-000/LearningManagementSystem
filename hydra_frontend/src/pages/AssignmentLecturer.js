import React from 'react';
import NavibarLecturer from '../components/NavibarLecturer';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Divider, List, Typography, Layout, Tooltip } from 'antd';
import { Button, Modal, Space, Input, message } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

export default function CreateAssignment() {
    const [loading, setLoading] = useState(false); //for modal
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

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleChange = () => {
        const data = {
          title: title,
          url: url
        };
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/createass/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            url: url
        }),
    })
        .then((response) => response.json())
        .then((data)=>{
            if (data.status === 200){
                message.success('Assignment created successfully');
            }
            else{
                message.error('Failed to create assignment');
            }
        })
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
        <Header style={{ padding: '2px 10px' }}>
            <Link to='/DashboardLecturer'>
            <Tooltip title="Back">
                <Button type='link' shape="circle" icon={<RollbackOutlined />} />
            </Tooltip>
            </Link>
            {/* <h2>{props.courseName}</h2> */}
        </Header>
        <Divider orientation="left" style={{fontSize:'25px'}}>Assignment</Divider>
        <Space style={{marginLeft:'15px', marginBottom:'15px'}}>
            <Button type="primary" onClick={showModal}>Create a new assignment</Button>
            <Modal
                open={open}
                title="New assignment"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                <Button key="back" onClick={handleCancel}> Cancel </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}> Create </Button>,
                ]}
            >
                <div style={{fontWeight:'bold', marginLeft:'15px', marginTop:'15px', marginBottom:'20px'}}>
                    Assignment Title:
                    <Input placeholder="Input Assignment Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <br />
                    Assignment Link:
                    <Input placeholder="Input Assignment Link" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>

            </Modal>
        </Space>
        {/* <div>
            <ul>
                {data.map((data, index) => (
                    <li key={data.aid}>Assignment{index}</li>
                ))}
            </ul>
        </div> */}
        {/* <List
            itemLayout="horizontal"
            dataSource={data}
            // renderItem={(item, index) => (
                // <List.Item>
                    // <List.Item.Meta
                        {...data.map((data, index) => (
                            <a href={data.url} key={data.aid}>Assignment{index} 
                            </a>
                        ))}
                    // />
                // </List.Item>
            // )}
        /> */}
        <NavibarLecturer />
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

