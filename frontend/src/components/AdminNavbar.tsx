import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const AdminNavbar: React.FC = () => {
  const location = useLocation();

  const getNavClasses = (path: string) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "flex items-center gap-4 px-4 py-3 text-[#81ecff] border-r-4 border-[#81ecff] bg-white/5 transition-colors duration-200 group";
    }
    return "flex items-center gap-4 px-4 py-3 text-[#adaaaa] hover:text-[#81ecff] hover:bg-[#201f1f] transition-colors duration-200 group";
  };

  return (
    <>
      <aside className="fixed left-0 top-0 h-full flex flex-col w-64 border-r-0 bg-[#000000] z-50 tracking-tight">
        <div className="p-8">
          <div className="text-2xl font-bold tracking-tighter text-[#81ecff] font-headline">Synchro</div>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 font-headline text-sm">
          <Link className={getNavClasses('/admin/dashboard')} to="/admin/dashboard">
            <span className="material-symbols-outlined hover:scale-105 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link className={getNavClasses('/admin/assignments')} to="/admin/assignments">
            <span className="material-symbols-outlined hover:scale-105 transition-transform">assignment</span>
            <span className="font-medium">Assignments</span>
          </Link>
          <Link className={getNavClasses('/admin/groups')} to="/admin/groups">
            <span className="material-symbols-outlined hover:scale-105 transition-transform">group</span>
            <span className="font-medium">Groups</span>
          </Link>
          <Link className={getNavClasses('/admin/submissions')} to="/admin/submissions">
            <span className="material-symbols-outlined hover:scale-105 transition-transform">send</span>
            <span className="font-medium">Submissions</span>
          </Link>
        </nav>
        <div className="px-4 py-6 border-t border-[#767575]/10">
          <a className="flex items-center gap-4 px-4 py-2 text-[#adaaaa] hover:text-[#ff716c] transition-all" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">Logout</span>
          </a>
        </div>
      </aside>

      {/* Top Navbar */}
      <header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-end px-8 z-40 bg-[#0e0e0e]/80 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pl-4 border-l border-[#484847]/20">
            <div className="text-right">
              <p className="text-sm font-bold leading-none text-white">Prof. Sterling</p>
              <p className="text-[10px] text-[#adaaaa] tracking-widest uppercase mt-1">Lead Instructor</p>
            </div>
            <img 
              alt="Professor Profile" 
              className="w-10 h-10 rounded-full border border-[#81ecff]/20 bg-[#262626] object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Agymc1z0n4Da1_HaHjyduobP5XApkrDxIBYdsj-ThhaBMG3ToDsxHvtvb-pOq1UVPoL9fsYqFwetQbRhGUFVuwKI78TmLnwa0YyPOUbXFwwDLphAIfV7V2dnGr8Qzrrnx9KAuXakf_kUU7BLLBf1btX-oELevgopjWafOKtpjH6DRW6weHHmGUYrPXZINSOB2qclOil0NuoCpl8sax7jWcHOe0079fdW3DHYvM0rYGWsC3DRk9dsfVM1Z6LHcTDhu6I7Hxjz2GM" 
            />
          </div>
        </div>
      </header>
    </>
  );
};
