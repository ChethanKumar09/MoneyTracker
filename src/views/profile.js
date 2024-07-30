// UserProfileScreen.js
import React from 'react';
import { Layout, Typography, Space } from 'antd';
import Sidebar from './sidebar';
import UserProfile from './userprofile';

const { Content } = Layout;
const { Title } = Typography;

const UserProfileScreen = () => {
  const handleUserProfileSave = (userData) => {
    // Save user profile data to local storage or perform other actions
    console.log(userData);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={2}>User Profile</Title>
            <UserProfile onSave={handleUserProfileSave} />
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserProfileScreen;
