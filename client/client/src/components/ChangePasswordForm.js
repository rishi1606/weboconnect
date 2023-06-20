import React, { useState } from 'react';
import { changePassword } from '../api/api';

const ChangePasswordForm = ({ userId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordData = {
      userId,
      currentPassword,
      newPassword,
    };

    changePassword(userId, passwordData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePasswordForm;
