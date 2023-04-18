import React, { useEffect, useState } from 'react';
import { Input, Button, Upload, message, notification, Space} from 'antd';
import { UploadOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/EditForum.css';
const { TextArea } = Input;


function EditForum() {
    //edit a post
    const [messageApi, contextHolder1] = message.useMessage();
    const [api, contextHolder2] = notification.useNotification();
    const [data, setData] = useState();
    const { pid } = useParams();

    const navigate = useNavigate();

    //get post data from backend
    useEffect(() => {
      fetch('http://localhost:8000/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: pid
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    }, [pid]);

    const onFinish = () => {
      api.destroy();
      messageApi.open({
        type: 'loading',
        content: 'Editing...',
      });

      fetch('http://localhost:8000/editposts/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
        pid: pid,
        title: data.title,
        content: data.content,
        keyword: data.keyword,
        multimedia: data.multimedia
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          messageApi.destroy();
          messageApi.open({
            type: 'success',
            content: 'Updated!',
            duration: 2,
          });
          setTimeout(() => {
            navigate('/coursemainpage/forum/' + pid);
          }, 2100);
        }
      })
      .catch((error) => {
        messageApi.destroy();
        messageApi.error("Cannot connect to the server")
        console.error(error);
      })
    };

    //cancel edit
    const confirmCancel = () => {
      navigate('/coursemainpage/forum/' + pid);
    };

    function handleCancel(){
      const key = `open${Date.now()}`;
      const btn = (
        <Space>
          <Button  type="primary" size="medium" onClick={() => api.destroy()}style={{width:100}}>
            Continue
          </Button>
          <Button size="medium" onClick={confirmCancel} style={{width:100}}>
            Cancel
          </Button>
        </Space>
      );
      api.open({
        message: 'Cancel Confirm',
        description:
          'Are you sure to cancel the modification and exit the current page or continue to edit?',
        btn,
        key,
      });
    }

    // Conver the img into base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    })
  };

  // Function to handle changes in multimedia
  const multimediaHandler = async (e) => {
    if (!e.fileList[0]) {
      return;
    }
    // Get the file obj from the file list
    const file = e.fileList[0].originFileObj;
    const file_base64 = await convertBase64(file);
    setData({...data, multimedia: file_base64});
  }

    // Generate multimedia from data
    const fileList = []
    if (data && data.multimedia) {
      fileList.push(
        {
          uid: '-1',
          name: 'multimedia.png',
          status: 'done',
          url: [data.multimedia],
          thumbUrl: [data.multimedia],
        }
      )
    }

    return (
      <div className="EditForum-Total">
        <div className="EditForum-Content">
          <div className="Edit-Title">
              <span style={{marginRight: 20}}>Title</span>
              <Input placeholder="Please input a post title" value={data? data.title : "No data"} onChange={(e) => { setData({ ...data, title: e.target.value }) }} />
          </div>
          <div className="Edit-Content">
              <TextArea rows={8} placeholder="Please input post content" value={data? data.content : "No data"} onChange={(e) => { setData({ ...data, content: e.target.value })}} />
          </div>
          <div className="Edit-File">
              <Upload
                beforeUpload={() => false}
                onChange={multimediaHandler}
                listType="picture"
                // Force the upload component to thinks the url is correct
                isImageUrl={() => true}
                onRemove={() => {
                  setData({ ...data, multimedia: ""});
                  return true;
                }}
                onPreview={(file) => {
                  var image = new Image();
                  image.src = file.url[0]
                  var w = window.open("");
                  w.document.write(image.outerHTML);
                }}
                fileList={[...fileList]}
                maxCount={1}
                className="upload-list-inline"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
          </div>
          <div className="Edit-Button">
              <span style={{marginRight: 20}}>Keyword</span>
              <Input placeholder="Please input a keyword" style={{width: 180}} value={data? data.keyword : "No data"} onChange={(e) => { setData({ ...data, keyword: e.target.value })}}/>
              {contextHolder2}
              <Button size="large" style={{width: 100, float: 'right', marginRight: 20, marginTop: -10}} onClick={handleCancel}>Cancel</Button>
              {contextHolder1}
              <Button type="primary" htmlType="submit" size="large" style={{width: 100, float: 'right', marginRight: 20, marginTop: -10}} onClick={onFinish}>Post</Button>
          </div>
        </div>
      </div>
    );
  }
export default EditForum;