import React, { useEffect, useState } from 'react';
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

  //set components
  const propsEdit = {
    display: 'none'
  }

  let propsLike = {
    fontSize: 23,
    cursor: 'pointer',
  }
  
  let propsFlag = {
    fontSize: 23, 
    marginLeft: 30, 
    cursor: 'pointer',
  }

  if (data) {
    if (data.editted) {
      propsEdit.display = 'block';
    }
    if (data.likes.likes.includes(localStorage.getItem('uid'))) {
      propsLike.color = 'red';
    }
    if (data.flagged.flagged.includes(localStorage.getItem('uid'))) {
      propsFlag.color = 'blue';
    }
  }

  function handleLike() {
    fetch('http://localhost:8000/likeposts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid: pid,
        uid: localStorage.getItem('uid')
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.status === 200){
          window.location.reload();
        }
      });
  }

  function handleFlag() {
    // if (data.flagged.flagged.includes(localStorage.getItem('uid'))) {
    //   let flagdata = data;
    //   flagdata.flagged.flagged = data.flagged.flagged.filter(uid => uid !== localStorage.getItem('uid'))
    //   console.log("flagged: ", flagdata);
    //   propsFlag.color = 'black';
    // }else{
    //   // propsFlag.color = 'blue';
    // }
    fetch('http://localhost:8000/flagposts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid: pid,
        uid: localStorage.getItem('uid')
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.status === 200){
          window.location.reload();
        }
      });
  }

  const navigate = useNavigate();

  // TODO: make the post private
  function makePrivate() {
    console.log("makePrivate");
  }

  function deletePost() {
    console.log("deletePost");
    api1.destroy();
    messageApi1.open({
      type: 'loading',
      content: 'Deleting...',
    });
    fetch ('http://localhost:8000/deleteposts/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid: pid,
        uid: localStorage.getItem('uid')
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        messageApi1.destroy();
        messageApi1.open({
          type: 'success',
          content: 'Deleted!',
          duration: 2,
        });
        setTimeout(() => {
          navigate('/forum');
        }, 2100);
      }
    })
    .catch((error) => {
      messageApi1.destroy();
      messageApi1.error("Cannot connect to the server")
      console.error(error);
    })
  }

  //delete post confirm
  function handleDelete() {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="primary" size="medium" onClick={() => api1.destroy()} style={{ width: 100 }}>
          Continue
        </Button>
        {contextHolder1}
        <Button size="medium" onClick={deletePost} style={{ width: 100 }}>
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

  //edit post
  function handleEdit() {
    console.log("edit");
    navigate('/editforum/' + pid);
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
          <Descriptions.Item span={1} style={{ float: 'right', marginRight: 30 }}>
            <p style={propsEdit}>edited</p>
          </Descriptions.Item>
          <Descriptions.Item span={2}>
            <Badge size="small" count={data ? data.likes.likes.length : 0}>
              {/* TODO: the like and pin button should change with the state */}
              <LikeOutlined style={propsLike} onClick={handleLike}/>
            </Badge>
            <PushpinOutlined style={propsFlag} onClick={handleFlag}/>
          </Descriptions.Item>
          <Descriptions.Item >
            {contextHolder2}
            <Button type="primary" htmlType="submit" size="medium" style={{ width: 80, marginRight: 30 }} onClick={handleDelete}>Delete</Button>
            <Button type="primary" htmlType="submit" size="medium" style={{ width: 80, marginRight: 30 }} onClick={makePrivate}>Private</Button>
            <Link to="/editforum">
              <Button type="primary" htmlType="submit" size="medium" style={{ width: 80, marginRight: 30 }} onClick={handleEdit}>Edit</Button>
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