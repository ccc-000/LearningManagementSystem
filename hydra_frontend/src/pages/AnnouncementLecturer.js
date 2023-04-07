import { useState } from 'react';
import { Button, Modal, Form, Input, message, Layout, Divider, Tooltip} from 'antd';
import NavibarLecturer from '../components/NavibarLecturer';
import { RollbackOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const AnnouncementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formContent, setFormContent] = useState({ title: '', content: '' });
  const handleOk = (formContent) => {
    console.log('formContent', formContent);
    fetch('http://localhost:8000/sendemail/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formContent),
        }).then(async(response) => {
            const jsonRes = await response.json();
            if (response.status !== 200) {
                message.error(jsonRes.error);
                return;
            }
            message.success('Successful!');
        })
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <><Layout
      className="site-layout"
      style={{
        minHeight: '100vh',
        marginLeft: 200,
      }}>
      {/* <Header courseName={getCourseName()} style={{padding:'5px 10px'}} > */}
      <Header style={{ padding: '2px 10px' }}>
        <Link to='/DashboardLecturer'>
          <Tooltip title="Back">
            <Button type='link' shape="circle" icon={<RollbackOutlined />} />
          </Tooltip>
        </Link>
        {/* <span style={{fontSize:'20px', color:'whitesmoke', marginLeft:'5px'}}>COMP9900</span> */}
      </Header>
      <Divider orientation="left" style={{fontSize:'25px'}}>Announcement</Divider>
      <div>
        <Button onClick={() => setIsModalVisible(true)}>
          Post Announcement
        </Button>
        <Modal
          title="Announcement"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button form="announcementForm" key="submit" htmlType="submit" type="primary">
              Submit
            </Button>,
          ]}
        >
          <Form
            id="announcementForm"
            onFinish={handleOk}
            onFinishFailed={onFinishFailed}
            initialValues={{ title: '', content: '' }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of announcement!',
                },
              ]}
              onChange={(e) => setFormContent({ ...formContent, title: e.target.value })}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Please input the content of announcement!',
                },
              ]}
              onChange={(e) => setFormContent({ ...formContent, content: e.target.value })}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <NavibarLecturer />
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Hydra Learning management system©2023 Created by COMP9900 HYDRA Group
      </Footer>

    </Layout></>
  );
};

export default AnnouncementPage;
