import React, { useState, useEffect } from "react";
import { mockProjects } from "../data/mockData";
import ProjectCard from "../components/project/ProjectCard";
import { Link } from "react-router-dom";

// Import bức ảnh từ thư mục assets
import bannerImg from "../assets/banner.png";
import aboutImg from "../assets/about-me.png";

// Component đếm số tạo hiệu ứng Animation
const AnimatedCounter = ({ end, decimals = 0, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const duration = 2000; // Thời gian chạy animation (2 giây)
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(easeProgress * end);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end]);

  const formatted = Number(count.toFixed(decimals)).toLocaleString('en-US');
  return <span>{formatted}{suffix}</span>;
};

export default function Home() {
  return (
    <div className="bg-white font-sans text-stone-800">
      
      {/* 1. Hero Section - Banner làm nền, Khối Text đè lên trên */}
      <section className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <img 
            src={bannerImg} 
            alt="TraceFund Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
            Kết nối yêu thương qua Web3
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Theo dõi chính xác khoản đóng góp của bạn được sử dụng ở đâu.
          </h1>
          
          <p className="text-lg text-stone-200 mb-10 leading-relaxed max-w-2xl mx-auto">
            TraceFund giúp bạn theo dõi mọi bước đã xác minh — từ dòng tiền sẻ chia đến nụ cười và tác động thực tế ngoài đời thực.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#explore" className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-rose-500/30 flex items-center gap-2">
              Khám phá dự án &rarr;
            </a>
            <button className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-medium py-3.5 px-8 rounded-xl transition-colors">
              Cách hoạt động
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-stone-100 flex items-center gap-4 hidden md:flex hover:-translate-y-1 transition-transform cursor-default">
          <div className="bg-teal-50 p-2.5 rounded-full text-teal-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-stone-900">Giải ngân minh bạch</p>
            <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
              Tại: Trạm Y tế <span className="w-1 h-1 bg-stone-300 rounded-full mx-1"></span> Vừa xong
            </p>
          </div>
        </div>
      </section>

      {/* 2. Stats Section - Đưa về thiết kế Tối giản (Minimal) */}
      <section className="py-24 mt-4 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Sự tử tế không nên biến mất sau cú click Đóng góp.
          </h2>
          <p className="text-stone-500 mb-16 max-w-2xl mx-auto text-lg">
            TraceFund cung cấp thông tin minh bạch tuyệt đối về nơi nguồn vốn được phân bổ, giúp bạn an tâm rằng lòng tốt của mình đã trao đúng chỗ.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-stone-100 border-y border-stone-100 py-12">
            <div className="hover:scale-110 transition-transform duration-300 cursor-default">
              <h4 className="text-4xl md:text-5xl font-extrabold text-rose-600 mb-2">
                <AnimatedCounter end={1240} suffix="+" />
              </h4>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-3">Dự án uy tín</p>
            </div>
            <div className="hover:scale-110 transition-transform duration-300 cursor-default">
              <h4 className="text-4xl md:text-5xl font-extrabold text-rose-600 mb-2">
                <AnimatedCounter end={12.5} decimals={1} suffix="K" />
              </h4>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-3">SOL Nguồn vốn</p>
            </div>
            <div className="hover:scale-110 transition-transform duration-300 cursor-default">
              <h4 className="text-4xl md:text-5xl font-extrabold text-rose-600 mb-2">
                <AnimatedCounter end={100} suffix="%" />
              </h4>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-3">Minh bạch On-chain</p>
            </div>
            <div className="hover:scale-110 transition-transform duration-300 cursor-default">
              <h4 className="text-4xl md:text-5xl font-extrabold text-rose-600 mb-2">
                <AnimatedCounter end={45} suffix="K+" />
              </h4>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-3">Người thụ hưởng</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Về Chúng Tôi (About Us) */}
      <section className="bg-rose-50/40 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-rose-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-rose-500 inline-block"></span>
                Về TraceFund
              </h2>
              
              <h3 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-6 leading-tight hover:translate-x-2 transition-transform duration-500 cursor-default">
                Minh bạch 100% nhờ công nghệ <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 animate-pulse inline-block mt-2">
                  Blockchain Web3
                </span>
              </h3>
              
              <p className="text-lg text-stone-500 mb-6 leading-relaxed hover:text-stone-700 transition-colors duration-300">
                Được sáng lập với niềm tin rằng lòng tốt cần được bảo vệ, TraceFund kết nối những trái tim nhân ái trực tiếp đến các hoàn cảnh khó khăn. Không còn sự mập mờ trong thu chi, không còn rào cản về niềm tin.
              </p>
              <p className="text-lg text-stone-500 mb-10 leading-relaxed hover:text-stone-700 transition-colors duration-300">
                Mọi khoản đóng góp của bạn đều được mã hóa và ghi nhận vĩnh viễn trên sổ cái Solana. Bất kỳ ai cũng có thể truy xuất, kiểm chứng và theo dõi dòng tiền đến tận tay người thụ hưởng một cách rõ ràng nhất.
              </p>

              <div className="flex items-center gap-8 pt-6 border-t border-rose-200/50">
                 <div className="flex flex-col hover:-translate-y-1 transition-transform duration-300">
                    <span className="text-4xl font-extrabold text-stone-900">100%</span>
                    <span className="text-sm font-semibold text-rose-600 mt-1">Đến tay người nhận</span>
                 </div>
                 <div className="w-px h-14 bg-rose-200/80"></div>
                 <div className="flex flex-col hover:-translate-y-1 transition-transform duration-300">
                    <span className="text-4xl font-extrabold text-stone-900">0đ</span>
                    <span className="text-sm font-semibold text-teal-600 mt-1">Phí nền tảng</span>
                 </div>
              </div>
            </div>

            <div className="relative mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 to-teal-100 rounded-[2rem] transform rotate-3 scale-105 opacity-60"></div>
              
              <img 
                src={aboutImg} 
                alt="Hoạt động từ thiện" 
                className="relative z-10 w-full h-[500px] object-cover rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform duration-700"
              />
              
              <div className="absolute -bottom-8 -left-6 sm:-left-12 bg-white p-5 rounded-2xl shadow-xl border border-rose-100 z-20 animate-bounce-slow flex items-center gap-4">
                <div className="bg-rose-50 p-3 rounded-full text-rose-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">Trao gửi niềm tin</p>
                  <p className="text-xs text-stone-500 mt-0.5">Mạng lưới yêu thương</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Featured Projects */}
      <section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-10 border-b border-stone-100 pb-5">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-2">Dự án đang gọi vốn</h2>
            <p className="text-stone-500 text-sm">Chung tay ủng hộ các sáng kiến vì cộng đồng trên khắp Việt Nam.</p>
          </div>
          <Link to="/projects" className="hidden sm:flex text-rose-600 text-sm font-semibold hover:text-rose-700 transition-colors items-center gap-1">
            Xem tất cả dự án &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}