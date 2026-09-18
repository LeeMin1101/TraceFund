// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("donor"); // Mặc định là người quyên góp
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(selectedRole);
    
    // Điều hướng theo role
    if (selectedRole === "org") {
      navigate("/org/dashboard");
    } else {
      navigate("/donor/dashboard");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Chào mừng đến TraceFund</h2>
          <p className="text-gray-500 mt-2 text-sm">Vui lòng chọn vai trò của bạn để tiếp tục</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Lựa chọn Role */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSelectedRole("donor")}
              className={`p-4 rounded-xl border-2 text-sm font-bold flex flex-col items-center gap-2 transition-all ${
                selectedRole === "donor" 
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800" 
                  : "border-gray-200 text-gray-500 hover:border-emerald-300"
              }`}
            >
              <span className="text-2xl">🌱</span>
              Nhà quyên góp
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("org")}
              className={`p-4 rounded-xl border-2 text-sm font-bold flex flex-col items-center gap-2 transition-all ${
                selectedRole === "org" 
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800" 
                  : "border-gray-200 text-gray-500 hover:border-emerald-300"
              }`}
            >
              <span className="text-2xl">🏢</span>
              Nhà tổ chức
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg transition-all"
          >
            Đăng nhập ngay
          </button>
        </form>
      </div>
    </div>
  );
}