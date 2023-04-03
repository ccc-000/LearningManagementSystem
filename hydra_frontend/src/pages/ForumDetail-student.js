import React from 'react';
import { LikeOutlined, PushpinOutlined } from '@ant-design/icons';
import { Input, Button, Descriptions, Badge, message, notification, Space } from 'antd';
import { useNavigate, Link} from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/ForumDetail-student.css';
const { TextArea } = Input;


function ForumDetailStudent() {
    const [messageApi1, contextHolder1] = message.useMessage();
    const [api1, contextHolder2] = notification.useNotification();
    const navigate = useNavigate();
    // Zaffi: 将postid对应的private属性改为true
    function makePrivate() {
      console.log("makePrivate");
    }
    // Zaffi: 将postid对应的post删除
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
    function handleDelete(){
      const key = `open${Date.now()}`;
      const btn = (
        <Space>
          <Button  type="primary" size="medium" onClick={() => api1.destroy()}style={{width:100}}>
            Continue
          </Button>
          {contextHolder1}
          <Button size="medium" onClick={deleteForum} style={{width:100}}>
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
          <Descriptions title="How to make a post">
            {/* Zaffi: 根据接受的postid显示数据 */}
            <Descriptions.Item label="Creator" span={2}>Sheldon Cooper</Descriptions.Item>
            <Descriptions.Item label="Post Time">2023-04-02</Descriptions.Item>
            <Descriptions.Item label="Keyword" span={2}>Post</Descriptions.Item>
            <Descriptions.Item span={1} style={{float: 'right'}}>
              <Button htmlType="submit" size="small" style={{width: 80, marginRight: 30}}>Translate</Button>
            </Descriptions.Item>
            <Descriptions.Item label="Content" span={3}>
              How to make a post? That is a question.How to make a post? That is a question.How to make a post? That is a question.How to make a post? That is a question.
            </Descriptions.Item>
            <Descriptions.Item span={2}>
              <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="avatar" style={{ width: '100%' }} />
            </Descriptions.Item>
            <Descriptions.Item span={1} style={{float: 'right'}}>edited</Descriptions.Item>
            <Descriptions.Item span={2}>
              <Badge size="small" count={5} >
                <LikeOutlined style={{fontSize: 20}}/>
              </Badge>
              <PushpinOutlined style={{fontSize: 23, marginLeft:30}}/>
            </Descriptions.Item>
            <Descriptions.Item >
              {contextHolder2}
              <Button type="primary" htmlType="submit" size="medium" style={{width: 80, marginRight:30}} onClick={handleDelete}>Delete</Button>
              <Button type="primary" htmlType="submit" size="medium" style={{width: 80, marginRight:30}} onClick={makePrivate}>Private</Button>
              <Link to="/editforum">
                <Button type="primary" htmlType="submit" size="medium" style={{width: 80, marginRight:30}}>Edit</Button>
              </Link>
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="ForumDetail-Reply">
          <TextArea rows={2} placeholder="Please input the reply"/>
          <Button type="primary" htmlType="submit" size="medium" style={{marginLeft: 30}}>Reply</Button>
        </div>
      </div>
    );
  }
export default ForumDetailStudent;