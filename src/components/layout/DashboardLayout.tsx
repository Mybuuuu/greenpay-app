import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Recycle, 
  Gift, 
  History, 
  BookOpen, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  Search,
  User
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useNotifications } from '../../context/NotificationContext';

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
}

const SidebarItem = ({ to, icon: Icon, label, badge }: SidebarItemProps) => (
  <NavLink
    to={to}
    className={(state) => cn(
      "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group mb-1",
      state.isActive 
        ? "bg-emerald-50 text-emerald-600 font-semibold shadow-sm border border-emerald-100/50" 
        : "text-slate-500 hover:bg-emerald-500/5 hover:text-emerald-600"
    )}
  >
    {({ isActive }) => (
      <>
        <div className="flex items-center gap-3">
          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
          <span className="text-sm tracking-tight">{label}</span>
        </div>
        {badge && (
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full",
            badge === 'HOT' ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
          )}>
            {badge}
          </span>
        )}
      </>
    )}
  </NavLink>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { points, transactions } = useApp();
  const { unreadCount, toggleNotificationCenter } = useNotifications();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const pageTitle = React.useMemo(() => {
    const path = location.pathname.split('/').pop();
    switch(path) {
      case 'dashboard': return 'Ringkasan Akun';
      case 'exchange': return 'Tukar Sampah';
      case 'rewards': return 'Pusat Hadiah';
      case 'history': return 'Riwayat Transaksi';
      case 'education': return 'Akademi Hijau';
      case 'profile': return 'Profil Saya';
      default: return 'Ringkasan';
    }
  }, [location.pathname]);

  const levelProgress = Math.min(100, (points % 1000) / 10);
  const nextLevelPoints = 1000 - (points % 1000);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 overflow-hidden">
        <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <Recycle size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl tracking-tight text-emerald-600 font-display">Greenpay</span>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-hide">
          <SidebarItem to="/app/dashboard" icon={LayoutDashboard} label="Dasbor" />
          <SidebarItem to="/app/exchange" icon={Recycle} label="Tukar Sampah" />
          <SidebarItem to="/app/rewards" icon={Gift} label="Tukar Poin" />
          <SidebarItem to="/app/history" icon={History} label="Riwayat" />
          <SidebarItem to="/app/education" icon={BookOpen} label="Edukasi" />
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pengarutan</div>
          <SidebarItem to="/app/profile" icon={User} label="Profil" />
        </nav>

        <div className="p-6 border-t border-slate-100">
          <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden group">
            <p className="text-[10px] uppercase tracking-wider font-bold opacity-60 mb-1 relative z-10">Saldo Poin</p>
            <h4 className="text-2xl font-bold font-display relative z-10">{points.toLocaleString()} <span className="text-sm font-normal opacity-60">GP</span></h4>
            <div className="mt-4 w-full bg-white/10 h-1.5 rounded-full overflow-hidden relative z-10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                className="bg-emerald-500 h-full rounded-full" 
              />
            </div>
            <p className="text-[9px] mt-2 opacity-60 font-medium relative z-10">{nextLevelPoints} poin lagi untuk level baru</p>
            <div className="absolute top-0 right-0 w-20 h-20 emerald-gradient opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          </div>
          
          <div 
            className="mt-6 flex items-center gap-3 px-2 cursor-pointer group"
            onClick={() => navigate('/app/profile')}
          >
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden shadow-sm group-hover:border-emerald-600 transition-colors">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                alt={user?.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-xs font-bold text-slate-800 leading-none truncate group-hover:text-emerald-600 transition-colors">{user?.name}</p>
               <p className="text-[10px] text-slate-400 font-medium truncate">Pontianak, ID</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between flex-shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="font-bold text-slate-800 text-lg tracking-tight">{pageTitle}</h2>
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Hub Pontianak Aktif</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Cari fitur..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold w-48 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all font-sans"
              />
            </div>

            <div className="flex items-center gap-3">
               <button 
                onClick={toggleNotificationCenter}
                className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-100"
               >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                      {unreadCount}
                    </span>
                  )}
               </button>
               <div 
                className="w-10 h-10 rounded-full emerald-gradient flex items-center justify-center text-white cursor-pointer shadow-lg shadow-emerald-500/20 sm:hidden"
                onClick={() => navigate('/app/profile')}
               >
                  <User size={18} />
               </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide bg-slate-50/50">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 bottom-0 w-4/5 max-w-xs bg-white p-6 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
               <div className="flex items-center gap-2">
                <div className="w-8 h-8 emerald-gradient rounded-lg flex items-center justify-center text-white">
                  <Recycle size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight text-emerald-600 font-display">Greenpay</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 p-1">
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              <SidebarItem to="/app/dashboard" icon={LayoutDashboard} label="Dasbor" />
              <SidebarItem to="/app/exchange" icon={Recycle} label="Tukar Sampah" />
              <SidebarItem to="/app/rewards" icon={Gift} label="Tukar Poin" />
              <SidebarItem to="/app/history" icon={History} label="Riwayat" />
              <SidebarItem to="/app/education" icon={BookOpen} label="Edukasi" />
              <SidebarItem to="/app/profile" icon={User} label="Profil Saya" />
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-100">
               <div className="flex items-center gap-3 mb-6 px-2">
                  <div className="w-10 h-10 rounded-full border border-emerald-100 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt={user?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{points.toLocaleString()} Points</p>
                  </div>
               </div>
               <button 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs uppercase tracking-widest border border-rose-100"
               >
                <LogOut size={16} /> Keluar Akun
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
