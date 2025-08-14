import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "./Auth.css";
import Navbar from "../../components/ui/Navbar";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    setLoading(true);
    try {
      await authService.register({ name, email, password });
      alert("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left__text">
          Join now
          <br />
          and explore
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-container">
          <h2>Đăng Ký Tài Khoản</h2>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Đang đăng ký..." : "Sign Up"}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account?
            <a href="/login"> Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
