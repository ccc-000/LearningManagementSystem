import { Table, Checkbox, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';

const uid = localStorage.getItem('uid');

const CourseEnrolment = () => {
  const columns = [
    // {
    //   title: 'Course Name',
    //   dataIndex: 'coursename',
    //   key: 'coursename',
    //   sorter: (a, b) => a.coursename.localeCompare(b.coursename),
    // },
    {
        title: 'Course Name',
        dataIndex: 'coursename',
        key: 'coursename',
        sorter: (a, b) => a.coursename.localeCompare(b.coursename),
        render: (text, record) => (
          <div onClick={() => handleSelect(record)}>
            {record.selected ? <Checkbox checked /> : <Checkbox />}
            {text}
          </div>
        ),
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
    console.log('handleSelect', key);
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
    fetch(`http://localhost:8000/enrollcourses/`, {
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
            setData(jsonRes.courses);
            setFilteredData(jsonRes.courses);
            
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
