import React, { useEffect, useState } from 'react';
import { LikeOutlined, PushpinOutlined } from '@ant-design/icons';
import { Input, Button, Descriptions, Badge, message, notification, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
// import { Translate } from "@google-cloud/translate";

import 'antd/dist/reset.css';
import '../styles/ForumDetail-student.css';
const { TextArea } = Input;


function ForumDetailStudent() {
  const [messageApi1, contextHolder1] = message.useMessage();
  const [api1, contextHolder2] = notification.useNotification();
  const [data, setData] = useState(undefined);
  const [reply, setReply] = useState("");
  // const [translatedText, setTranslatedText] = useState("");

  const role = localStorage.getItem('role');
  console.log("role:", role);

  const { pid } = useParams();
  const navigate = useNavigate();

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

  const propsLike = {
    fontSize: 23,
    cursor: 'pointer',
  }
  
  const propsFlag = {
    fontSize: 23, 
    marginLeft: 30, 
    cursor: 'pointer',
  }

  const propsPrivate = {
    width: 80, 
    marginRight: 30,
    display: 'none'
  }

  const propsDelete = {
    width: 80, 
    marginRight: 30,
    display: 'none'
  }

  const propsChange = {
    width: 80, 
    marginRight: 30,
    display: 'none'
  }

  let privatecontent = ""
  let PostDetail = "No Data"

  if (data) {
    PostDetail = data ? data.content : "No data";
    if (data.editted) {
      propsEdit.display = 'block';
    }
    if (data.likes.likes.includes(localStorage.getItem('uid'))) {
      propsLike.color = 'red';
    }
    if (data.flagged.includes(localStorage.getItem('uid'))) {
      propsFlag.color = 'blue';
    }
    if (!data.privacy) {
    privatecontent = "Private"
    }
    if (data.privacy) {
    privatecontent = "Public"
    }
    if (parseInt(localStorage.getItem("uid")) === data.creatorid) {
      propsChange.display = 'block';
    }
    if (role !== "student" || parseInt(localStorage.getItem("uid")) === data.creatorid) {
      propsPrivate.display = 'block';
      propsDelete.display = 'block';
    }
  }

  function handleLike() {
    if (data.likes.likes.includes(localStorage.getItem('uid'))) {
      let likedata = {...data};
      likedata.likes.likes = data.likes.likes.filter(uid => uid !== localStorage.getItem('uid'))
      setData(likedata)
    }else{
      let likedata = {...data};
      likedata.likes.likes.push(localStorage.getItem('uid'))
      setData(likedata)
    }
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
        if(data.status === 200){
          console.log(data);
        }
      });
  }

  function handleFlag() {
    if (data.flagged.includes(localStorage.getItem('uid'))) {
      let flagdata = {...data};
      flagdata.flagged = data.flagged.filter(uid => uid !== localStorage.getItem('uid'))
      setData(flagdata)
    }else{
      let flagdata = {...data};
      flagdata.flagged.push(localStorage.getItem('uid'))
      setData(flagdata)
    }
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
        if(data.status === 200){
          console.log(data);
        }
      });
  }

  function makePrivate() {
    if (data.privacy) {
      let privatedata = {...data};
      privatedata.privacy = "False"
      setData(privatedata)
    }else{
      let privatedata = {...data};
      privatedata.privacy = "True"
      setData(privatedata)
    }
    console.log("makePrivate");
    fetch('http://localhost:8000/setprivate/', {
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
        if(data.status === 200){
          console.log(data);
        }else{
          console.log(data);
        }
      });
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
          navigate('/coursemainpage/forum');
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
    navigate('/coursemainpage/editforum/' + pid);
  }

  //translate
  // const translateContent = async (text, targetLanguage) => {
  //   try {
  //     const translate = new Translate({ projectId: 'local-chalice-384004', keyFilename: '../local-chalice-384004-8eb37a93be31.json' }); // 替换成你的 GCP 项目 ID 和 API 密钥文件路径
  //     const [translation] = await translate.translate(text, targetLanguage);
  //     setTranslatedText(translation);
  //   } catch (error) {
  //     console.error("Translation error:", error);
  //   }
  // };

  function handleTranslate() {
    console.log("translate");
    fetch('http://localhost:8000/translate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: localStorage.uid,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.language);
        // translateContent(PostDetail, data.language);
      }
    );
    // PostDetail = translatedText;
  }

  // Handle submit reply
  function handleSubmit() {
    console.log(reply);
    fetch('http://localhost:8000/replyposts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: localStorage.uid,
        pid: pid,
        content: reply
      }),
    })
    .then(response => response.json())
    .then((fetched_data) => {
      if (fetched_data.status === 200) {
        const new_data = {...data};
        new_data.reply.reply.push({
          [localStorage.getItem("uid")] : [reply]
        })
        setReply("")
        setData(new_data)
      }
    })
    .catch((e) => {
      console.log(e)
    })
  }

  // Generate reply list from data
  const reply_components = []
  if (data) {
    data.reply.reply.forEach((e) => console.log(Object.keys(e)[0], Object.values(e)[0]))
    data.reply.reply.forEach((e) => {
      reply_components.push(
        <div className="ForumDetail-Reply">
          <Descriptions>
              <Descriptions.Item label="Reply from" span={3}>{Object.keys(e)[0]}</Descriptions.Item>
              <Descriptions.Item label="Content" span={3}>
                {Object.values(e)[0]}
              </Descriptions.Item>
            </Descriptions>
          </div>
      )
    })
  }

  // Render multimedia
  let media_compnent = undefined
  if (data) {
    media_compnent = data.multimedia ? <img src={data.multimedia} alt="avatar" style={{ width: '50%' }} /> : <></>
  }

  return (
    <div className="ForumDetail-Total">
      <div className="ForumDetail-Post">
        <Descriptions title={data ? data.title : "No data"}>
          <Descriptions.Item label="Creator" span={2}>{data ? data.creatorname : "No data"}</Descriptions.Item>
          <Descriptions.Item label="Post Time">{data ? data.createtime.slice(0, 10) : "No data"}</Descriptions.Item>
          <Descriptions.Item label="Keyword" span={2}>{data ? data.keyword : "No data"}</Descriptions.Item>
          <Descriptions.Item span={1} style={{ float: 'right' }}>
            <Button htmlType="submit" size="small" style={{ width: 80, marginRight: 30 }} onClick={handleTranslate}>Translate</Button>
          </Descriptions.Item>
          <Descriptions.Item label="Content" span={3}>
            {/* {t({{data}} ? {{data.content}} : "No data"}})} */}
            {/* {data ? data.content : "No data"} */}
            {PostDetail}
          </Descriptions.Item>
          <Descriptions.Item span={2}>
            {media_compnent}
          </Descriptions.Item>
          <Descriptions.Item span={1} style={{ float: 'right', marginRight: 30 }}>
            <p style={propsEdit}>edited</p>
          </Descriptions.Item>
          <Descriptions.Item span={2}>
            <Badge size="small" count={data ? data.likes.likes.length : 0}>
              <LikeOutlined style={propsLike} onClick={handleLike}/>
            </Badge>
            <PushpinOutlined style={propsFlag} onClick={handleFlag}/>
          </Descriptions.Item>
          <Descriptions.Item >
            {contextHolder2}
            <Button type="primary" htmlType="submit" size="medium" style={propsDelete} onClick={handleDelete}>Delete</Button>
            <Button type="primary" htmlType="submit" size="medium" style={propsPrivate} onClick={makePrivate}>{privatecontent}</Button>
            <Button type="primary" htmlType="submit" size="medium" style={propsChange} onClick={handleEdit}>Edit</Button>
          </Descriptions.Item>
        </Descriptions>
      </div>
      {reply_components}
      <div className="ForumDetail-Reply">
        <TextArea rows={2} placeholder="Please input the reply" value={reply} onChange={(e) => {setReply(e.target.value)}}/>
        <Button type="primary" htmlType="submit" size="medium" style={{ marginLeft: 30 }} onClick={handleSubmit}>Reply</Button>
      </div>
    </div>
  );
}
export default ForumDetailStudent;