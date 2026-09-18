// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Khôi phục trạng thái từ LocalStorage khi load trang
  useEffect(() => {
    const savedUser = localStorage.getItem('tracefund_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (role) => {
    const userData = {
      isLoggedIn: true,
      role: role, // 'donor' hoặc 'org'
      walletAddress: role === 'donor' ? '8vF3...K9z' : null,
      orgName: role === 'org' ? 'Quỹ Trẻ Em Vùng Cao' : null,
    };
    setUser(userData);
    localStorage.setItem('tracefund_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tracefund_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);