import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import { useAuth } from "../context/AuthContext";

export default function ProjectCreate() {
  const { createProject } = useProjects();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetSol: "",
    category: "Giáo dục",
    image: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject({
      ...formData,
      targetSol: Number(formData.targetSol),
      orgName: user.orgName || "Tổ chức chưa đặt tên",
      status: "ongoing"
    });
    alert("Tạo dự án thành công!");
    navigate("/org/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tạo Chiến Dịch Mới</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên dự án</label>
          <input 
            type="text" required
            value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu gọi vốn (SOL)</label>
          <input 
            type="number" required min="1"
            value={formData.targetSol} onChange={e => setFormData({...formData, targetSol: e.target.value})}
            className="w-full px-4 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
          <textarea 
            required rows="4"
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500" 
          />
        </div>
        <button type="submit" className="bg-emerald-900 text-white font-bold py-3 rounded-md mt-4">
          Khởi tạo chiến dịch On-chain (Giả lập)
        </button>
      </form>
    </div>
  );
}