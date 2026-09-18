import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/logo.png";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ShieldCheck, Globe, Wallet, LogOut } from "lucide-react"; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;
      if (provider?.isPhantom) return provider;
    }
    return null;
  };

  // Hàm lấy số dư SOL từ mạng Devnet
  const fetchBalance = async (pubKeyString) => {
    try {
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      const publicKey = new PublicKey(pubKeyString);
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error("Lỗi lấy số dư ví:", err);
      setBalance(0);
    }
  };

  const connectWallet = async () => {
    const provider = getProvider();
    if (provider) {
      try {
        const resp = await provider.connect();
        const pubKey = resp.publicKey.toString();
        setWalletAddress(pubKey);
        await fetchBalance(pubKey);
      } catch (err) {
        console.error("Lỗi kết nối ví:", err);
      }
    } else {
      window.open("https://phantom.app/", "_blank");
    }
  };

  const disconnectWallet = async () => {
    const provider = getProvider();
    if (provider) {
      await provider.disconnect();
      setWalletAddress(null);
      setBalance(null);
    }
  };

  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      provider.on("accountChanged", async (publicKey) => {
        if (publicKey) {
          const pubKeyStr = publicKey.toString();
          setWalletAddress(pubKeyStr);
          await fetchBalance(pubKeyStr);
        } else {
          setWalletAddress(null);
          setBalance(null);
        }
      });
    }
  }, []);

  const handleLogout = async () => {
    await disconnectWallet(); 
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">

        {/* Phần Logo: Phóng to bằng thuộc tính w-24, h-24 và scale */}
        <Link to="/" className="flex items-center hover:opacity-80 transition relative z-10">
          <img 
            src={logoImg} 
            alt="TraceFund Logo" 
            className="h-24 w-24 object-contain rounded-xl transform scale-110 -ml-2" 
          />
        </Link>
        
        {/* Phần Menu Center */}
        <div className="hidden md:flex items-center gap-7 font-medium text-sm text-[#475569]">
          <Link to="/" className="text-[#0f172a] hover:text-[#0b5d51] transition">Khám phá dự án</Link>
          
          {/* Menu cho khách (Guest) */}
          {!user && (
            <>
              <Link to="/how-it-works" className="hover:text-[#0b5d51] transition">Cách hoạt động</Link>
              <Link to="/transparency" className="hover:text-[#0b5d51] transition">Minh bạch</Link>
              <Link to="/about" className="hover:text-[#0b5d51] transition">Về chúng tôi</Link>
            </>
          )}

          {/* Menu cho Role Donor */}
          {user?.role === "donor" && (
            <Link to="/donor/dashboard" className="hover:text-[#0b5d51] transition">Portfolio của tôi</Link>
          )}

          {/* Menu cho Role Organization */}
          {user?.role === "org" && (
            <Link to="/org/dashboard" className="hover:text-[#0b5d51] transition">Quản lý Dự án</Link>
          )}
        </div>

        {/* Phần Actions (Right) */}
        <div className="flex items-center gap-5 text-sm font-medium">
          
          {/* Nút ngôn ngữ */}
          <button className="flex items-center gap-1.5 text-[#475569] hover:text-[#0b5d51] transition">
            <Globe className="w-4 h-4" />
            <span className="font-semibold">EN / VI</span>
          </button>

          {/* Chưa đăng nhập (Guest UI) */}
          {!user ? (
            <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
              <Link to="/login" className="text-[#0f172a] hover:text-[#0b5d51] font-semibold transition">
                Đăng nhập
              </Link>
              <button 
                onClick={connectWallet}
                className="flex items-center gap-2 border border-gray-300 text-[#0f172a] px-4 py-2 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                <Wallet className="w-4 h-4" />
                Kết nối ví
              </button>
              <button className="bg-[#0b5d51] text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition shadow-sm font-semibold">
                Đóng góp ngay
              </button>
            </div>
          ) : (
            
            /* Đã đăng nhập (User UI) */
            <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
              {user.role === "donor" ? (
                !walletAddress ? (
                  // Nút kết nối ví (khi đã login donor)
                  <button
                    onClick={connectWallet}
                    className="flex items-center gap-2 border border-gray-300 text-[#0f172a] px-4 py-2 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    <Wallet className="w-4 h-4" />
                    Kết nối ví
                  </button>
                ) : (
                  // Trạng thái đã kết nối ví
                  <div 
                    className="flex items-center gap-2 bg-[#e6f2f0] border border-[#0b5d51]/20 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#d1e8e5] transition" 
                    onClick={disconnectWallet} 
                    title="Nhấn để ngắt kết nối"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                    <span className="text-[#0b5d51] text-sm font-bold">
                      {balance !== null ? `${balance.toFixed(2)} SOL` : "..."}
                    </span>
                    <span className="text-[#0b5d51]/60 text-xs font-mono border-l border-[#0b5d51]/20 pl-2">
                      {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                    </span>
                  </div>
                )
              ) : (
                // Trạng thái tổ chức (Org)
                <span className="bg-[#e6f2f0] text-[#0b5d51] px-3 py-1.5 rounded-lg text-sm font-bold border border-[#0b5d51]/20">
                  {user.orgName}
                </span>
              )}

              {/* Nút Đăng xuất */}
              <button 
                onClick={handleLogout} 
                className="text-gray-400 hover:text-red-500 transition p-2"
                title="Đăng xuất"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}