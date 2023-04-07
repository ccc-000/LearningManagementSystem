import '../styles/loginpage.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as React from 'react'
export default function Loginpage() {

    let navigate = useNavigate();
    const routeChange = () => {
        navigate("/register");
    }

    const onFinish = (values) => {
        fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem('uid',data.uid);
                    localStorage.setItem('role', data.role);
                    console.log(data.uid)
                    if (data.role === 'lecturer') {
                        navigate("dashboardlecturer");
                    } else {
                        navigate("/dashboard");
                    }
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className='loginpage'>
                <div className="logincard">
                    <h1 className='welcomemsg'>Welcome to the Hydra learning management system!</h1>
                    <Form
                        name="basic"
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                        >
                            <div style={{display:'flex', justifyContent: 'space-evenly'}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button onClick={routeChange}>Register</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}
