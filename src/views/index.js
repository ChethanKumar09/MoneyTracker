import React, { useState, useEffect } from "react";
import { Space, Layout, message, Typography, Modal, Button, InputNumber, Upload, Rate } from 'antd';

import Sidebar from "./sidebar";

import DailyExpenseModal from "../components/dailyExpenses";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';


const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Dragger } = Upload;

const Photos = () => {
    const [isDailyModalVisible, setIsDailyModalVisible] = useState(false);
    const navigate = useNavigate()
    const showDailyModal = () => {
        setIsDailyModalVisible(true);
    };

    const handleDailySave = ({ amount, description }) => {
        // Save daily expense to local storage
        const dailyExpenses = JSON.parse(localStorage.getItem('dailyExpenses')) || [];
        dailyExpenses.push({
            amount,
            description,
            date: new Date().toISOString().split('T')[0], // Using the current date as the key
        });
        localStorage.setItem('dailyExpenses', JSON.stringify(dailyExpenses));

        // Close the modal
        setIsDailyModalVisible(false);

        message.success('Daily expense added successfully!');
    };

    const handleDailyCancel = () => {
        setIsDailyModalVisible(false);
    };




    const handleLogout = () => {
        navigate("/")
        localStorage.clear()
        message.success('Logout successful!');
    };



    return (
        <Layout style={{ height: '100%', overflow: 'hidden' }}>
            <Sidebar showDailyModal={showDailyModal} onLogout={handleLogout} />
            <DailyExpenseModal
                visible={isDailyModalVisible}
                onCancel={handleDailyCancel}
                onSave={handleDailySave}
            />
            <Layout>
                <Header style={{ backgroundColor: '#fff', padding: 10 }}>
                    <Space>
                        <Text strong>Welcome, {localStorage.getItem("user")}</Text>
                        <span role="img" aria-label="Happy Face" style={{ fontSize: 24 }}>
                            😄
                        </span>
                    </Space>
                </Header>
                <Content
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 24,
                        height: '100vh',
                    }}
                >
                    {/* Loading text with Spin animation */}
                    <Spin size="large">

                    </Spin>
                    <div style={{ paddingTop: '1%' }} />
                    <Text type="secondary">
                        Wait Chandu is Still developing the Pages...
                    </Text>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Photos;
