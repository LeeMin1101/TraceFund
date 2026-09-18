import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mockProjects } from "../data/mockData";
import { ArrowLeft, UploadCloud, CheckCircle2, Image as ImageIcon, FileText, ExternalLink } from "lucide-react";

export default function ProjectManage() {
  const { id } = useParams();
  const project = mockProjects.find(p => p.id === id) || mockProjects[0];
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Xử lý khi người dùng chọn file từ thư viện
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
      } else {
        setPreview(null);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleUpload = (e) => {
    e.preventDefault();
    alert("Giả lập: Hóa đơn/Ảnh chứng từ đã được mã hóa và tải lên IPFS. Smart Contract đang xác minh...");
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-gray-800">
      
      {/* Header */}
      <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
        <Link to="/org/dashboard" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý giải ngân</h1>
          <p className="text-gray-500 text-sm">Cập nhật tiến độ và báo cáo chi tiêu dự án</p>
        </div>
      </div>

      {/* Thẻ thông tin Tổng quan */}
      <div className="bg-white p-5 border border-gray-300 rounded mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{project.title}</h2>
          <p className="text-gray-600 text-sm mt-1">
            Tiến độ: <span className="font-semibold text-rose-600">{project.raisedSol} SOL</span> / {project.targetSol} SOL
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 px-4 py-2 rounded text-sm text-gray-700">
          <span className="block text-gray-500 mb-1">Đang khóa trong Smart Contract</span>
          <span className="font-bold text-lg text-gray-900 flex items-center gap-2">
            {project.raisedSol - 15} SOL
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Cột trái: Form Upload Bằng chứng */}
        <div className="bg-white p-6 border border-gray-300 rounded h-fit">
          <h3 className="text-base font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
            Báo cáo chi tiêu đợt mới
          </h3>
          
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mục đích chi tiêu</label>
              <input 
                type="text" 
                placeholder="VD: Thanh toán tiền vật liệu xây dựng..." 
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-rose-500 text-sm" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền (SOL)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1" 
                    placeholder="0.0" 
                    className="w-full pl-3 pr-10 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-rose-500 text-sm" 
                    required 
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">SOL</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày chứng từ</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-rose-500 text-sm" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh chứng từ / Hóa đơn</label>
              <div className="mt-1 p-4 border-2 border-gray-300 border-dashed rounded text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                
                {preview ? (
                  <div className="flex flex-col items-center">
                    <img src={preview} alt="Preview" className="max-h-48 object-contain mb-3 border border-gray-200" />
                    <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 transition-colors">
                      Chọn ảnh khác
                      <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={handleFileChange} />
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <label className="cursor-pointer font-medium text-rose-600 hover:text-rose-700 text-sm underline">
                      <span>Tải ảnh lên từ máy</span>
                      <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={handleFileChange} required />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Hỗ trợ PNG, JPG, PDF (Max: 10MB)</p>
                  </div>
                )}
                
                {file && !preview && (
                  <div className="flex flex-col items-center justify-center py-4">
                    <FileText className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <label className="cursor-pointer font-medium text-rose-600 hover:text-rose-700 text-sm mt-2 underline">
                      Chọn file khác
                      <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={handleFileChange} />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="w-full mt-2 bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 rounded transition-colors flex items-center justify-center gap-2 text-sm">
              Gửi yêu cầu giải ngân
            </button>
            <p className="text-xs text-center text-gray-500">
              Dữ liệu sẽ được lưu trên IPFS và kiểm duyệt tự động.
            </p>
          </form>
        </div>

        {/* Cột phải: Lịch sử đã duyệt */}
        <div className="bg-gray-50 p-6 border border-gray-200 rounded">
          <h3 className="text-base font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Lịch sử giải ngân
          </h3>
          <div className="flex flex-col gap-3">
            {project.ledger?.length > 0 ? project.ledger.map((tx, idx) => (
              <div key={tx.id || idx} className="bg-white p-4 border border-gray-300 rounded shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-900 text-sm pr-2">{tx.purpose}</p>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 whitespace-nowrap">
                    Đã duyệt
                  </span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Ngày: {tx.date}</p>
                    <a href="#" className="text-xs font-mono text-blue-600 hover:underline flex items-center gap-1">
                      Tx: {tx.txHash ? `${tx.txHash.slice(0,8)}...${tx.txHash.slice(-4)}` : "N/A"}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="font-bold text-rose-600">-{tx.amountSol} SOL</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 bg-white border border-gray-200 border-dashed rounded">
                <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Chưa có lịch sử giải ngân.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}