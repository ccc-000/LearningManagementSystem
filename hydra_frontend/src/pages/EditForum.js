import React from 'react';
import { Input, Button, Upload, message, notification, Space} from 'antd';
import { UploadOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/EditForum.css';
const { TextArea } = Input;


function EditForum() {
    //连接服务器，实现上传文件
    //multimedia file
    //默认图片
    const fileList = [
      {
        uid: '-1',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ];

    //edit a post
    const [messageApi, contextHolder1] = message.useMessage();
    const [api, contextHolder2] = notification.useNotification();
    const navigate = useNavigate();
    const onFinish = () => {
      //Zaffi: 将post的内容修改到数据库中
      //获取ForumDetail页面传输的所有post信息
      //获取当前时间
      //获取修改的post内容
      // console.log('Received values of post: ', currentTime);

      messageApi.open({
        type: 'loading',
        content: 'Editing...',
        duration: 2,
      });
      setTimeout(() => {
        messageApi.open({
          type: 'success',
          content: 'Edited!',
          duration: 2,
        });
      }, 2100);
      setTimeout(() => {
        navigate('/forumdetailstudent');
      }, 3500);
    };

    //cancel edit
    const confirmCancel = () => {
      navigate('/forumdetailstudent');
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
          'Are you sure to cancel the modification and exit the current page or continue to edit?',
        btn,
        key,
      });
    }
    return (
      <div className="EditForum-Total">
        <Link to="/forumdetailstudent"><LeftCircleOutlined style={{fontSize: 30, marginLeft: 15, marginTop: 15, color: 'grey'}}/></Link>
        <div className="EditForum-Content">
          <div className="Edit-Title">
              <span style={{marginRight: 20}}>Title</span>
              <Input placeholder="Please input a post title" />
          </div>
          <div className="Edit-Content">
              <TextArea rows={8} placeholder="Please input post content"/>
          </div>
          <div className="Edit-File">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                defaultFileList={[...fileList]}
                maxCount={1}
                className="upload-list-inline"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
          </div>
          <div className="Edit-Button">
              <span style={{marginRight: 20}}>Keyword</span>
              <Input placeholder="Please input a keyword" style={{width: 180}}/>
              {contextHolder2}
              <Button size="large" style={{width: 100, float: 'right', marginRight: 20, marginTop: -10}} onClick={handleCancel}>Cancel</Button>
              {contextHolder1}
              <Button type="primary" htmlType="submit" size="large" style={{width: 100, float: 'right', marginRight: 20, marginTop: -10}} onClick={onFinish}>Post</Button>
          </div>
        </div>
      </div>
    );
  }
export default EditForum;