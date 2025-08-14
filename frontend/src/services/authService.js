import apiClient from "./apiClient";

const authService = {
  register: ({ name, email, password }) =>
    apiClient.post("/auth/register", { name, email, password }),

  login: ({ email, password }) =>
    apiClient.post("/auth/login", { email, password }),

  getProfile: () => apiClient.get("/auth/profile"),

  resendConfirmation: (email) =>
    apiClient.post("/auth/resend-confirmation", { email }),
  // Forgot/Reset password
  forgotPassword: (email) => apiClient.post("/auth/forgot-password", { email }),

  resetPassword: (token, { password, confirmPassword }) =>
    apiClient.post(`/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    }),
};

export default authService;
