// UserProfile.js
import React, { useEffect, useState } from 'react';
import { Upload, message, Form, Input, Button, Tooltip, Image } from 'antd';
import { UserOutlined, UploadOutlined, MoneyCollectTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const UserProfile = ({ onSave }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    let image = localStorage.getItem("Profile")
    if (image) {
      let imageData = [
        { preview: image, uid: 1 }
      ]
      setImageUrl(imageData)
    }

  }, [])


  const handleFileChange = ({ fileList }) => {
    setImageUrl(fileList.map(file => ({
      ...file,
      preview: URL.createObjectURL(file.originFileObj), // Add preview URL
    })));
  };

  const onFinish = (values) => {
    localStorage.setItem('salary', values.monthlySalary);
    localStorage.setItem('EMI', values.monthlyEMI);
    localStorage.setItem('rent', values.rent);
    localStorage.setItem('Profile', imageUrl[0].preview);
    message.success("Profile Saved SuccessFully")
    navigate("/Home")
    onSave(values);
  };

  const renderRatedPhotos = () => {
    return imageUrl.map(file => (
      <div key={file.uid}>
        <Image
          src={file.preview}
          alt={'Profile'}
          style={{ minWidth: '100px', maxWidth: '130px', maxHeight: '100px', objectFit: 'cover' }}
        />
      </div>
    ));
  };

  return (
    <Form form={form} onFinish={onFinish} initialValues={{ imageUrl }}>
      <Form.Item
        name="avatar"
        label="Profile Picture"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false} // Prevent default upload behavior
          onChange={handleFileChange}
          disabled={imageUrl.length == 1 ? true : false}
        >
          {imageUrl ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {renderRatedPhotos()}
            </div>
          ) : (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>

      </Form.Item>
      <Form.Item
        name="name"
      >
        <Input defaultValue={localStorage.getItem("user")} prefix={<UserOutlined />} placeholder="Full name" />
      </Form.Item>
      <Form.Item name="monthlySalary" >
        <Input type="number" defaultValue={localStorage.getItem("salary")} prefix={<MoneyCollectTwoTone />} placeholder="Monthly Salary" />
      </Form.Item>
      <Form.Item name="monthlyEMI" >
        <Input type="number" defaultValue={localStorage.getItem("EMI")} prefix={<MoneyCollectTwoTone />} placeholder="Monthly EMI" />
      </Form.Item>
      <Form.Item name="rent" >
        <Input type="number" defaultValue={localStorage.getItem("rent")} prefix={<MoneyCollectTwoTone />} placeholder="PG/Flat Rent" />
      </Form.Item>
      <Tooltip title="Save Data">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Tooltip>
    </Form>
  );
};

export default UserProfile;
