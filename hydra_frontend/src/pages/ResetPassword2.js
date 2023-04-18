import React from 'react';
import { Card, Input, Button, Form, message } from 'antd';
import 'antd/dist/reset.css';
import '../styles/ResetPassword2.css';
import { useNavigate } from 'react-router-dom';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

function ResetPassword2() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = (values) => {
      console.log('Received values of form: ', values);
      //TODO: send the data to backend
      // fetch('http://localhost:8000/reset_password/', {
      messageApi.open({
        type: 'loading',
        content: 'Updating...',
        duration: 2,
      });
      setTimeout(() => {
        messageApi.open({
          type: 'success',
          content: 'Updated!',
          duration: 2,
        });
      }, 2100);
      setTimeout(() => {
        navigate('/');
      }, 3500);
  };
  return (
    <div className="ResetPassword">
      <Card
        id="ResetPassword-Card"
        bordered={false}
        style={{
        width: 900,
        height: 440,
        }}
      >
        <div id="ResetPassword-Title"><span>Reset Password</span></div>
        <div id="ResetPassword-Content">
          <Form id="ResetPassword-Form"
            {...formItemLayout}
            form={form}
            name="edit"
            initialValues={{
                language: 'English',
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
            >

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>
          </Form>
        </div>
        <div id="ResetPassword-Submit">
          {contextHolder}
          <Button type="primary" htmlType="submit" size="large" style={{width: 100}} onClick={onFinish}>Submit</Button>
        </div>
      </Card>
    </div>
  );
}

export default ResetPassword2;