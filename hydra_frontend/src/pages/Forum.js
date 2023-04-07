import { useEffect, useState } from 'react';
import { Button, DatePicker, Checkbox, Table } from 'antd';
import { useNavigate, Link, json } from 'react-router-dom';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';
import '../styles/Forum.css';
const { RangePicker } = DatePicker;

function Forum() {

  //Zaffi: 判断userid与creatorid是否相同，相同则跳转到ForumDetail-ownpage页面，不同则跳转到ForumDetail-student页面
  // // navigate('/ForumDetailLecturer', {state: {postid: record.postid}});
  // navigate('/forumdetailstudent', {state: {postid: record.postid}});
  // // navigate('/ForumDetailOwnPage', {state: {postid: record.postid}});
  
  // FUnction to fetch meta data of all post from server
  const fetch_post_data = (postid, creatorid) => {
    console.log(postid);
    console.log(creatorid);
    if (localStorage.getItem('uid') === creatorid.toString()) {
      // TODO: should navigate to the owner page
      console.log("same");
    }
    else {
      navigate('/forumdetailstudent/' + postid, { state: { message: "hello" } });
    }
  }

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // Function to get UNIQUE keywods from the data
  // TODO: the key words should be unique
  const getKeyWords = () => {
    const key_list = data.map(p => {
      return {
        text: p.keyword,
        value: p.keyword,
      }
    })
    return key_list;
  }

  //tablesetting
  const columns = [
    {
      title: 'Post Title',
      dataIndex: 'posttitle',
      sorter: {
        compare: (a, b) => a.posttitle.localeCompare(b.posttitle),
        // Multiplier is used for sorting attribute priority
        multiply: 5,
      },
    },
    {
      title: 'Keyword',
      dataIndex: 'keyword',
      filters: getKeyWords(),
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

  // Function that convert json data into post list
  const jsonToPost = (posts_data) => {
    const post_list = posts_data.map(p => {
      return {
        postid: p.pid,
        posttitle: p.title,
        keyword: p.keyword,
        creator: p.creatorname,
        creatorid: p.creatorid,
        posttime: p.createtime.slice(0, 10),
        numberoflikes: p.likes.likes.length,
      }
    });
    console.log(post_list);
    return post_list;
  }

  // This function run only once to fetch the post data
  useEffect(() => {
    fetch('http://localhost:8000/forum/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // This id is just for testing
        cid: "1",
        uid: localStorage.uid
      }),
    })
      .then(response => response.json())
      .then(data => {
        const posts_data = data.posts;
        console.log(posts_data);
        setData(jsonToPost(posts_data));
      });
  }, [])

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
            <Button type="primary" htmlType="submit" size="large" style={{ width: 160, marginRight: 50 }}>Create a Post</Button>
          </Link>
          <RangePicker presets={rangePresets} onChange={onRangeChange} style={{ width: 400, height: 35, marginRight: 50 }} />
          <Checkbox onChange={onChange} style={{ fontSize: 15 }}>flagged</Checkbox>
        </div>
        <div className="Forum-List">
          <Table
            // The rowkey is to tell which property of data would be the key of the row
            rowKey={"postid"}
            columns={columns}
            dataSource={data}
            onChange={onChangeFilter}
            onRow={(record) => {
              return {
                onClick: () => {
                  fetch_post_data(record.postid, record.creatorid)
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