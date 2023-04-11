import { useEffect, useState } from 'react';
import { LikeOutlined, PushpinOutlined } from '@ant-design/icons';
import { Input, Button, Descriptions, Badge, message, notification, Space } from 'antd';
import { useNavigate, Link, useParams } from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/ForumDetail-student.css';
const { TextArea } = Input;


function ForumDetailStudent() {
  const [messageApi1, contextHolder1] = message.useMessage();
  const [api1, contextHolder2] = notification.useNotification();
  const [data, setData] = useState(undefined);
  const { pid } = useParams();

  // Receive post data from the backend
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

  const navigate = useNavigate();

  // TODO: make the post private
  function makePrivate() {
    console.log("makePrivate");
  }
  // TODO: delete the post
  function deleteForum() {
    console.log("deleteForum");
    messageApi1.open({
      type: 'loading',
      content: 'Deleting...',
      duration: 2,
    });
    setTimeout(() => {
      messageApi1.open({
        type: 'success',
        content: 'Deleted!',
        duration: 2,
      });
    }, 2100);
    setTimeout(() => {
      navigate('/forum');
    }, 3500);
  }
  function handleDelete() {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="primary" size="medium" onClick={() => api1.destroy()} style={{ width: 100 }}>
          Continue
        </Button>
        {contextHolder1}
        <Button size="medium" onClick={deleteForum} style={{ width: 100 }}>
          Delete
        </Button>
      </Space>
    );
    api1.open({
      message: 'Delete Confirm',
      description:
        'Are you sure to delete the post?',
      btn,
      key,
    });
  }
  return (
    <div className="ForumDetail-Total">
      <div className="ForumDetail-Post">
        <Descriptions title={data ? data.title : "No data"}>
          <Descriptions.Item label="Creator" span={2}>{data ? data.creatorname : "No data"}</Descriptions.Item>
          <Descriptions.Item label="Post Time">{data ? data.createtime.slice(0, 10) : "No data"}</Descriptions.Item>
          <Descriptions.Item label="Keyword" span={2}>{data ? data.keyword : "No data"}</Descriptions.Item>
          <Descriptions.Item span={1} style={{ float: 'right' }}>
            <Button htmlType="submit" size="small" style={{ width: 80, marginRight: 30 }}>Translate</Button>
          </Descriptions.Item>
          <Descriptions.Item label="Content" span={3}>
            {data ? data.content : "No data"}
          </Descriptions.Item>
          <Descriptions.Item span={2}>
            {() => {
              if (data) {
                { data.multimedia ? <img src={data.multimedia} alt="avatar" style={{ width: '100%' }} /> : <></> }
              }
            }}
          </Descriptions.Item>
          <Descriptions.Item span={1} style={{ float: 'right' }}>
            {() => {
              if (data && data.edited) {
                return "edited"
              }
              return ""
            }}
          </Descriptions.Item>
          <Descriptions.Item span={2}>
            <Badge size="small" count={data ? data.likes.length : 0}>
              {/* TODO: the like and pin button should change with the state */}
              <LikeOutlined style={{ fontSize: 23, cursor: 'pointer', color: 'red' }} />
            </Badge>
            <PushpinOutlined style={{ fontSize: 23, marginLeft: 30, cursor: 'pointer', color: 'blue' }} />
          </Descriptions.Item>
          <Descriptions.Item >
            {contextHolder2}
            <Button type="primary" htmlType="submit" size="medium" style={{ width: 80, marginRight: 30 }} onClick={handleDelete}>Delete</Button>
            <Button type="primary" htmlType="submit" size="medium" style={{ width: 80, marginRight: 30 }} onClick={makePrivate}>Private</Button>
            <Link to="/editforum">
              <Button type="primary" htmlType="submit" size="medium" style={{ width: 80, marginRight: 30 }}>Edit</Button>
            </Link>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="ForumDetail-Reply">
        <TextArea rows={2} placeholder="Please input the reply" />
        <Button type="primary" htmlType="submit" size="medium" style={{ marginLeft: 30 }}>Reply</Button>
      </div>
    </div>
  );
}
export default ForumDetailStudent;