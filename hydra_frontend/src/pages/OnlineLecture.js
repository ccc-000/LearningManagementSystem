import React, { useState, useEffect } from 'react';
import { Button, Table, message, Space, Tooltip, Modal, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import FileSaver from 'file-saver';
import 'antd/dist/reset.css';
import '../styles/OnlineLecture.css';

function OnlineLecture() {
    const navigate = useNavigate();

    const role = localStorage.getItem('role');
    console.log('role', role);

    //TODO: get data from backend

    //TODO: 数据库添加创建时间字段

    // const [data, setData] = useState([]);

    // const jsonToPost = (material_data) => {
    //   const material_list = material_data.map(l => {
    //     const urlObj = new URL(l.filepath);
    //     return {
    //       lid: l.lid,
    //       filename: urlObj.pathname.split('/').pop().replace(/%20/g, ' '),
    //       filepath: l.filepath,
    //   }});
    //   return material_list;
    // }

    // useEffect(() => {
    //   fetch('http://localhost:8000/showmaterial/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       cid: localStorage.cid,
    //       uid: localStorage.uid
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       const material_data = data.material;
    //       console.log(material_data);
    //       setData(jsonToPost(material_data));
    //     });
    // }, []);

    const data = [
        {
            key: '1',
            lecturename: '1',
            lecturepath: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
            attendance: ["1","2"],
        },
        {
            key: '2',
            lecturename: '2',
            lecturepath: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
            attendance: ["1","2"]
        },
        {
            key: '3',
            lecturename: '3',
            lecturepath: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
            attendance: ["1","2"]
        },
    ];

    function handleUpload(record){
        //TODO: upload to material section
        console.log("Upload");
    }

    function handleCheck(record){
        console.log("Check Attendance");
        showModal(record);
    }

    //tablesetting
    const columns = [
        {
            title: 'Online Lecture',
            dataIndex: 'lecturename',
            ellipsis: true, 
            tooltip: true,
            width: '65%',
            sorter: {
                compare: (a, b) => a.lecturename.localeCompare(b.lecturename),
            },
        },
        {
            key: 'upload',
            width: '15%',
            align: 'center',
            render: (record) => (
                <Space 
                    size="middle"
                    onClick={() => handleUpload(record)}
                    style={{ cursor: 'pointer' }}
                >
                    <Tooltip placement="bottom" title="Upload recording to Material Section">
                        <a>Upload</a>    
                    </Tooltip>    
                </Space>
            ),
        },
        {
            key: 'check',
            width: '20%',
            align: 'center',
            render: (record) => (
                <Space 
                    size="middle"
                    onClick={() => handleCheck(record)}
                    style={{ cursor: 'pointer' }}
                >
                    <Tooltip placement="bottom" title="Check student attendance">
                        <a>Attendance</a>    
                    </Tooltip> 
                </Space>
            ),
        },
      ];

    //tablefilter
    const onChangeFilter = (pagination, sorter, extra) => {
      console.log('params', pagination, sorter, extra);
    };

    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState();
    const [lectureName, setLectureName] = useState();

    const showModal = (record) => {
        //TODO: get the attendance list
        const text = record.attendance.join('\t');
        setModalText(text);
        setLectureName(record.lecturename);
        setOpen(true);
    };

    const handleOk = () => {
        const lines = modalText.split('\t');
        const csvContent = lines.map(line => `"${line}"`).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        const filename = `${lectureName}-Attandence.csv`;
        FileSaver.saveAs(blob, filename);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const CourseMsg = "This live is for lecture 1";

    return (
      <div className="OnlineLecture-Total">
        <div className="OnlineLecture-Content">
            <div className="OnlineLecture-Create">
                {role !== 'student' ?
                    <Tooltip placement="right" title="Don't forget to start record the online lecture!">
                        <Button type="primary" htmlType="submit" size="large" style={{width: 160, marginRight: 50}}>Start a live stream</Button>
                    </Tooltip>
                :
                    <Tooltip placement="bottom" title={CourseMsg}>
                        <Button type="primary" htmlType="submit" size="large" style={{width: 200, marginRight: 50}}>Join a live stream</Button>
                    </Tooltip>
                }    
            </div>
            <div className="OnlineLecture-List">
                {role !== 'student' &&
                    <Table 
                        // rowKey={"lid"}
                        columns={columns} 
                        dataSource={data} 
                        onChange={onChangeFilter}
                    />
                }
                <Modal
                    title="Student Attendance"
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Download"
                    cancelText="Close"
                >
                    <div style={{ width: '450px', maxHeight: '250px', overflowY: 'auto', margin: '30px 10px 30px 10px' }}>
                        <Typography.Text style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
                            {modalText}
                        </Typography.Text>
                    </div>
                </Modal>
            </div>
        </div>
      </div>
    );
  }
export default OnlineLecture;