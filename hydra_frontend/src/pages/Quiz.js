import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Layout, Tooltip } from 'antd';
import Navibar from '../components/Navibar';
import { Button, Modal, Space, Input, Radio, Checkbox } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const role = localStorage.getItem('role');

function Quiz () {
    //Create Quiz Modal
    const [questionCount, setQuestionCount] = useState(1);
    const [questionData, setQuestionData] = useState([
        {
        question: '',
        type: 'single',
        options: [
            { label: 'A', value: 'a', input: '' },
            { label: 'B', value: 'b', input: '' },
            { label: 'C', value: 'c', input: '' },
            { label: 'D', value: 'd', input: '' },
        ],
        },
    ]);

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
        }, 1000);
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
    
    function handleQuestionChange(index, event) {
    const newQuestionData = [...questionData];
    newQuestionData[index].question = event.target.value;
    setQuestionData(newQuestionData);
    }

    function handleTypeChange(index, event) {
    const newQuestionData = [...questionData];
    newQuestionData[index].type = event.target.value;
    setQuestionData(newQuestionData);
    }

    function handleOptionChange(questionIndex, optionIndex, event) {
    const newQuestionData = [...questionData];
    newQuestionData[questionIndex].options[optionIndex].input = event.target.value;
    setQuestionData(newQuestionData);
    }

    function handleAddQuestion() {
    setQuestionCount(questionCount + 1);
    const newQuestionData = [
        ...questionData,
        {
        question: '',
        type: 'single',
        options: [
            { label: 'A', value: 'a', input: '' },
            { label: 'B', value: 'b', input: '' },
            { label: 'C', value: 'c', input: '' },
            { label: 'D', value: 'd', input: '' },
        ],
        },
    ];
    setQuestionData(newQuestionData);
    }

    function handleRemoveQuestion(index) {
    setQuestionCount(questionCount - 1);
    const newQuestionData = [...questionData];
    newQuestionData.splice(index, 1);
    setQuestionData(newQuestionData);
    }

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
                    <Button key="submit" type="primary" onClick={handleOk} loading={loading}> Create </Button>,
                    ]}
                >
                    {questionData.map((question, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                        <span>Q{index + 1}:</span>
                        <TextArea placeholder="Question" value={question.question} onChange={(e) => handleQuestionChange(index, e)} autoSize/>
                        <Radio.Group style={{ marginTop: '10px' }} value={question.type} onChange={(e) => handleTypeChange(index, e)}>
                            <Radio value="single">Single choice</Radio>
                            <Radio value="multiple">Multiple choice</Radio>
                        </Radio.Group>
                            {question.type === 'single' ? (
                                <Radio.Group style={{ marginTop: '10px' }}>
                                {question.options.map((option, optionIndex) => (
                                    <Radio style={{marginTop:'10px'}} key={optionIndex} value={option.value}>
                                    {option.label}
                                    <TextArea
                                    autoSize
                                    style={{ marginLeft: '10px', width: '200px' }}
                                    placeholder={`Option ${option.label}`}
                                    value={option.input}
                                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                />
                                </Radio>
                            ))}
                            </Radio.Group>
                        ) : (
                            <Checkbox.Group style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}} >
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} style={{ marginBottom: '10px' }}>
                                    <Checkbox value={option.value} style={{marginTop:'10px'}}>
                                    {option.label}
                                    <TextArea
                                        autoSize
                                        style={{ marginLeft: '10px', width: '200px' }}
                                        placeholder={`Option ${option.label}`}
                                        value={option.input}
                                        onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                    />
                                    </Checkbox>
                                </div>
                            ))}
                            </Checkbox.Group>
                        )}
                        {questionCount > 1 && (
                            <Button style={{ marginTop: '10px', marginLeft: '10px' }} onClick={() => handleRemoveQuestion(index)}>
                            Remove
                            </Button>
                        )}
                        </div>
                    ))}
                    <Button onClick={handleAddQuestion}>Add Question</Button>
                </Modal>
            </Space>
            
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
    } else {
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
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                <Button key="back" onClick={handleCancel}> Cancel </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}> Submit </Button>,
                ]}
            ></Modal>
            </li>
        </Space>
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


export default Quiz;
