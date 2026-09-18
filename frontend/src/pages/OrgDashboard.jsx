import { mockProjects } from "../data/mockData";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Folder, Wallet, AlertCircle } from "lucide-react";

export default function OrgDashboard() {
  const navigate = useNavigate();
  // Lấy tạm các dự án thuộc về một tổ chức giả định
  const myProjects = mockProjects;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-gray-800">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 border-b border-gray-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workspace Tổ chức</h1>
          <p className="text-gray-500 mt-1 text-sm">Quản lý dự án và báo cáo tiến độ giải ngân</p>
        </div>
        
        {/* Nút Tạo dự án mới đã tích hợp điều hướng */}
        <button 
          onClick={() => navigate('/org/project/create')}
          className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 px-5 rounded transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Tạo dự án mới
        </button>
      </div>

      {/* Stats - Thiết kế phẳng, viền mảnh */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-white border border-gray-200 p-5 rounded flex items-center justify-between">
          <div>
            <p className="text-gray-500 mb-1 text-xs uppercase font-semibold tracking-wider">Tổng quỹ quản lý</p>
            <h2 className="text-2xl font-bold text-gray-900">122.5 SOL</h2>
          </div>
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        
        <div className="bg-rose-50 border border-rose-200 p-5 rounded flex items-center justify-between">
          <div>
            <p className="text-rose-700 mb-1 text-xs uppercase font-semibold tracking-wider">Cần báo cáo chi tiêu</p>
            <h2 className="text-2xl font-bold text-rose-800">2 Dự án</h2>
          </div>
          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 p-5 rounded flex items-center justify-between">
          <div>
            <p className="text-gray-500 mb-1 text-xs uppercase font-semibold tracking-wider">Dự án đang chạy</p>
            <h2 className="text-2xl font-bold text-gray-900">{myProjects.length}</h2>
          </div>
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
            <Folder className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Danh sách dự án - Bảng tối giản */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Chiến dịch của bạn</h3>
      </div>
      
      <div className="bg-white rounded border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="py-3 px-5 font-medium">Tên dự án</th>
              <th className="py-3 px-5 font-medium w-1/4">Tiến độ gọi vốn</th>
              <th className="py-3 px-5 font-medium">Trạng thái giải ngân</th>
              <th className="py-3 px-5 font-medium text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {myProjects.map((proj) => {
              const percent = Math.min(Math.round((proj.raisedSol / proj.targetSol) * 100), 100);
              
              // Giả lập trạng thái dự án để giao diện sinh động hơn
              const needsReport = proj.raisedSol > proj.targetSol * 0.5;

              return (
                <tr key={proj.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-5">
                    <p className="font-semibold text-gray-900 text-sm">{proj.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{proj.category}</p>
                  </td>
                  
                  <td className="py-4 px-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-gray-900">{proj.raisedSol} SOL</span>
                        <span className="text-gray-500">{percent}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-sm h-1.5 overflow-hidden">
                        <div 
                          className="bg-rose-500 h-full rounded-sm" 
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-5">
                    {needsReport ? (
                      <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded font-medium border border-amber-200/60 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Chờ hóa đơn đợt 2
                      </span>
                    ) : (
                      <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded font-medium border border-green-200/60 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Đúng tiến độ
                      </span>
                    )}
                  </td>
                  
                  <td className="py-4 px-5 text-right">
                    <Link 
                      to={`/org/project/${proj.id}/manage`} 
                      className="inline-block text-gray-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-gray-200 hover:border-rose-200 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                    >
                      Báo cáo & Quản lý
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}