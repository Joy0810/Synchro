import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AdminNavbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getNavClasses = (path: string) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "flex items-center gap-3 px-4 py-3 text-[#81ecff] font-bold border-r-2 border-[#81ecff] bg-[#131313] transition-colors duration-200 font-headline group";
    }
    return "flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-300 hover:bg-[#131313] transition-colors duration-200 font-headline group";
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#000000] border-r border-[#484847]/15 flex flex-col py-8 z-50">
        <div className="px-8 mb-12">
          <h1 className="text-2xl font-bold tracking-tighter text-[#81ecff] font-headline">Synchro</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link className={getNavClasses('/admin/dashboard')} to="/admin/dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link className={getNavClasses('/admin/assignments')} to="/admin/assignments">
            <span className="material-symbols-outlined">assignment</span>
            <span>Assignments</span>
          </Link>
          <Link className={getNavClasses('/admin/groups')} to="/admin/groups">
            <span className="material-symbols-outlined">group</span>
            <span>Groups</span>
          </Link>
          <Link className={getNavClasses('/admin/submissions')} to="/admin/submissions">
            <span className="material-symbols-outlined">send</span>
            <span>Submissions</span>
          </Link>
        </nav>
        <div className="px-4 mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-300 hover:bg-[#131313] transition-colors duration-200 font-headline w-full">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <header className="fixed top-0 right-0 left-64 h-16 bg-[#0e0e0e]/80 backdrop-blur-xl flex items-center justify-end px-8 z-40">
        <div className="flex items-center gap-6">
          {user && (
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right">
                <p className="text-sm font-medium text-on-surface font-body">{user.name}</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center text-primary font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
