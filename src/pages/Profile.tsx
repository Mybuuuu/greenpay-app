import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Shield, 
  LogOut, 
  ChevronRight,
  Settings,
  Bell,
  Trash2,
  Lock,
  Edit2,
  Save,
  X,
  Award,
  Recycle,
  Gift
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useNotifications } from '../context/NotificationContext';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { points, transactions } = useApp();
  const { addNotification } = useNotifications();
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: user?.name?.split(' ')[0] || '',
    email: user?.email || '',
    phone: '+62 812-3456-7890', // Simplified for demo
    address: 'Jl. Ahmad Yani No. 12, Pontianak Selatan'
  });

  const totalKg = transactions
    .filter(tx => tx.type === 'EXCHANGE' && tx.status === 'VERIFIED')
    .reduce((acc, tx) => acc + (parseFloat(tx.weight || '0')), 0);

  const handleSave = async () => {
    // In a real app, we'd call an API here
    await updateProfile(formData);
    setIsEditing(false);
    addNotification({
      title: 'Profil Diperbarui',
      message: 'Informasi akun Anda telah berhasil disimpan.',
      type: 'INFO'
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-20">
        {/* Header Profile */}
        <div className="relative">
           <div className="h-48 md:h-64 bg-slate-900 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 emerald-gradient opacity-20" />
              <div className="absolute top-0 right-0 p-12 opacity-5">
                 <Recycle size={280} />
              </div>
           </div>
           <div className="px-8 -mt-20 relative z-10 flex flex-col md:flex-row items-end gap-6">
              <div className="relative group">
                 <div className="w-40 h-40 rounded-[2.5rem] border-8 border-white bg-slate-100 overflow-hidden shadow-xl shadow-slate-200">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                      className="w-full h-full object-cover" 
                      alt="avatar" 
                    />
                 </div>
                 <button className="absolute bottom-2 right-2 w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center border-4 border-white shadow-lg hover:bg-emerald-700 transition-all scale-0 group-hover:scale-100 transition-transform">
                    <Camera size={18} />
                 </button>
              </div>
              <div className="flex-1 pb-4 text-center md:text-left">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-emerald-200">
                    <Award size={14} /> Level 12: Penjaga Lingkungan
                 </div>
                 <h1 className="text-4xl font-bold text-slate-800 tracking-tight font-display mb-1">{user?.name}</h1>
                 <p className="text-slate-400 font-medium tracking-tight">Anggota sejak November 2023 • Pontianak, Indonesia</p>
              </div>
              <div className="pb-4 flex gap-3">
                 <button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={cn(
                    "px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm",
                    isEditing ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-white border border-slate-100 text-slate-700 hover:bg-slate-50"
                  )}
                 >
                    {isEditing ? <><Save size={18} /> Simpan</> : <><Edit2 size={18} /> Edit Profil</>}
                 </button>
                 {isEditing && (
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="p-3 bg-white border border-slate-100 text-rose-500 rounded-xl hover:bg-rose-50 transition-all shadow-sm"
                    >
                      <X size={18} />
                    </button>
                 )}
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Left Sidebar: Stats & Badges */}
           <div className="space-y-8">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
                 <h3 className="text-lg font-bold text-slate-800 tracking-tight font-display">Kontribusi Anda</h3>
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                             <Recycle size={24} />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total Daur Ulang</p>
                             <p className="text-xl font-bold text-slate-800">{totalKg.toFixed(1)} kg</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">+12%</p>
                       </div>
                    </div>
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                             <Gift size={24} />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Saldo Poin</p>
                             <p className="text-xl font-bold text-slate-800">{points.toLocaleString()} GP</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-slate-50 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lencana Pencapaian</p>
                       <p className="text-[10px] font-bold text-emerald-600 hover:underline cursor-pointer">Lihat Semua</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                       {['🏆', '🌱', '💧', '🌳', '🌟', '🛡️'].map((badge, i) => (
                         <div key={i} className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xl shadow-sm hover:scale-110 transition-transform cursor-pointer">
                            {badge}
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <button 
                onClick={logout}
                className="w-full p-6 bg-rose-50 text-rose-600 rounded-[2rem] font-bold text-sm hover:bg-rose-100 transition-all flex items-center justify-center gap-3 border border-rose-100 group shadow-sm active:scale-95 duration-200"
              >
                 <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Keluar dari Akun
              </button>
           </div>

           {/* Main Content: Info & Settings */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight font-display">Informasi Personal</h3>
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                       <Shield size={14} /> Terverifikasi
                    </div>
                 </div>
                 <div className="p-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nama Depan</label>
                          <div className="relative">
                             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                             <input 
                                disabled={!isEditing}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                spellCheck="false"
                                className={cn(
                                  "w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-bold transition-all outline-none",
                                  isEditing ? "bg-slate-50 border-2 border-emerald-500/20 focus:border-emerald-500" : "bg-transparent border border-transparent text-slate-600"
                                )}
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Alamat Email</label>
                          <div className="relative">
                             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                             <input 
                                disabled={!isEditing}
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                spellCheck="false"
                                className={cn(
                                  "w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-bold transition-all outline-none",
                                  isEditing ? "bg-slate-50 border-2 border-emerald-500/20 focus:border-emerald-500" : "bg-transparent border border-transparent text-slate-600"
                                )}
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nomor Telepon</label>
                          <div className="relative">
                             <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                             <input 
                                disabled={!isEditing}
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                spellCheck="false"
                                className={cn(
                                  "w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-bold transition-all outline-none",
                                  isEditing ? "bg-slate-50 border-2 border-emerald-500/20 focus:border-emerald-500" : "bg-transparent border border-transparent text-slate-600"
                                )}
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Lokasi Default</label>
                          <div className="relative">
                             <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                             <input 
                                disabled={!isEditing}
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                spellCheck="false"
                                className={cn(
                                  "w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-bold transition-all outline-none",
                                  isEditing ? "bg-slate-50 border-2 border-emerald-500/20 focus:border-emerald-500" : "bg-transparent border border-transparent text-slate-600"
                                )}
                             />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-50">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight font-display">Pengaturan Keamanan</h3>
                 </div>
                 <div className="p-0 divide-y divide-slate-50">
                    {[
                      { icon: Lock, label: 'Ubah Kata Sandi', desc: 'Perbarui kunci akses akun Anda secara berkala.' },
                      { icon: Bell, label: 'Notifikasi', desc: 'Atur preferensi pemberitahuan penukaran dan promo.' },
                      { icon: Shield, label: 'Privasi Akun', desc: 'Kelola data apa saja yang dapat dilihat oleh mitra.' },
                    ].map((item, i) => (
                      <div key={i} className="p-8 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-all">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                               <item.icon size={22} />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-slate-800 tracking-tight">{item.label}</p>
                               <p className="text-[11px] text-slate-400 font-medium">{item.desc}</p>
                            </div>
                         </div>
                         <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-rose-50/30 rounded-[2rem] p-8 border border-rose-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                    <h4 className="text-lg font-bold text-rose-800 mb-1 tracking-tight">Hapus Akun</h4>
                    <p className="text-[11px] text-rose-600 font-medium max-w-sm">
                       Seluruh poin dan riwayat transaksi Anda akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                    </p>
                 </div>
                 <button className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold text-xs hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/20 flex items-center gap-2">
                    <Trash2 size={16} /> Hapus Selamanya
                 </button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
