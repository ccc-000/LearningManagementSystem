import React from 'react';
import { Button, Layout, theme, Tooltip } from 'antd';
import NavibarLecturer from '../components/NavibarLecturer';
import { RollbackOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

// localStorage.setItem('courseId', cid);


const CoursemainpageLecturer = (props) => {
  const getCourseName = () => {
      const courseName = props.location.pathname.split('/')[2];
      return courseName;
  }

  const {
      token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      className="site-layout"
      style={{
          minHeight: '100vh',
          marginLeft: 200,
      }}>
      {/* <Header courseName={getCourseName()} style={{padding:'5px 10px'}} > */}
      <Header style={{padding:'2px 10px'}} >
        <Link to='/DashboardLecturer'>
          <Tooltip title="Back">
            <Button type='link' shape="circle" icon={<RollbackOutlined />} />
          </Tooltip>
        </Link>
        {/* <h2>{props.courseName}</h2> */}
      </Header>
      <NavibarLecturer />
      <Footer
        style={{
            textAlign: 'center',
        }}
      >
          Hydra Learning management system©2023 Created by COMP9900 HYDRA Group
      </Footer>

    </Layout>
  );
};

export default CoursemainpageLecturer;