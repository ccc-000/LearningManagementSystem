import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Divider, List, Typography, Layout, Tooltip } from 'antd';
import NavibarLecturer from '../components/NavibarLecturer';
import { Button, Modal, Space, Input, Radio } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function CreateQuiz () {
    //Create questions
    const [questionCount, setQuestionCount] = useState(1);
    const handleAddQuestion = () => {
    setQuestionCount(questionCount + 1);
    };
    const questionNumbers = Array.from(Array(questionCount).keys()).map(
        (num) => num + 1
    );  

    //Defualt radio button
    // const [value, setValue] = useState();
    // const onChange = (e) => {
    //     console.log('radio checked', e.target.value);
    //     setValue(e.target.value);
    // };

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

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:8080/quiz')
    //         .then(response => response.json())
    //         .then(data => setData(data));
    // });
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
        <Divider orientation="left" style={{fontSize:'25px'}}>Quiz</Divider>
        <Space style={{marginLeft:'15px', marginBottom:'15px'}}>
            <Button type="primary" onClick={showModal}>Create a new quiz</Button>
            <Modal
                open={open}
                title="New quiz"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                <Button key="back" onClick={handleCancel}> Cancel </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}> Create </Button>,
                ]}
            >
                <div style={{marginLeft:'15px', marginBottom:'15px'}}>
                {questionNumbers.map((num) => (
                    <div key={num}>
                    <span>Q{num}:</span>
                    <Input placeholder="Question" />
                    <Radio.Group >
                        <Radio value={1}>A<Input/></Radio>
                        <Radio value={2}>B<Input/></Radio>
                        <Radio value={3}>C<Input/></Radio>
                        <Radio value={4}>D<Input/></Radio>
                    </Radio.Group>
                    </div>
                ))}
                </div>
                    <div style={{marginLeft:'15px', marginBottom:'15px'}}>
                        <Button onClick={handleAddQuestion}>Add question</Button>
                    </div>

            </Modal>
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
    )
}

export default CreateQuiz;
