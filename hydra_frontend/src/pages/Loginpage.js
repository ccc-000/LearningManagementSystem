import '../styles/loginpage.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Loginpage() {

    let navigate = useNavigate();
    const routeChange = () =>{ 
        navigate("/register");
      }

    const onFinish = (values) => {
        if (values.username === 'admin' && values.password === 'admin') {
            window.location.href = '/dashboard';
        }
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function connect() {
        fetch('http://localhost:8000', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                username: 'admin',
                password: 'admin',
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }

    connect();

    return (
        <>
            <div className='loginpage'>
                <div className="logincard">
                    <h1 className='welcomemsg'>Welcome to the Hydra learning management system!</h1>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
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
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button onClick={routeChange}>Register</Button>
                </div>
            </div>
        </>
    );
}
