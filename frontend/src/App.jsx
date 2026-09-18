// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext"; // Import ProjectProvider
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer"; // Đã thêm import Footer
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProjectDetail from "./pages/ProjectDetail";
import DonorDashboard from "./pages/DonorDashboard";
import OrgDashboard from "./pages/OrgDashboard";
import ProjectManage from "./pages/ProjectManage";
import ProjectCreate from "./pages/ProjectCreate"; // Import trang Tạo dự án
import AIChatbox from "./components/shared/AIChatbox";

function App() {
  return (
    <AuthProvider>
      <ProjectProvider> {/* Bọc ProjectProvider bên trong AuthProvider */}
        <Router>
          <div className="min-h-screen flex flex-col bg-white relative font-sans">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                
                {/* Các Route dành cho Người quyên góp */}
                <Route path="/donor/dashboard" element={<DonorDashboard />} />
                
                {/* Các Route dành cho Nhà tổ chức */}
                <Route path="/org/dashboard" element={<OrgDashboard />} />
                <Route path="/org/project/create" element={<ProjectCreate />} /> {/* Route mới */}
                <Route path="/org/project/:id/manage" element={<ProjectManage />} />
              </Routes>
            </main>

            <Footer /> {/* Footer nằm ngay dưới main để luôn ở cuối trang */}
            
            <AIChatbox />
          </div>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;