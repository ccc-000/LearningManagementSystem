import React from 'react';
import { Card, Input, Button, Form } from 'antd';
import 'antd/dist/reset.css';
import '../styles/ResetPassword2.css';
import { useNavigate } from 'react-router-dom';

//将修改的密码提交到数据库，并跳转到登录页面

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
  const navigate = useNavigate();
  const onFinish = (values) => {
      console.log('Received values of form: ', values);
      navigate('/');
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
        <div id="ResetPassword-Submit"><Button type="primary" htmlType="submit" size="large" style={{width: 100}} onClick={onFinish}>Submit</Button></div>
      </Card>
    </div>
  );
}

export default ResetPassword2;