import { Table, Checkbox, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';

// const dataSource = [
//   {
//     key: '1',
//     coursename: 'comp9318',
//     creatorname: 'Edward',
//     coursedescription: 'London No.1 Lake Park',
//   },
//   {
//     key: '2',
//     coursename: 'comp9414',
//     creatorname: 'Alexandra',
//     coursedescription: 'London No.7 Lake Park',
//   },
//   {
//     key: '3',
//     coursename: 'comp9418',
//     creatorname: 'Sally',
//     coursedescription: 'London No. 5 Lake Park',
//   },
//   {
//     key: '4',
//     coursename: 'comp9417',
//     creatorname: 'Eric',
//     coursedescription: 'London No. 2 Lake Park',
//   },
// ];

const uid = localStorage.getItem('uid');

const CourseEnrolment = () => {
  const columns = [
    {
      title: 'Select',
      key: 'action',
      render: (_, record) => (
        <Checkbox onChange={() => handleSelect(record.key)}></Checkbox>
      ),
    },
    {
      title: 'Course Name',
      dataIndex: 'coursename',
      key: 'coursename',
      sorter: (a, b) => a.coursename.localeCompare(b.coursename),
    },
    {
      title: 'Lecturer',
      dataIndex: 'creatorname',
      key: 'creatorname',
      sorter: (a, b) => a.creatorname - b.creatorname,
    },
    {
      title: 'Course Description',
      dataIndex: 'coursedescription',
      key: 'coursedescription',
    },
  ];
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearch = (value) => {
    const filteredData = data.filter((record) => {
      return record.coursename.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredData(filteredData);
  };

  const handleSelect = (key) => {
    const index = selectedRows.indexOf(key);
    if (index === -1) {
      setSelectedRows([...selectedRows, key]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== key));
    }
  };

  const handleSubmit = () => {
    
    console.log('Selected Rows:', selectedRows);
    const request = {selectedCourses: selectedRows, uid: uid};
    fetch(`http://localhost:8000/courses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        }).then(async(response) => {
            const jsonRes = await response.json();
            console.log(jsonRes);
            if (response.status !== 200) {
                message.error(jsonRes.error);
                return;
            }
            message.success('Successful!');
            
        })
  };
  const fetchCourses = () => {
    fetch(`http://localhost:8000/courses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({'uid': uid}),
        }).then(async(response) => {
            const jsonRes = await response.json();
            console.log(jsonRes);
            if (response.status !== 200) {
                message.error(jsonRes.error);
                return;
            }
            message.success('Successful!');
            setData(jsonRes);
            setFilteredData(jsonRes);
            
        })
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <Input.Search placeholder="Search" onSearch={handleSearch} />
      <Table
        dataSource={filteredData}
        columns={columns}

        onRow={(record, rowIndex) => {
          return {
            onClick: () => handleSelect(record.key),
          };
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <Button type='primary' onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
};

export default CourseEnrolment;
