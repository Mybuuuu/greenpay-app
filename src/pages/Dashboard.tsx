import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Recycle, 
  Gift, 
  Award, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Leaf,
  ChevronRight,
  Plus,
  Target,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const chartData = [
  { name: 'Sen', points: 120 },
  { name: 'Sel', points: 90 },
  { name: 'Rab', points: 180 },
  { name: 'Kam', points: 150 },
  { name: 'Jum', points: 240 },
  { name: 'Sab', points: 360 },
  { name: 'Min', points: 270 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { points, transactions } = useApp();

  const totalKg = transactions
    .filter(tx => tx.type === 'EXCHANGE' && tx.status === 'VERIFIED')
    .reduce((acc, tx) => acc + (parseFloat(tx.weight || '0')), 0);

  const recentTransactions = transactions.slice(0, 4);

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Welcome Banner */}
        <div className="relative bg-emerald-600 rounded-[2.5rem] p-8 lg:p-12 overflow-hidden text-white flex flex-col lg:flex-row justify-between items-center gap-8 shadow-2xl shadow-emerald-500/20">
          <div className="relative z-10 text-center lg:text-left">
             <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-white/10">
                <Leaf size={14} fill="currentColor" /> {user?.level}: Level 12
             </div>
             <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight font-display italic">Selamat Datang, {user?.name.split(' ')[0]}!</h1>
             <p className="text-white/80 max-w-md font-medium text-lg mb-8 leading-relaxed">
                Kamu telah mengurangi {totalKg.toFixed(1)}kg sampah bulan ini. Itu setara dengan menyelamatkan 3 pohon dewasa!
             </p>
             <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => navigate('/app/exchange')}
                  className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-emerald-50 transition-all shadow-xl shadow-black/5 flex items-center gap-2 group active:scale-95"
                >
                  <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Tukar Sampah Baru
                </button>
                <button 
                  onClick={() => navigate('/app/education')}
                  className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
                >
                  Tips Memilah Sampah
                </button>
             </div>
          </div>
          <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0 animate-float">
             <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl" />
             <div className="relative z-10 w-full h-full bg-white/10 rounded-[3rem] rotate-3 border border-white/20 backdrop-blur-md flex items-center justify-center p-8 overflow-hidden shadow-inner">
                <Recycle size={100} className="text-white opacity-10 absolute -bottom-8 -right-8 rotate-12" />
                <Award size={80} className="text-white relative z-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                <div className="absolute top-4 left-4 bg-white/30 px-3 py-1 rounded-lg text-[9px] font-black tracking-[0.2em] uppercase backdrop-blur-sm">PRO VERIFIED</div>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Saldo Poin', value: points.toLocaleString(), sub: 'GP', icon: Gift, color: 'text-emerald-600', bg: 'bg-emerald-50', up: true, trend: '12% naik' },
            { label: 'Total Sampah', value: totalKg.toFixed(1), sub: 'kg', icon: Recycle, color: 'text-blue-600', bg: 'bg-blue-50', up: true, trend: 'Sedang naik' },
            { label: 'Dampak Karbon', value: '124', sub: 'kgCO2', icon: Zap, color: 'text-rose-600', bg: 'bg-rose-50', up: true, trend: '-15% bln lalu' },
            { label: 'Kontribusi', value: transactions.length.toString(), sub: 'Aksi', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50', up: true, trend: 'Aktif' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", stat.bg, stat.color)}>
                  <stat.icon size={28} strokeWidth={1.5} />
                </div>
                <div className={cn("flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600")}>
                   {stat.trend}
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-800 font-display tracking-tight mt-1">
                {stat.value} <span className="text-slate-300 text-sm font-normal uppercase">{stat.sub}</span>
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Analytics Card */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm overflow-hidden relative group">
                 <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                    <Recycle size={180} />
                 </div>
                 <div className="relative z-10">
                   <div className="flex justify-between items-center mb-10">
                      <div>
                        <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2 leading-none">Statistik Mingguan</h3>
                        <h4 className="text-2xl font-bold text-slate-800 tracking-tight font-display">Pertumbuhan Kontribusi</h4>
                      </div>
                      <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 cursor-pointer">
                         <option>7 Hari Terakhir</option>
                         <option>30 Hari Terakhir</option>
                      </select>
                   </div>
                   
                   <div className="h-[300px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} 
                            dy={15}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} 
                          />
                          <Tooltip 
                            contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}}
                            itemStyle={{ fontWeight: 800, fontSize: '12px' }}
                          />
                          <Area type="monotone" dataKey="points" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorPoints)" />
                       </AreaChart>
                     </ResponsiveContainer>
                   </div>
                 </div>
              </div>

              {/* Recent Activity Mini-Table */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight font-display">Aktivitas Terakhir</h3>
                    <button onClick={() => navigate('/app/history')} className="text-[10px] font-black text-emerald-600 hover:underline uppercase tracking-widest">Semua Transaksi</button>
                 </div>
                 <div className="space-y-4">
                    {recentTransactions.map((tx, i) => (
                       <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-xl">
                          <div className="flex items-center gap-5">
                             <div className={cn(
                               "w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border transition-transform group-hover:scale-110",
                               tx.points > 0 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
                             )}>
                                {tx.points > 0 ? <Recycle size={24} /> : <Gift size={24} />}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-800 tracking-tight">{tx.title}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{tx.date}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className={cn("text-base font-black font-display tracking-tight", tx.points > 0 ? "text-emerald-600" : "text-slate-800")}>
                               {tx.points > 0 ? '+' : ''}{tx.points} GP
                             </p>
                             <div className={cn(
                               "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.15em] mt-1.5",
                               tx.status === 'VERIFIED' || tx.status === 'COMPLETED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                               tx.status === 'PENDING' ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-rose-50 text-rose-600 border-rose-100"
                             )}>
                               <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                               {tx.status === 'VERIFIED' ? 'TERVERIFIKASI' : tx.status === 'COMPLETED' ? 'SELESAI' : tx.status === 'PENDING' ? 'PROSES' : 'DITOLAK'}
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              {/* Target / Progress Card */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/30">
                 <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-1000 group-hover:rotate-12">
                    <Target size={160} />
                 </div>
                 <div className="relative z-10">
                    <div className="flex justify-between items-center mb-8">
                       <h4 className="text-lg font-black uppercase tracking-[0.2em] text-emerald-400">Target Mingguan</h4>
                       <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                          <TrendingUp size={20} className="text-emerald-400" />
                       </div>
                    </div>
                    <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">Daur ulang <span className="text-white font-black italic">5kg Plastik</span> minggu ini untuk mendapatkan bonus <span className="text-emerald-400 font-black">250 poin</span>.</p>
                    <div className="w-full bg-white/5 rounded-full h-3.5 mb-3 overflow-hidden border border-white/5">
                       <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '68%' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="bg-emerald-500 h-full rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                       />
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                       <span>3.4 / 5.0 kg</span>
                       <span className="text-emerald-400">68% Selesai</span>
                    </div>
                 </div>
              </div>

              {/* Quick Rewards / Sembako Status */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative group overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                    <Gift size={100} />
                 </div>
                 <h4 className="text-lg font-bold text-slate-800 mb-8 tracking-tight flex items-center gap-2">
                    <Target size={18} className="text-emerald-500" /> Target Sembako
                 </h4>
                 <div className="space-y-6">
                    {[
                      { label: 'Beras Premium 1kg', req: 120, current: points, icon: '🍚' },
                      { label: 'Minyak Goreng 1L', req: 150, current: points, icon: '🫧' },
                      { label: 'Gula Pasir 1kg', req: 100, current: points, icon: '🧊' }
                    ].map((reward, i) => (
                      <div key={i} className="group/item">
                        <div className="flex justify-between items-center mb-3">
                           <div className="flex items-center gap-3">
                              <span className="text-2xl grayscale group-hover/item:grayscale-0 transition-all">{reward.icon}</span>
                              <p className="text-xs font-bold text-slate-700 tracking-tight">{reward.label}</p>
                           </div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{Math.min(100, Math.round((reward.current / reward.req) * 100))}%</p>
                        </div>
                        <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                           <div 
                            className={cn("h-full rounded-full transition-all duration-1000", reward.current >= reward.req ? "bg-emerald-500" : "bg-emerald-500/20")}
                            style={{ width: `${Math.min(100, (reward.current / reward.req) * 100)}%` }} 
                           />
                        </div>
                      </div>
                    ))}
                 </div>
                 <button 
                  onClick={() => navigate('/app/rewards')}
                  className="w-full mt-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-xs hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 uppercase tracking-widest"
                 >
                    Semua Hadiah
                 </button>
              </div>

              {/* Eco Tips */}
              <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-white shadow-inner">
                 <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Tips Hari Ini</h4>
                 <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm border border-slate-100 shrink-0">♻️</div>
                    <div>
                       <p className="text-sm font-bold text-slate-800 leading-snug tracking-tight mb-1">Bilas wadah makanan sebelum didaur ulang.</p>
                       <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Cegah kontaminasi silang untuk meningkatkan nilai daur ulang.</p>
                    </div>
                 </div>
              </div>

              {/* Verified Partners / Trust section */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm overflow-hidden relative">
                 <div className="flex justify-between items-center mb-6">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Mitra Terverifikasi</h4>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                 </div>
                 <div className="grid grid-cols-3 gap-4 grayscale opacity-40">
                    <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center font-black text-[8px] text-center p-2">PEMKOT<br/>PTK</div>
                    <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center font-black text-[8px] text-center p-2">BANK<br/>SAMPAH</div>
                    <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center font-black text-[8px] text-center p-2">ENVIRO<br/>PLUS</div>
                 </div>
                 <p className="text-[10px] text-slate-400 font-medium text-center mt-6">Didukung penuh oleh Dinas Lingkungan Hidup Kota Pontianak.</p>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
