// src/data/mockData.js
export const mockProjects = [
  {
    id: "proj-01",
    title: "Xây trường tiểu học vùng cao Nậm Pồ",
    orgName: "Quỹ Trẻ Em Vùng Cao",
    description: "Dự án xây dựng 3 phòng học mới và cung cấp bữa ăn trưa cho 150 em nhỏ tại điểm trường Nậm Pồ, Điện Biên.",
    targetSol: 50,
    raisedSol: 32.5,
    status: "ongoing",
    category: "Giáo dục",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    walletAddress: "5xYz...3kVp",
    ledger: [
      { id: "tx-1", date: "2026-09-10", amountSol: 15, purpose: "Thanh toán đợt 1: Mua xi măng", txHash: "4xYq...p9Lz" }
    ]
  },
  {
    id: "proj-02",
    title: "Trồng 10,000 cây xanh ngập mặn Cà Mau",
    orgName: "Green Earth VN",
    description: "Khôi phục hệ sinh thái rừng ngập mặn, tạo sinh kế cho người dân địa phương và chống biến đổi khí hậu.",
    targetSol: 100,
    raisedSol: 85,
    status: "ongoing",
    category: "Môi trường",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    walletAddress: "9aBc...1xYz",
    ledger: []
  },
  {
    id: "proj-03",
    title: "Trạm cứu hộ chó mèo lang thang",
    orgName: "Hanoi Pet Rescue",
    description: "Xây dựng khu vực y tế riêng biệt và chi trả thức ăn hàng tháng cho hơn 300 bé chó mèo bị bỏ rơi.",
    targetSol: 20,
    raisedSol: 5,
    status: "ongoing",
    category: "Động vật",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=800&auto=format&fit=crop",
    walletAddress: "2zKw...8pMn",
    ledger: []
  }
];