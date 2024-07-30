// AuthForm.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Tooltip, message, Layout } from 'antd';
import { MailOutlined, LockOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cardWidth, setCardWidth] = useState('50%');
  const [isFlipped, setIsFlipped] = useState(false);
  const navigation = useNavigate()


  const handleToggle = () => {
    setIsSignup(!isSignup);
    setIsFlipped(!isFlipped);
  };

  const handleLogin = () => {
    navigation('/Home')
    message.success('Login Successful 😄');
  };


  useEffect(() => {
    const handleResize = () => {
      // Adjust the width based on the window width
      const width = window.innerWidth > 768 ? '50%' : '90%';
      setCardWidth(width);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial call to set the initial width
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleSubmit = (values) => {
    if (isSignup) {
      if(values.password !== values.confirmPassword){
        return(message.warning("Password doesn't match"))
      }
      localStorage.setItem('userEmail', values.email);
      localStorage.setItem('userPassword', values.password);
      localStorage.setItem('user', values.name);

      message.success('Sign Up Successful!');
      setIsSignup(!isSignup);
    } else {
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');
      if (values.email === storedEmail && values.password === storedPassword) {
        handleLogin();
      } else {
        message.error('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <Layout>

      <Card
        className={`auth-card ${isFlipped ? 'flipped' : ''}`}
        style={{
          width: cardWidth,
          margin: 'auto',
          marginTop: 100,
          padding: 20,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >        <Title level={2} style={{ marginBottom: 20, textAlign: 'center', color: '#1890ff' }}>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Title>
        <Form onFinish={handleSubmit}>
          {isSignup && (
            <Form.Item
              name="name"

              rules={[
                {
                  required: true,
                  message: 'Please enter a name',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Full name" />
            </Form.Item>
          )}
          <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          {isSignup && (
            <>
              <Form.Item
                name="confirmPassword"

                rules={[{ required: true, message: 'Please confirm your password' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Space>

              <Tooltip title={isSignup ? 'Switch to Sign In' : 'Switch to Sign Up'}>
                <Button onClick={handleToggle} style={{ color: '#1890ff' }}>
                  {isSignup ? "Already Have Account? Sign In" : "Don't have account? Sign Up"}
                </Button>
              </Tooltip>
            </Space>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <Text type="secondary">
            <InfoCircleOutlined /> Use a valid email and a strong password.
          </Text>
        </div>
      </Card>



    </Layout>
  );
};

export default AuthForm;
