import React from 'react';
import { Input, Button, Card } from 'antd';
import 'antd/dist/reset.css';
import '../styles/ResetPassword1.css';

//点击按钮向后端发送请求，向用户游戏发送邮件链接，用户点击链接后跳转到ResetPassword2页面

function ResetPassword1() {
  return (
    <div className="CheckEmail">
      <Card
        id="CheckEmail-Card"
        bordered={false}
        style={{
        width: 900,
        height: 380,
        }}
      >
        <div id="CheckEmail-Title"><span>Forget Password</span></div>
        <div id="CheckEmail-Content">
          <span>Please input your e-mail address:</span>
          <Input id="CheckEmail-Inputbox" placeholder="e.g. xxx@gmail.com" />
        </div>
        <div id="CheckEmail-Submit"><Button type="primary" htmlType="submit" size="large" style={{width: 100}}>Submit</Button></div>
      </Card>
    </div>
  );
}

export default ResetPassword1;