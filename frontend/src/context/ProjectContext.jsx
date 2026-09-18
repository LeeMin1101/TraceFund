import { createContext, useState, useEffect, useContext } from 'react';
import { mockProjects as initialProjects } from '../data/mockData';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  // Khởi tạo dữ liệu
  useEffect(() => {
    const saved = localStorage.getItem('tracefund_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(initialProjects);
      localStorage.setItem('tracefund_projects', JSON.stringify(initialProjects));
    }
  }, []);

  // Hàm lưu dữ liệu
  const saveProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem('tracefund_projects', JSON.stringify(newProjects));
  };

  // Hàm Tạo Dự án mới (Cho Tổ chức)
  const createProject = (newProject) => {
    const updated = [...projects, { ...newProject, id: `proj-${Date.now()}`, raisedSol: 0, ledger: [] }];
    saveProjects(updated);
  };

  // Hàm Donate (Cho Người quyên góp)
  const addDonation = (projectId, amount) => {
    const updated = projects.map(p => 
      p.id === projectId ? { ...p, raisedSol: p.raisedSol + Number(amount) } : p
    );
    saveProjects(updated);
  };

  // Hàm Upload Hóa đơn & Giải ngân (Cho Tổ chức)
  const addLedgerEntry = (projectId, entry) => {
    const updated = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          ledger: [...(p.ledger || []), { ...entry, id: `tx-${Date.now()}` }]
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  return (
    <ProjectContext.Provider value={{ projects, createProject, addDonation, addLedgerEntry }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);