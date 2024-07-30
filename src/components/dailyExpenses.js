// DailyExpenseModal.js
import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';

const DailyExpenseModal = ({ visible, onCancel, onSave }) => {
  const [dailyAmount, setDailyAmount] = useState('');
  const [dailyDescription, setDailyDescription] = useState('');

  const handleSave = () => {
    if (!dailyAmount || !dailyDescription) {
      message.error('Please enter both amount and description.');
      return;
    }

    onSave({ amount: dailyAmount, description: dailyDescription });

    // Reset state
    setDailyAmount('');
    setDailyDescription('');
  };

  const handleCancel = () => {
    onCancel();
    // Reset state on cancel
    setDailyAmount('');
    setDailyDescription('');
  };

  return (
    <Modal
      title="Add Daily Expense"
      visible={visible}
      onOk={handleSave}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label="Amount">
          <Input
            type="number"
            value={dailyAmount}
            onChange={(e) => setDailyAmount(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            value={dailyDescription}
            onChange={(e) => setDailyDescription(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DailyExpenseModal;
