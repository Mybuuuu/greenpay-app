import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'motion/react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Clock, 
  XCircle,
  FileText,
  User,
  Recycle,
  Gift,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

const statusConfig = {
  COMPLETED: { label: 'SELESAI', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 },
  VERIFIED: { label: 'TERVERIFIKASI', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 },
  PENDING: { label: 'MENUNGGU', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Clock },
  REJECTED: { label: 'DITOLAK', color: 'bg-rose-50 text-rose-600 border-rose-100', icon: XCircle },
};

export default function HistoryPage() {
  const { transactions: appTransactions } = useApp();
  const [filter, setFilter] = React.useState('All');
  const [search, setSearch] = React.useState('');

  const filteredData = appTransactions.filter(tx => {
    const matchesFilter = filter === 'All' || tx.type === filter;
    const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase()) || 
                          tx.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
           <div className="max-w-xl">
              <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight font-display">Riwayat Transaksi</h1>
              <p className="text-slate-500 font-medium">Transparansi penuh untuk setiap penukaran sampah dan klaim hadiah yang Anda lakukan.</p>
           </div>
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <Download size={16} /> Ekspor Laporan
           </button>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
           <div className="flex bg-slate-50 p-1 rounded-xl w-full md:w-auto">
              {['All', 'EXCHANGE', 'REDEMPTION'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "flex-1 md:px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                    filter === f ? "bg-white text-emerald-600 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {f === 'EXCHANGE' ? 'Tukar Sampah' : f === 'REDEMPTION' ? 'Tukar Hadiah' : 'Semua Aktivitas'}
                </button>
              ))}
           </div>
           
           <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64 text-sans">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input 
                   type="text" 
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   placeholder="Cari ID atau judul..."
                   className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                 />
              </div>
           </div>
        </div>

        {/* List View */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
           <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detail Transaksi</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dampak Poin</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verifikasi</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {filteredData.map((tx, i) => {
                   const config = statusConfig[tx.status as keyof typeof statusConfig] || statusConfig.PENDING;
                   const StatusIcon = config.icon;
                   return (
                     <motion.tr 
                       key={tx.id}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: i * 0.05 }}
                       className="group hover:bg-slate-50/30 transition-colors"
                     >
                        <td className="p-6">
                           <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border",
                                tx.type === 'EXCHANGE' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
                              )}>
                                 {tx.type === 'EXCHANGE' ? <Recycle size={18} /> : <Gift size={18} />}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors tracking-tight">{tx.title}</p>
                                 <p className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-tight font-sans">{tx.id} • {tx.date}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-6">
                           <div className="flex items-center gap-2">
                              <span className={cn("text-sm font-bold font-display tracking-tight", tx.points > 0 ? "text-emerald-600" : "text-slate-800")}>
                                 {tx.points > 0 ? '+' : ''}{tx.points} poin
                              </span>
                           </div>
                        </td>
                        <td className="p-6">
                           <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-700">{tx.weight ? `${tx.weight}kg` : '1 unit'}</span>
                              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{tx.category}</span>
                           </div>
                        </td>
                        <td className="p-6">
                           <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                 <User size={14} />
                              </div>
                              <div>
                                 <p className="text-xs font-bold text-slate-700 tracking-tight">{tx.partner}</p>
                                 <p className="text-[10px] font-bold text-emerald-600">{tx.staff || 'Depo Terverifikasi'}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-6">
                           <div className={cn(
                             "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest whitespace-nowrap",
                             config.color
                           )}>
                              <StatusIcon size={10} strokeWidth={3} />
                              {config.label}
                           </div>
                        </td>
                        <td className="p-6 text-right">
                           <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                              <MoreVertical size={18} />
                           </button>
                        </td>
                     </motion.tr>
                   );
                 })}
              </tbody>
           </table>
           
           {filteredData.length === 0 && (
             <div className="py-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-4">
                   <History size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Tidak ada transaksi ditemukan</h3>
                <p className="text-slate-500 text-sm">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
             </div>
           )}
        </div>

        {/* Receipt Helper */}
        <div className="bg-slate-900 rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between gap-10 text-white relative overflow-hidden">
           <div className="relative z-10 space-y-6">
              <h3 className="text-3xl font-bold leading-tight font-display tracking-tight">Butuh laporan audit <br /> profesional?</h3>
              <p className="text-slate-400 font-medium max-w-sm text-sm font-sans">
                 Unduh laporan keberlanjutan bulanan Anda dengan stempel resmi untuk verifikasi pemerintah atau komunitas.
              </p>
              <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xl shadow-emerald-500/20 group">
                 Buat Laporan Terverifikasi <FileText size={20} className="group-hover:scale-110 transition-transform" />
              </button>
           </div>
           
           <div className="relative z-10 w-full md:w-1/3">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/5">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Ringkasan Dampak</span>
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full">Tervalidasi</span>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="opacity-60 font-medium font-sans">Poin Terverifikasi</span>
                       <span className="font-display">12.400</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="opacity-60 font-medium font-sans">Massa daur ulang</span>
                       <span className="font-display">42,5kg</span>
                    </div>
                    <div className="pt-3 border-t border-white/5 flex justify-between items-center text-sm font-bold">
                       <span className="text-emerald-400 font-medium font-sans">Efisiensi Bersih</span>
                       <span className="text-emerald-400 font-display">+12% thn lalu</span>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        </div>
      </div>
    </DashboardLayout>
  );
}
