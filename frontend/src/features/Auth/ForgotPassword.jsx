import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import './Auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Vui lòng nhập email');
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await authService.forgotPassword(email);
      setMessage(res.data.message);
      setStatus('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Gửi thất bại');
      setStatus('error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left__text">
          Quên Mật Khẩu
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-container">
          <h2>Quên Mật Khẩu</h2>

          {message && (
            <p className={status === 'error' ? 'auth-error' : 'mb-4 text-green-500'}>
              {message}
            </p>
          )}

          {status !== 'success' && (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email của bạn</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              <button
                type="submit"
                className="auth-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Đang gửi...' : 'Gửi link đặt lại'}
              </button>
            </form>
          )}

          {status === 'success' && (
            <div className="auth-switch">
              Quay về <Link to="/login">Đăng nhập</Link> hoặc{' '}
              <Link to="/register">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
