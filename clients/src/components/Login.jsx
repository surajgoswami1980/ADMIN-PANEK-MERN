import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8088/login', { username, password });
      console.log(data);  // Log the response data
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
        toast.success('Login successful!');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);  // Log the error
      toast.error(`Login failed: ${error.response?.data || 'An error occurred'}`);
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
