import React from 'react';
import Navibar from '../components/Navibar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Divider, Layout, Tooltip, Upload } from 'antd';
import { Button, Modal, Space, Input, message } from 'antd';
import { RollbackOutlined, UploadOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const role = localStorage.getItem('role');

export default function Assignment() {
    //Create Assignment Modal   
    const [loading, setLoading] = useState(false); 
    const [open, setOpen] = useState(false); 
    const showModal = () => {
        setOpen(true);
    };
    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpen(false);
        }, 1000);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [des, setDes] = useState('');
    
    const handleCreate = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/createass/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cid: 1,
            title: title,
            assdescription: des,
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

    //Submit Assignment Modal
    //Upload file
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        // action: 'https://http://localhost:8000/submitass/',
        headers: {
        authorization: 'authorization-text',
        },
        onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            // message.error(`${info.file.name} file upload failed.`);
            message.success(`${info.file.name} file uploaded successfully`);
        }
        },
    };

    
    if (role === 'lecturer') {
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
                    onOk={handleCreate}
                    onCancel={handleCancel}
                    footer={[
                    <Button key="back" onClick={handleCancel}> Cancel </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleCreate}> Create </Button>,
                    ]}
                >
                    <div style={{fontWeight:'bold', marginLeft:'15px', marginTop:'15px', marginBottom:'20px'}}>
                        Assignment Title:
                        <TextArea placeholder="Input Assignment Title" allowClear autoSize value={title} onChange={(e) => setTitle(e.target.value)} />
                    <br />
                    <br />
                        Assignment Description:
                        <TextArea rows={4} value={des} placeholder="Input Assignment Description" allowClear autoSize onChange={(e) => setDes(e.target.value)} />
                    <br />
                    <br />
                        Assignment Link:
                        <TextArea placeholder="Input Assignment Link" allowClear autoSize value={url} onChange={(e) => setUrl(e.target.value)} />
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
            
        )} else {
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
                <Divider orientation="left" style={{fontSize:'25px'}}>Assignment</Divider>
                <div style={{marginLeft:'50px', marginBottom:'15px'}}>
                    <li>
                    <a style={{fontSize:'20px'}} href='https://webcms3.cse.unsw.edu.au/static/uploads/course/COMP9334/23T1/6b7b61a70d03c053abbe32b466613dea303e6c31c5ca03db9b4ab8aec0476398/assignment_101.pdf'>
                        Assignment 1
                    </a>
                    </li>
                </div>
                <div style={{marginLeft:'50px', marginBottom:'15px'}}>
                    <span style={{fontSize:'18px'}}>Assignment Submit:</span>
                    <Button type="primary" onClick={showModal}>Submit</Button>
                    <Modal
                        open={open}
                        title="Assignment Submission"
                        onOk={handleSubmit}
                        onCancel={handleCancel}
                        footer={[
                        <Button key="back" onClick={handleCancel}> Cancel </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}> Submit </Button>,
                        ]}
                    >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Upload Files</Button>
                    </Upload>

                    </Modal>
                </div>
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
            )
        }
}
