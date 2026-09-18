import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, addDonation } = useProjects();
  
  // Tìm dự án theo id từ Context, nếu không thấy lấy dự án đầu tiên
  const project = projects.find(p => p.id === id) || projects[0];
  
  const [activeTab, setActiveTab] = useState("info");
  const [donateAmount, setDonateAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txSuccess, setTxSuccess] = useState(null);

  // Tỷ giá quy đổi giả lập SOL sang VND (1 SOL = 2.600.000 VND)
  const SOL_TO_VND_RATE = 2600000;

  // Thuật toán quy đổi SOL sang VND chuẩn định dạng tiền tệ VN
  const convertSolToVnd = (sol) => {
    if (!sol || isNaN(sol) || sol <= 0) return "0 ₫";
    const totalVnd = Number(sol) * SOL_TO_VND_RATE;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalVnd);
  };

  if (!project) {
    return <div className="p-10 text-center">Không tìm thấy dự án!</div>;
  }

  const progressPercent = Math.min(Math.round((project.raisedSol / project.targetSol) * 100), 100);

  // Xử lý Donate (Chế độ Demo mượt mà, tối ưu bảo vệ đồ án)
  const handleDonate = async () => {
    if (!donateAmount || isNaN(donateAmount) || Number(donateAmount) <= 0) {
      alert("Vui lòng nhập số SOL hợp lệ (lớn hơn 0)!");
      return;
    }

    setLoading(true);
    setTxSuccess(null);

    // Giả lập độ trễ mạng blockchain (1.5 giây)
    setTimeout(() => {
      addDonation(project.id, Number(donateAmount)); // Cập nhật vào Context chung
      
      // Tạo mã TxHash giả lập chuẩn cấu trúc Solana
      const mockTxHash = "5xYz" + Math.random().toString(36).substring(2, 15) + "SolanaDevnetMockHash";
      
      setTxSuccess(mockTxHash);
      setLoading(false);
      alert(`[WEB3 DEMO] Quyên góp thành công ${donateAmount} SOL (${convertSolToVnd(donateAmount)}) vào Smart Contract!`);
      setDonateAmount("");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link to="/" className="text-sm text-emerald-700 hover:underline mb-2 inline-block">&larr; Quay lại danh sách</Link>
        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
        <p className="text-gray-500 mt-2 font-medium">Tổ chức: <span className="text-emerald-700">{project.orgName}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cột trái: Nội dung & Sổ cái */}
        <div className="lg:col-span-2">
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            <button 
              onClick={() => setActiveTab("info")}
              className={`pb-3 font-medium transition-colors ${activeTab === "info" ? "text-emerald-900 border-b-2 border-emerald-900" : "text-gray-500 hover:text-gray-700"}`}
            >
              Thông tin chi tiết
            </button>
            <button 
              onClick={() => setActiveTab("ledger")}
              className={`pb-3 font-medium transition-colors flex items-center gap-2 ${activeTab === "ledger" ? "text-emerald-900 border-b-2 border-emerald-900" : "text-gray-500 hover:text-gray-700"}`}
            >
              Sổ cái minh bạch <span>🔗</span>
            </button>
          </div>

          {activeTab === "info" ? (
            <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
              <p className="mb-4">{project.description}</p>
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-sm text-emerald-800">
                💡 **Cam kết minh bạch:** Mọi giao dịch quyên góp đều được ghi nhận trực tiếp trên mạng lưới Solana. Tổ chức chỉ được rút quỹ khi hóa đơn chi tiêu được AI và cộng đồng xác thực.
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-xl mb-4 text-gray-900">Lịch sử giải ngân & Hóa đơn</h3>
              <div className="flex flex-col gap-4">
                {project.ledger?.length > 0 ? project.ledger.map((tx) => (
                  <div key={tx.id} className="bg-white p-5 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900 text-lg">{tx.purpose}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-500">{tx.date}</span>
                        <span className="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded">TxHash: <span className="text-emerald-600 font-mono">{tx.txHash}</span></span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                      <p className="font-bold text-red-500 text-lg">-{tx.amountSol} SOL</p>
                      <button className="text-sm text-emerald-700 font-medium hover:underline border border-emerald-200 px-3 py-1 rounded-md bg-emerald-50">Xem chứng từ</button>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 text-sm">Chưa có lịch sử giải ngân nào.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Khung Donate Sidebar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-24">
          <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Đã quyên góp</p>
          <div className="flex items-end gap-2 mb-4">
            <h2 className="text-4xl font-extrabold text-gray-900">{project.raisedSol}</h2>
            <span className="text-gray-500 mb-1 font-medium">/ {project.targetSol} SOL</span>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-3 mb-6 overflow-hidden">
            <div className="bg-emerald-900 h-3 rounded-full transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }}></div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <input 
                type="number" 
                step="0.1"
                min="0.1"
                value={donateAmount}
                onChange={(e) => setDonateAmount(e.target.value)}
                placeholder="Nhập số SOL muốn donate..." 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">SOL</span>
            </div>
            
            {/* Hiển thị số tiền quy đổi sang VND theo thời gian thực */}
            {donateAmount && Number(donateAmount) > 0 && (
              <div className="text-sm text-emerald-800 font-medium bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 flex justify-between items-center">
                <span>Quy đổi tương đương:</span>
                <span className="font-bold text-emerald-900">{convertSolToVnd(donateAmount)}</span>
              </div>
            )}
            
            <button 
              onClick={handleDonate}
              disabled={loading}
              className="w-full bg-emerald-900 hover:bg-emerald-800 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg text-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang ghi nhận vào Smart Contract...
                </>
              ) : "Donate bằng Ví"}
            </button>

            {/* Thông báo thành công kèm link dẫn tới Solana Explorer giả lập */}
            {txSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800 flex flex-col gap-2">
                <div>
                  <span className="font-bold">Giao dịch On-chain thành công!</span>
                </div>
                <a 
                  href={`https://explorer.solana.com/tx/${txSuccess}?cluster=devnet`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-700 font-bold underline hover:text-emerald-900 flex items-center gap-1 truncate"
                >
                  🔍 Xem trên Solana Explorer ({txSuccess.slice(0, 8)}...) &rarr;
                </a>
              </div>
            )}

            <p className="text-xs text-center text-gray-400 mt-2">Hệ thống Smart Contract TraceFund trên Solana.</p>
          </div>
        </div>
      </div>
    </div>
  );
}