import React, { useEffect, useState } from 'react';
import { Input, Button, Upload, message, notification, Space} from 'antd';
import { UploadOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate, Link, useParams } from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/EditForum.css';
const { TextArea } = Input;


function EditForum() {
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
    const [data, setData] = useState();
    const { pid } = useParams();

    const navigate = useNavigate();

    //get post data from backend
    useEffect(() => {
      fetch('http://localhost:8000/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: pid
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    }, [pid]);

    const onFinish = () => {
      api.destroy();
      messageApi.open({
        type: 'loading',
        content: 'Editing...',
      });

      fetch('http://localhost:8000/editpost/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid: pid,
        // title: form.title,
        // content: form.content,
        // keyword: form.keyword,
        // multimedia: form.multimedia
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          messageApi.destroy();
          messageApi.open({
            type: 'success',
            content: 'Updated!',
            duration: 2,
          });
          setTimeout(() => {
            navigate('/forum/' + pid);
          }, 2100);
        }
      })
      .catch((error) => {
        messageApi.destroy();
        messageApi.error("Cannot connect to the server")
        console.error(error);
      })
    };

    //cancel edit
    const confirmCancel = () => {
      navigate('/forum/' + pid);
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
        {/* <Link to="/forumdetailstudent"><LeftCircleOutlined style={{fontSize: 30, marginLeft: 15, marginTop: 15, color: 'grey'}}/></Link> */}
        <div className="EditForum-Content">
          <div className="Edit-Title">
              <span style={{marginRight: 20}}>Title</span>
              <Input placeholder="Please input a post title" defaultValue={data? data.title : "No data"}/>
          </div>
          <div className="Edit-Content">
              <TextArea rows={8} placeholder="Please input post content" defaultValue={data? data.content : "No data"}/>
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
              <Input placeholder="Please input a keyword" style={{width: 180}} defaultValue={data? data.keyword : "No data"}/>
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