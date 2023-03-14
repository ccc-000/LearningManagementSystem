import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { useState } from 'react';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormDisabledDemo = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 1000,
        }}
        onFinish={(values) => {
          console.log(values);
        }}
      >
        <Form.Item label="User name" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Email address" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Date of birth: " name="birthday">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Preferred language: " name="preferred_lan">
          <Select>
            <Select.Option value="english">English</Select.Option>
            <Select.Option value="chinese">Chinese</Select.Option>
            <Select.Option value="german">German</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Self introduction: " name="intro">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Avatar" name="avatar">
          <Upload action="action/do" listType="picture-circle" maxCount={1}>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default () => <FormDisabledDemo />;