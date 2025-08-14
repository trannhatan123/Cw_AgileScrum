// src/features/Auth/GoogleCallback.jsx
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import authService from "../../services/authService";

export default function GoogleCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      // 1) Lưu token ngay để interceptor dùng
      localStorage.setItem("token", token);
      // 2) Lấy profile, lưu vào context, rồi chuyển ngay về Home
      authService
        .getProfile()
        .then((res) => {
          login({ token, user: res.data });
          navigate("/", { replace: true });
        })
        .catch(() => {
          // Nếu lỗi, bắt về login
          navigate("/login", { replace: true });
        });
    } else {
      navigate("/login", { replace: true });
    }
  }, [params, login, navigate]);

  return <div>Đang xử lý đăng nhập…</div>;
}
