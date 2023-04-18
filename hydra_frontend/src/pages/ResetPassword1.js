import React from 'react';
import { Input, Button, Card, Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LeftCircleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import '../styles/ResetPassword1.css';

function ResetPassword1() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('Success:', values);
    navigate('/waiting');
  };

  return (
    <div className="CheckEmail">
      <Link to="/"><LeftCircleOutlined style={{fontSize: 30, marginLeft: 30, marginTop: 30, color: 'grey'}}/></Link>
      <Card
        id="CheckEmail-Card"
        bordered={false}
        style={{
        width: 900,
        height: 380,
        marginTop: '-15px',
        }}
      >
        <Form onFinish={handleSubmit}>
          <div id="CheckEmail-Title"><span>Forget Password</span></div>
          <Form.Item
            label="Please input your e-mail address:"
            name="email"
            rules={[  
              {
                required: true,
                message: 'Please input your e-mail address!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
            style = {{
              width: 1200,
              marginTop: 50,
              marginLeft: 100,
            }}
          >
            <Input id="CheckEmail-Inputbox" placeholder="e.g. xxx@gmail.com" />
          </Form.Item>
          <Form.Item>
            <div id="CheckEmail-Submit"><Button type="primary" htmlType="submit" size="large" style={{width: 100}}>Submit</Button></div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default ResetPassword1;