import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function ConfirmEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [resendStatus, setResendStatus] = useState("idle");
  const [resendMsg, setResendMsg] = useState("");

  useEffect(() => {
    apiClient
      .get(`/auth/confirm-email/${token}`)
      .then((res) => {
        setMessage(res.data.message);
        setStatus("success");
      })
      .catch((err) => {
        setMessage(
          err.response?.data?.message || "Đã có lỗi, vui lòng thử lại sau"
        );
        setStatus("error");
      });
  }, [token]);

  const handleResend = async () => {
    if (!emailInput) {
      setResendMsg("Vui lòng nhập email.");
      setResendStatus("error");
      return;
    }
    setResendStatus("loading");
    setResendMsg("");
    try {
      const res = await apiClient.post("/auth/resend-confirmation", {
        email: emailInput,
      });
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

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg/bg.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative bg-gray-800/75 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md text-white z-10">
        <h2 className="text-3xl font-extrabold mb-4 text-center">
          Xác Nhận Email
        </h2>
        <p className="text-center mb-6">{message}</p>

        {status === "error" && (
          <div>
            <p className="mb-2 text-center text-gray-300">
              Chưa nhận được email? Nhập email và gửi lại:
            </p>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email của bạn"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                disabled={resendStatus === "loading"}
              />
            </div>
            <button
              onClick={handleResend}
              disabled={resendStatus === "loading"}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition disabled:opacity-50 mb-2"
            >
              {resendStatus === "loading"
                ? "Đang gửi..."
                : "Gửi lại email xác nhận"}
            </button>
            {resendStatus !== "idle" && (
              <p
                className={`mt-2 text-center text-sm ${
                  resendStatus === "success"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {resendMsg}
              </p>
            )}
            <div className="mt-4 text-center">
              <Link
                to="/register"
                className="text-blue-400 hover:underline"
              >
                Đăng ký tài khoản mới
              </Link>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <Link
              to="/login"
              className="inline-block mt-4 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition"
            >
              Đăng nhập ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
