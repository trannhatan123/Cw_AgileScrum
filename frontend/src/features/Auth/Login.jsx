import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import authService from "../../services/authService";
import { AuthContext } from "./AuthContext";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [resendStatus, setResendStatus] = useState("idle");
  const [resendMsg, setResendMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setShowResend(false);
    setResendStatus("idle");
    setResendMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }
    setLoading(true);
    try {
      const res = await authService.login({
        email: formData.email,
        password: formData.password,
      });
      login(res.data);
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Đăng nhập thất bại";
      setError(msg);
      if (msg.includes("xác nhận email")) {
        setShowResend(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!formData.email) {
      setResendMsg("Vui lòng nhập email để gửi lại xác nhận");
      setResendStatus("error");
      return;
    }
    setResendStatus("loading");
    setResendMsg("");
    try {
      const res = await authService.resendConfirmation(formData.email);
      setResendStatus("success");
      setResendMsg(res.data.message);
    } catch (err) {
      setResendStatus("error");
      setResendMsg(
        err.response?.data?.message ||
          "Không thể gửi lại email. Vui lòng thử lại."
      );
    }
  };

  const handleOAuth = (provider) => {
    // Dùng VITE_API_URL để gọi thẳng tới backend
    const apiUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left__text">
          Login
          <br />
          to get explorer solar system
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-container">
          <h2>Đăng Nhập</h2>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              disabled={loading}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
            />
            <div className="auth-forgot-password">
              <Link to="/forgot-password" className="auth-forgot-text">
                Quên mật khẩu?
              </Link>
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Log In"}
            </button>
          </form>

          {showResend && (
            <div className="resend-confirmation">
              <p>Chưa xác nhận email? Gửi lại email xác nhận:</p>
              <button
                onClick={handleResend}
                disabled={resendStatus === "loading"}
                className="auth-resend-btn"
              >
                {resendStatus === "loading" ? "Đang gửi..." : "Gửi lại"}
              </button>
              {resendStatus !== "idle" && (
                <p className={resendStatus}>{resendMsg}</p>
              )}
            </div>
          )}

          <div className="auth-divider">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <button
            onClick={() => handleOAuth("facebook")}
            className="auth-social-btn facebook"
          >
            <FaFacebook className="mr-2" />
            Continue with Facebook
          </button>

          <button
            onClick={() => handleOAuth("google")}
            className="auth-social-btn google"
          >
            <FcGoogle className="mr-2" />
            Continue with Google
          </button>

          

          <div className="auth-switch">
            Chưa có tài khoản?
            <Link to="/register"> Đăng ký ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
