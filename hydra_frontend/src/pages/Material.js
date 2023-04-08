import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Select, Upload, message} from 'antd';
import {useNavigate, Link} from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import '../styles/Material.css';

function Material() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const jsonToPost = (material_data) => {
      const material_list = material_data.map(m => {
        return {
          mid: m.mid,
          type: m.type,
          filepath: m.filepath,
      }});
      return material_list;
    }

    useEffect(() => {
      fetch('http://localhost:8000/showmaterial/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cid: 1,
          uid: localStorage.uid
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const material_data = data.material;
          console.log(material_data);
          setData(jsonToPost(material_data));
        });
    }, []);

    //tablesetting
    const columns = [
        {
            title: 'Material Type',
            dataIndex: 'type',
            filters: [
              {
                text: 'PPT',
                value: 'PPT',
              },
              {
                text: 'PDF',
                value: 'PDF',
              },
              {
                text: 'ZIP',
                value: 'ZIP',
              },
              {
                text: 'MP4',
                value: 'MP4',
              },
            ],
            filterMode: 'tree',
            filterSearch: true,
            sorter: {
                compare: (a, b) => a.type.localeCompare(b.type),
            },
            onFilter: (value, record) => record.type.startsWith(value),
            width: '30%',
        },
        {
            title: 'Material',
            dataIndex: 'filepath',
            sorter: {
                compare: (a, b) => a.filepath.localeCompare(b.filepath),
            },
        },
      ];

    //tablefilter
    const onChangeFilter = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };

    //create a new material
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form, setForm] = useState({
      type: "",
      filepath: "D:\\9900\\COMP9900Wk01Lecture23T1.pdf"
    });

    const showModal = () => {
      setOpen(true);
    };
    const handleOk = () => {
      console.log(form);
      setConfirmLoading(true);
      fetch('http://localhost:8000/uploadmaterial/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cid: 1,
          type: form.type,
          filepath: form.filepath
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.status === 200) {
            setTimeout(() => {
              setOpen(false);
              setConfirmLoading(false);
              window.location.reload();
            }, 2000);
          }
          // TODO: if upload failed, show error message
        });
    };

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };

    const handleChange = (value) => {
      console.log(`selected ${value}`);
      form.type = value;
    };

    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      maxCount: 1,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div className="Material-Total">
        <div className="Material-Content">
          <div className="Material-Filter">
            <Button type="primary" htmlType="submit" size="large" style={{width: 160, marginRight: 50}} onClick={showModal}>Upload a material</Button>
            <Modal
              title="Upload a material"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <div className="Upload-Content">
                <div className="Upload-Type">
                  <span style={{fontSize: 16}}>Material Type:</span>
                  <Select
                    style={{
                      width: 120,
                      marginLeft: 25,
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: 'PPT',
                        label: 'PPT',
                      },
                      {
                        value: 'PDF',
                        label: 'PDF',
                      },
                      {
                        value: 'ZIP',
                        label: 'ZIP',
                      },
                      {
                        value: 'MP4',
                        label: 'MP4',
                      },
                    ]}
                  />
                </div>
                <div className="Upload-File">
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </div>
              </div>
            </Modal>
          </div>
          <div className="Material-List">
              <Table 
                rowKey={"mid"}
                columns={columns} 
                dataSource={data} 
                onChange={onChangeFilter}
                onRow={(record) => {
                  return {
                    onClick: event => {
                      console.log(record.filepath)
                      window.location.assign(record.filepath);
                    },
                  };
                }}
              />
          </div>
        </div>
      </div>
    );
  }
export default Material;