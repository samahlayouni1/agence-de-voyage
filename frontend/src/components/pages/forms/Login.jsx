// src/components/Login.js
import './forms.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/Auth';

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (response.status === 200) {
        auth.login(formData.username);
        alert("Connexion réussie !");
        setFormData({
          username: "",
          password: "",
        });
        navigate("/Profile");
      } else {
        alert("Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleLogin} className="form">
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
        />
        <button type="submit" className="form-btn">Se Connecter</button>
      </form>
    </div>
  );
}
