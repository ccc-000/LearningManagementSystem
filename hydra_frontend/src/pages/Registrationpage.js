import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/registrationpage.css';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
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
        if (data.status === true) {
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
              maxWidth: 1000,
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
                <Select.Option value="lecturre">Lecturer</Select.Option>
              </Select>
            </Form.Item>
            {/* <Form.Item label="Date of birth: " name="birthday">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Preferred language: " name="preferred_lan">
              <Select>
                <Select.Option value="english">English</Select.Option>
                <Select.Option value="chinese">Chinese</Select.Option>
                <Select.Option value="german">German</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Self introduction: " name="intro">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
              <Upload action="action/do" listType="picture-circle" maxCount={1}>
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item> */}
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default () => <RegistraionFrom />;