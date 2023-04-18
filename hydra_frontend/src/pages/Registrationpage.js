import { useNavigate } from 'react-router-dom';
import '../styles/registrationpage.css';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React from 'react';

const { TextArea } = Input;


const RegistraionFrom = () => {
  let navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values)
    fetch('http://localhost:8000/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.status === 200) {
          navigate("/");
        }
      });
  };

  return (
    <>
      <div className='pagelayout'>
        <div className='registrationcard'>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              width: 800,
              marginRight: -150
            }}
            onFinish={onFinish}
          >
            <Form.Item label="User name" name="username" >
              <Input />
            </Form.Item>
            <Form.Item label="Email address" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Confirm password">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Role: " name="role">
              <Select>
                <Select.Option value="student">Student</Select.Option>
                <Select.Option value="lecturer">Lecturer</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item style={{textAlign: 'center', marginLeft: 120, marginTop: 30, marginBottom: -10}}>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default () => <RegistraionFrom />;