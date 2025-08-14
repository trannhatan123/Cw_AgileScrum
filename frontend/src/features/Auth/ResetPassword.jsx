import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Auth.css';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = form;
    if (!password || password !== confirmPassword) {
      setMessage('Mật khẩu chưa nhập hoặc không khớp');
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await authService.resetPassword(token, form);
      setMessage(res.data.message);
      setStatus('success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Đặt lại mật khẩu thất bại';
      setMessage(errMsg);
      setStatus('error');
    }
  };

  return (
    <div className="auth-page">
      {/* Left title column */}
      <div className="auth-left">
        <div className="auth-left__text">
          <h2>Đặt Lại Mật Khẩu</h2>
          <p className="mt-2 text-d1d5db">Nhập mật khẩu mới và xác nhận để hoàn tất.</p>
        </div>
      </div>

      {/* Right form column */}
      <div className="auth-right">
        <div className="auth-container">
          <h2>Quên Mật Khẩu</h2>
          {message && (
            <p className={status === 'error' ? 'auth-error' : 'text-green-500 mb-4'}>
              {message}
            </p>
          )}

          {(status === 'idle' || (status === 'error' && !message.includes('Token'))) && (
            <form onSubmit={handleSubmit}>
              <label htmlFor="password">Mật khẩu mới</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                disabled={status === 'loading'}
              />

              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={status === 'loading'}
              />

              <button type="submit" className="auth-submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Đang xử lý...' : 'Xác nhận'}
              </button>
            </form>
          )}

          {status === 'error' && message.includes('Token') && (
            <p className="mt-4 text-d1d5db">
              Link không hợp lệ hoặc đã hết hạn. Vui lòng{' '}
              <Link to="/forgot-password" className="auth-forgot-password">
                yêu cầu lại link
              </Link>.
            </p>
          )}

          {status === 'success' && (
            <p className="auth-switch">
              Đặt lại mật khẩu thành công. Chuyển đến{' '}
              <Link to="/login" className="text-white underline hover:text-gray-200">
                Đăng nhập
              </Link>...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
