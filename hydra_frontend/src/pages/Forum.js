import React, { useState } from 'react';
import { Button, DatePicker, Checkbox, Table} from 'antd';
import {useNavigate, Link} from 'react-router-dom';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';
import '../styles/Forum.css';
const { RangePicker } = DatePicker;

function Forum() {
    const navigate = useNavigate();
    //tablesetting
    const columns = [
        {
            title: 'Post Title',
            dataIndex: 'posttitle',
            sorter: {
                compare: (a, b) => a.posttitle.localeCompare(b.posttitle),
                multiply: 5,
            },
        },
        {
            title: 'Keyword',
            dataIndex: 'keyword',
            filters: [
              {
                text: 'Post',
                value: 'Post',
              },
              {
                text: 'React',
                value: 'React',
              },
            ],
            filterMode: 'tree',
            filterSearch: true,
            sorter: {
                compare: (a, b) => a.keyword.localeCompare(b.keyword),
                multiply: 4,
            },
            onFilter: (value, record) => record.keyword.startsWith(value),
            width: '30%',
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            sorter: {
                compare: (a, b) => a.creator.localeCompare(b.creator),
                multiply: 3,
            },
        },
        {
          title: 'Post Time',
          dataIndex: 'posttime',
          sorter: {
            compare: (a, b) => new Date(a.posttime) - new Date(b.posttime),
            multiply: 2,
          },
        },
        {
            title: 'Number of Likes',
            dataIndex: 'numberoflikes',
            sorter: {
                compare: (a, b) => a.numberoflikes - b.numberoflikes,
                multiply: 1,
            },
        },
      ];
    //Zaffi: 获取后台数据并转化为一下格式
    const data = [
        {
          key: '1',
          postid: '1',
          posttitle: 'How to create a post?',
          keyword: 'Post',
          creatorid: '1',
          creator:'Leonard Hofstadter',
          posttime: '2023-04-01',
          numberoflikes: 12,
          pin: true,
        },
        {
          key: '2',
          postid: '2',
          posttitle: 'React and Djanjo',
          keyword: 'React',
          creator:'Sheldon Cooper',
          posttime: '2023-04-02',
          numberoflikes: 24,
          pin: false,
        },
      ];
    //Gemma: 实现时间筛选和ifflagged筛选
    //forumpostdate
    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };
    const rangePresets = [
        {
          label: 'Last 7 Days',
          value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
          label: 'Last 14 Days',
          value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
          label: 'Last 30 Days',
          value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
          label: 'Last 90 Days',
          value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];
    //ifflagged
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    //tablefilter
    const onChangeFilter = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };
    //Gemma: ?是否将createforum做成弹窗
    return (
      <div className="Forum-Total">
        <div className="Forum-Content">
          <div className="Forum-Filter">
                <Link to="/createforum">
                  {/* Zaffi: 向createpost页面传输courseid和creatorid */}
                  <Button type="primary" htmlType="submit" size="large" style={{width: 160, marginRight: 50}}>Create a Post</Button>
                </Link>
              <RangePicker presets={rangePresets} onChange={onRangeChange} style={{width: 400, height: 35, marginRight: 50}}/>
              <Checkbox onChange={onChange} style={{fontSize: 15}}>flagged</Checkbox>
          </div>
          <div className="Forum-List">
              <Table 
                columns={columns} 
                dataSource={data} 
                onChange={onChangeFilter}
                onRow={(record) => {
                  return {
                    //Zaffi: 判断userid与creatorid是否相同，相同则跳转到ForumDetail-ownpage页面，不同则跳转到ForumDetail-student页面
                    onClick: event => {
                      console.log(record.postid)
                      // navigate('/ForumDetailLecturer', {state: {postid: record.postid}});
                      navigate('/forumdetailstudent', {state: {postid: record.postid}});
                      // navigate('/ForumDetailOwnPage', {state: {postid: record.postid}});
                    },
                  };
                }}
              />
          </div>
        </div>
      </div>
    );
  }
export default Forum;