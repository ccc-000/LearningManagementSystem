import React from 'react';
import { Input, Button, Card } from 'antd';
import 'antd/dist/reset.css';
import '../styles/ResetPassword1.css';

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