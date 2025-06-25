import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', form);

      if (res.status === 200) {
        localStorage.setItem('adminEmail', res.data.email);
        localStorage.setItem('adminRole', res.data.role);
        navigate('/Dashboard');
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
