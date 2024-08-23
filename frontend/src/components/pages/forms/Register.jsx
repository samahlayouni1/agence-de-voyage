// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './forms.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      if (response.status === 201) {
        alert("Inscription réussie !");
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      } else {
        alert("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form">
        <h1>Inscription</h1>
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
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
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
        <button type="submit" className="form-btn">S'inscrire</button>
      </form>
    </div>
  );
}
