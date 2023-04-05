import { useState } from 'react';
import { Input, Button, Upload, message, notification, Space } from 'antd';
import { UploadOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/CreateForum.css';
const { TextArea } = Input;


function CreateForum() {
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

  //create a post
  const [messageApi, contextHolder1] = message.useMessage();
  const [api, contextHolder2] = notification.useNotification();
  const [form, setFrom] = useState({
    title: "",
    content: "",
    keyword: ""
  });

  const navigate = useNavigate();
  const onFinish = () => {
    console.log(form);
    fetch('http://localhost:8000/createposts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        creatorid: localStorage.uid,
        cid: "9900",
        title: form.title,
        content: form.content,
        keyword: form.keyword,
        createtime: 123,
        multimedia: 12412
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === true) {
          localStorage.setItem('uid', data.uid);
          console.log(data.uid)
          navigate("/dashboard");
        }
      });
    //Zaffi: 将post的内容新增到数据库中
    //获取Forum页面传输的courseid和creatorid
    //获取当前时间
    //获取post内容
    // console.log('Received values of post: ', currentTime);

    messageApi.open({
      type: 'loading',
      content: 'Creating...',
      duration: 2,
    });
    setTimeout(() => {
      messageApi.open({
        type: 'success',
        content: 'Created!',
        duration: 2,
      });
    }, 2100);
    // setTimeout(() => {
    //   navigate('/forum');
    // }, 3500);
  };

  //cancel create
  const confirmCancel = () => {
    navigate('/forum');
  };
  function handleCancel() {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button danger type="primary" size="medium" onClick={confirmCancel} style={{ width: 100 }}>
          Continue
        </Button>
        <Button size="medium" onClick={() => api.destroy()} style={{ width: 100 }}>
          Cancel
        </Button>
      </Space>
    );
    api.open({
      message: 'Cancel Confirm',
      description:
        'Are you sure to exit the current page?',
      btn,
      key,
    });
  }
  return (
    <div className="CreateForum-Total">
      <Link to="/forum"><LeftCircleOutlined style={{ fontSize: 30, marginLeft: 15, marginTop: 15, color: 'grey' }} /></Link>
      <div className="CreateForum-Content">
        <div className="Create-Title">
          <span style={{ marginRight: 20 }}>Title</span>
          <Input placeholder="Please input a post title" value={form.title} onChange={(e) => { setFrom({ ...form, title: e.target.value }) }} />
        </div>
        <div className="Create-Content">
          <TextArea rows={8} placeholder="Please input post content" value={form.content} onChange={(e) => { setFrom({ ...form, content: e.target.value }) }} />
        </div>
        <div className="Create-File">
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
        <div className="Create-Button">
          <span style={{ marginRight: 20 }}>Keyword</span>
          <Input placeholder="Please input a keyword" style={{ width: 180 }} value={form.keyword} onChange={(e) => { setFrom({ ...form, keyword: e.target.value }) }} />
          {contextHolder2}
          <Button size="large" style={{ width: 100, float: 'right', marginRight: 20, marginTop: -10 }} onClick={handleCancel}>Cancel</Button>
          {contextHolder1}
          <Button type="primary" htmlType="submit" size="large" style={{ width: 100, float: 'right', marginRight: 20, marginTop: -10 }} onClick={onFinish}>Post</Button>
        </div>
      </div>
    </div>
  );
}
export default CreateForum;