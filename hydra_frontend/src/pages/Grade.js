import React from 'react';
import { Button, Layout, Tooltip, Space, Table, Tag } from 'antd';
import Navibar from '../components/Navibar';
import { RollbackOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Grade = () => {
    const SectionName = localStorage.getItem('cname') + " —— Grade";

    const columns = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
        },
      ];
      const data = [
        {
            key: '1',
            item: 'Quiz 1',
            grade: '8/9'
        },
        {
            key: '2',
            item: 'Quiz 2',
            grade: '7/9'
        },
        {
            key: '3',
            item: 'Quiz 3',
            grade: '9/9'
        },
        {
            key: '4',
            item: 'Assigment 1',
            grade: '12/15'
        },
        {
            key: '5',
            item: 'Assigment 2',
            grade: '10/15'
        },
        {
            key: '6',
            item: 'Assigment 3',
            grade: '11/15'
        },
        {
            key: '7',
            item: 'Final Exam',
            grade: '25/28'
        },
        {
            key: '8',
            item: 'Total',
            grade: null
        },
      ];

      const totalGrade = data.reduce((acc, cur) => {
        if (cur.grade) {
          const gradeArr = cur.grade.split('/');
          const gradeNum = Number(gradeArr[0]);
          acc += gradeNum;
        }
        return acc;
      }, 0);
      
      data[data.length - 1].grade = `${totalGrade}/100`;

    return (
        <Layout
        className="site-layout"
        style={{
            minHeight: '100vh',
            marginLeft: 200,
        }}>
        <Header style={{ padding: '2px 10px' }}>
          <Link to='/dashboard'>
            <Tooltip title="Back">
              <Button type='link' shape="circle" icon={<RollbackOutlined />} />
            </Tooltip>
          </Link>
          <h2 style={{display: 'inline-block', marginLeft: '20px', color:'white'}}>{SectionName}</h2>
        </Header>
        <Table columns={columns} dataSource={data} />;

        <Navibar />   
        <Footer
        style={{
            textAlign: 'center',
        }}
      >
          Hydra Learning management system©2023 Created by COMP9900 HYDRA Group
      </Footer>
    </Layout>  
    );
}

export default Grade;