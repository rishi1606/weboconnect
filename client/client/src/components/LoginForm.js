import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    loginUser(userData)
      .then((response) => {
        console.log(response.data);
        navigate('/profile')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
    
    </>
    
  );
};

export default LoginForm;
