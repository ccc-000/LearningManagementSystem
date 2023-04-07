import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavibarStudent from '../components/NavibarStudent';
import { Divider, Layout, Button, message, Upload, Modal, Tooltip, Space, Input } from 'antd';
import { UploadOutlined, RollbackOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

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

function AllAssignments() {
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
        message.success('Assignment submitted successfully');
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
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                <Button key="back" onClick={handleCancel}> Cancel </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}> Submit </Button>,
                ]}
            >
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload Files</Button>
            </Upload>

            </Modal>
        </div>
        <NavibarStudent />
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

export default AllAssignments