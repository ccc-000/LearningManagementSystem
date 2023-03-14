import '../styles/loginpage.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { stringify } from 'rc-field-form/es/useWatch';

export default function Loginpage() {

    let navigate = useNavigate();
    const routeChange = () => {
        navigate("/register");
    }

    const onFinish = (values) => {
        fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                username: stringify(values.username),
                password: stringify(values.password),
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function connect() {
        fetch('http://localhost:8000/register/', {
            method: 'POST',
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
                        style={{
                            width: '100%',
                            display:'flex',
                            justifyContent:'space-between',
                        }}
                        >
                            <div>
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
