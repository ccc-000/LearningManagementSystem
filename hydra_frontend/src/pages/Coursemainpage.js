import React from 'react';
import { Button, Layout, theme, Tooltip } from 'antd';
import Navibar from '../components/Navibar';
import { RollbackOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const role = localStorage.getItem('role');
console.log(role);

const Coursemainpage = () => {
  const {
      token: { colorBgContainer },
  } = theme.useToken();
  if (role === 'lecturer') {
    return (
    <Layout
      className="site-layout"
      style={{
          minHeight: '100vh',
          marginLeft: 200,
      }}>
      {/* <Header courseName={getCourseName()} style={{padding:'5px 10px'}} > */}
        <Header style={{ padding: '2px 10px' }}>
          <Link to='/dashboardLecturer'>
            <Tooltip title="Back">
              <Button type='link' shape="circle" icon={<RollbackOutlined />} />
            </Tooltip>
          </Link>
        </Header>
        <Navibar />   
        <Footer
        style={{
            textAlign: 'center',
        }}
      >
          Hydra Learning management system©2023 Created by COMP9900 HYDRA Group
      </Footer>
    </Layout>  
    )} else {
      return (
      <Layout
      className="site-layout"
      style={{
          minHeight: '100vh',
          marginLeft: 200,
      }}>
      {/* <Header courseName={getCourseName()} style={{padding:'5px 10px'}} > */}
        <Header style={{ padding: '2px 10px' }}>
          <Link to='/dashboard'>
            <Tooltip title="Back">
              <Button type='link' shape="circle" icon={<RollbackOutlined />} />
            </Tooltip>
          </Link>
        </Header>
        <Navibar />   
        <Footer
        style={{
            textAlign: 'center',
        }}
        >
          Hydra Learning management system©2023 Created by COMP9900 HYDRA Group
        </Footer>
      </Layout>  
      )
    }      
};

export default Coursemainpage;