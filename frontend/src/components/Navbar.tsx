import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getNavClasses = (path: string) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "flex items-center gap-3 px-4 py-3 text-[#81ecff] font-bold border-r-2 border-[#81ecff] bg-[#131313] transition-colors duration-200 font-headline group";
    }
    return "flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-300 hover:bg-[#131313] transition-colors duration-200 font-headline group";
  };

  return (
    <>
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#000000] border-r border-[#484847]/15 flex flex-col py-8 z-50">
        <div className="px-8 mb-12">
          <h1 className="text-2xl font-bold tracking-tighter text-[#81ecff] font-headline">Synchro</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link className={getNavClasses('/dashboard')} to="/dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link className={getNavClasses('/assignments')} to="/assignments">
            <span className="material-symbols-outlined">assignment</span>
            <span>Assignments</span>
          </Link>
          <Link className={getNavClasses('/my-group')} to="/my-group">
            <span className="material-symbols-outlined">group</span>
            <span>My Group</span>
          </Link>
          <Link className={getNavClasses('/submissions')} to="/submissions">
            <span className="material-symbols-outlined">send</span>
            <span>Submissions</span>
          </Link>
        </nav>
        <div className="px-4 mt-auto">
          {isLoggedIn ? (
            <a className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-300 hover:bg-[#131313] transition-colors duration-200 font-headline" href="/login">
              <span className="material-symbols-outlined">logout</span>
              <span>Logout</span>
            </a>
          ) : null}
        </div>
      </aside>

      <header className="fixed top-0 right-0 left-64 h-16 bg-[#0e0e0e]/80 backdrop-blur-xl flex items-center justify-end px-8 z-40">
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right">
                <p className="text-sm font-medium text-on-surface font-body">Alex Chen</p>
              </div>
              <img 
                alt="Alex Chen student profile" 
                className="w-10 h-10 rounded-full border border-primary/20 object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPiC4Pgz5zh48TGBzeJUtMfjbe2gltrFxIiTsU0p_aPTO89ipijP9pjSdfZov7PBveQQ-HftvqMD88Bg6tjPfuAFHmnl59k5_s-zs_43-u6ZRcGkkljGiRqLUfxpXBlEYmPdYg_cpwlVcLWnjzGB5uBB7P5eC35ebGDkA3g54IYH-awV7drdTnEhHfUvZrp41RcNYtTFdOJg7l5rvJsThk4tkIxCVhqIZrvgxOjamCy3f-ZSMuM-WozZhKc6PRr6keQk5Zknn1Vlk"
              />
            </div>
          ) : (
             <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold font-headline text-on-surface-variant hover:text-primary transition-colors">
                  Sign In
                </Link>
                <button onClick={() => navigate('/register')} className="bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed px-6 py-2 rounded-full font-bold font-label text-xs tracking-tighter hover:scale-105 active:scale-95 transition-transform">
                  REGISTER
                </button>
             </div>
          )}
        </div>
      </header>
    </>
  );
};
