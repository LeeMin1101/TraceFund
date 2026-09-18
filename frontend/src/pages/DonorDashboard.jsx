// src/pages/DonorDashboard.jsx
import { mockProjects } from "../data/mockData";
import { Link } from "react-router-dom";

export default function DonorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Của Bạn</h1>
        <p className="text-gray-500 mt-1">Quản lý các khoản đóng góp và theo dõi minh bạch</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-md">
          <p className="text-blue-100 mb-1 font-medium">Tổng tiền đã Quyên góp</p>
          <h2 className="text-4xl font-bold">12.5 SOL</h2>
        </div>
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500 mb-1 font-medium">Dự án đang theo dõi</p>
          <h2 className="text-4xl font-bold text-gray-900">3</h2>
        </div>
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500 mb-1 font-medium">Hóa đơn đã xác minh</p>
          <h2 className="text-4xl font-bold text-green-600">8</h2>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4">Lịch sử tài trợ</h3>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
              <th className="p-4 font-medium">Tên dự án</th>
              <th className="p-4 font-medium">Số tiền (SOL)</th>
              <th className="p-4 font-medium">Ngày đóng góp</th>
              <th className="p-4 font-medium">Trạng thái giải ngân</th>
              <th className="p-4 font-medium text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-900">{mockProjects[0].title}</td>
              <td className="p-4 font-bold text-blue-600">5.0</td>
              <td className="p-4 text-gray-500">2026-08-15</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Đang tiến hành</span>
              </td>
              <td className="p-4 text-right">
                <Link to={`/project/${mockProjects[0].id}`} className="text-blue-600 hover:underline text-sm font-medium">
                  Xem tiến độ
                </Link>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-900">Trạm cứu hộ chó mèo lang thang</td>
              <td className="p-4 font-bold text-blue-600">7.5</td>
              <td className="p-4 text-gray-500">2026-07-20</td>
              <td className="p-4">
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">Chờ hóa đơn</span>
              </td>
              <td className="p-4 text-right">
                <button className="text-gray-400 cursor-not-allowed text-sm font-medium">Chưa có cập nhật</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}