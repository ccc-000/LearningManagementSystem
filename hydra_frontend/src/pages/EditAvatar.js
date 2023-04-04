import React from 'react';
import { UploadOutlined, UserOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Card, Button, Avatar, Upload, message, notification, Space } from 'antd';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/EditAvatar.css';

//连接数据库，上传图片
//将上传的图片显示在头像框里
//在线修改上传的图片

function EditAvatar() {
    const [messageApi, contextHolder1] = message.useMessage();
    const [api, contextHolder2] = notification.useNotification();
    const navigate = useNavigate();

    //Upload avatar
    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
        },
    ]);
    const handleChange = (info) => {
      let newFileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      // Only to show two recent uploaded files, and old ones will be replaced by the new
      newFileList = newFileList.slice(-2);

      // 2. Read from response and show file link
      newFileList = newFileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });
      setFileList(newFileList);
    };
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: handleChange,
      multiple: true,
    };

    //Save modification
    function handleSave() {
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
    }

    //Cancel modification
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
        <div className="ChangeAvatar">
          <Link to="/profile"><LeftCircleOutlined style={{fontSize: 30, marginLeft: 15, marginTop: 15, color: 'grey'}}/></Link>
          <Card
            id="ChangeAvatar-Card"
            bordered={false}
            style={{
            width: 780,
            height: 470,
            }}
          >
            <div id="ChangeAvatar-Avatar">
              <Avatar shape="square" size={128} icon={<UserOutlined />} />
            </div>
            <div id="ChangeAvatar-Content">
              <Upload {...props} fileList={fileList}>
                  <Button icon={<UploadOutlined />}>Choose a file</Button>
              </Upload>
            </div>
            <div id="ChangeAvatar-Submit">
              {contextHolder1}
              <Button type="primary" onClick={handleSave} size="large" style={{width: 100}}>Update</Button>
              {contextHolder2}
              <Button id="ChangeAvatar-Cancel" onClick={handleCancel} size="large" style={{width: 100}}>Cancel</Button>
            </div>
          </Card>
        </div>
    );
}

export default EditAvatar;