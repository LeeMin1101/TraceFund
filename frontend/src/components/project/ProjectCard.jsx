import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  // Giả lập thêm dữ liệu thiếu để khớp với UI ảnh
  const percentage = Math.round((project.raisedSol / project.targetSol) * 100);
  const donors = Math.floor(Math.random() * 500) + 50; 
  const impact = Math.floor(Math.random() * 1000) + 100;
  const daysLeft = Math.floor(Math.random() * 30) + 1;
  const location = "Việt Nam";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
      {/* Thumbnail & Badge */}
      <div className="h-48 relative">
        <img 
          src={project.image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&q=80"} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-sm shadow-sm">
          {project.category || "Cộng đồng"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 text-emerald-700 text-xs font-medium mb-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          {project.orgName}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 min-h-[3.5rem] leading-tight">
          {project.title}
        </h3>
        
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {location}
        </div>
        
        {/* Progress */}
        <div className="mt-auto">
          <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
            <span>{project.raisedSol} SOL raised</span>
            <span className="text-gray-500 font-medium">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
            <div className="bg-emerald-900 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-5 border-t border-gray-100 pt-3">
            <div>
              <p className="mb-1">Nhà đóng góp</p>
              <p className="font-bold text-gray-900">{donors}</p>
            </div>
            <div>
              <p className="mb-1">Impact</p>
              <p className="font-bold text-gray-900">{impact}</p>
            </div>
            <div className="text-right">
              <p className="mb-1">Ngày còn lại</p>
              <p className="font-bold text-gray-900">{daysLeft}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link to={`/project/${project.id}`} className="text-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Xem
            </Link>
            <button className="text-center py-2 px-4 bg-emerald-900 rounded-md text-sm font-medium text-white hover:bg-emerald-800 transition-colors">
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}