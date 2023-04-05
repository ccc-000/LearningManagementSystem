import React from 'react';
import { UserOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Input, Button, Avatar, Form, Select, DatePicker, Card, message, notification, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/EditProfile.css';
const { Option } = Select;

//通过uid获取用户信息并显示
//将修改后的信息提交到数据库

//form setting
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
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

function EditProfile() {
  //form
  const [form] = Form.useForm();
  const [messageApi, contextHolder1] = message.useMessage();
  const [api, contextHolder2] = notification.useNotification();
  const navigate = useNavigate();
  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

  //submit modify
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['birthday'].format('YYYY-MM-DD'),
    };
    console.log('Received values of form: ', values);
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
      navigate('/profile');
    }, 3500);
  };

  //cancel modify
  const confirmCancel = () => {
    navigate('/profile');
  };
  function handleCancel(){
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button  type="primary" size="medium" onClick={() => api.destroy()}style={{width:100}}>
          Continue
        </Button>
        <Button size="medium" onClick={confirmCancel} style={{width:100}}>
          Cancel
        </Button>
      </Space>
    );
    api.open({
      message: 'Cancel Confirm',
      description:
        'Are you sure to cancel the modification and exit the current page or continue to modify?',
      btn,
      key,
    });
  }

  return (
    <div className="EditProfile">
        <Link to="/profile"><LeftCircleOutlined style={{fontSize: 30, marginLeft: 15, marginTop: 15, color: 'grey'}}/></Link>
        <div id="EditProfile-Content">
          <Card
            bordered={false}
            style={{
            width: 780,
            height: 600,
            }}
          >
            <div id="EditProfile-Avatar">
              <Avatar shape="square" size={110} icon={<UserOutlined />} />
            </div>
            <Form
            {...formItemLayout}
            form={form}
            name="edit"
            onFinish={onFinish}
            initialValues={{
                language: 'English',
            }}
            style={{
                maxWidth: 600,
                marginTop: 30,
            }}
            scrollToFirstError
            >
              <Form.Item
                name="firstname"
                label="Firstname"
                rules={[
                {
                    required: true,
                    message: 'Please input your firstname!',
                    whitespace: true,
                },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="lastname"
                label="Lastname"
                rules={[
                {
                    required: true,
                    message: 'Please input your lastname!',
                    whitespace: true,
                },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                {
                    required: true,
                    message: 'Please select gender!',
                },
                ]}
              >
                <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item name="birthday" label="Birthday" {...config}>
                <DatePicker />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="language"
                label="Language"
                rules={[
                {
                    required: true,
                    message: 'Please select preferred language!',
                },
                ]}
              >
                <Select placeholder="select preferred language">
                  <Option value="english">English</Option>
                  <Option value="french">French</Option>
                  <Option value="chinese">Chinese</Option>
                </Select>
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <div id="EditProfile-Submit">
                  {contextHolder1}
                  <Button type="primary" htmlType="submit" size="large" style={{width: 100}}>Update</Button>
                  {contextHolder2}
                  <Button id="EditProfile-Cancel" size="large" onClick={handleCancel}>Cancel</Button>
                </div>
              </Form.Item>
            </Form>
          </Card>

        </div>
    </div>
  );
}

export default EditProfile;