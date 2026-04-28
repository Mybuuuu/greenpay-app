import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Play, 
  Leaf, 
  Recycle, 
  Droplets, 
  CheckCircle2, 
  ChevronRight, 
  Search,
  Sparkles,
  ArrowRight,
  Award
} from 'lucide-react';
import { cn } from '../lib/utils';

const courses = [
  { id: 1, title: 'Dasar Pemilahan Sampah: Standar Pontianak', duration: '12 mnt', level: 'Pemula', pts: 50, img: '🗑️' },
  { id: 2, title: 'Identifikasi & Pembersihan Plastik', duration: '8 mnt', level: 'Menengah', pts: 30, img: '🧴' },
  { id: 3, title: 'Mengapa Daur Ulang Penting di Pusat Kota', duration: '15 mnt', level: 'Pemula', pts: 60, img: '🌆' },
  { id: 4, title: 'Pengomposan Lanjut untuk Keluarga', duration: '20 mnt', level: 'Ahli', pts: 100, img: '🌱' },
];

const categoryColors = {
  Pemula: 'bg-emerald-50 text-emerald-600',
  Menengah: 'bg-amber-50 text-amber-600',
  Ahli: 'bg-rose-50 text-rose-600',
};

export default function Education() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        {/* Hero Section */}
        <div className="relative bg-slate-900 rounded-[2.5rem] p-10 lg:p-16 overflow-hidden flex flex-col lg:flex-row items-center gap-10 shadow-2xl">
           <div className="relative z-10 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
                <Sparkles size={14} /> KURIKULUM BARU TERSEDIA
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-display tracking-tight">Kuasai Seni <span className="text-emerald-500">Keberlanjutan</span></h1>
              <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">
                 Pelajari cara memilah sampah dengan benar, maksimalkan poin Anda, dan pimpin gerakan lingkungan di Kota Pontianak.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                 <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20">
                    Jelajahi Akademi <ArrowRight size={20} />
                 </button>
                 <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <Award size={24} className="text-emerald-400" />
                    <div className="text-left">
                       <p className="text-white text-sm font-bold tracking-tight">Belajar Sambil Dapat Poin</p>
                       <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Bonus poin per modul</p>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="relative lg:w-1/3 flex justify-center">
              <div className="w-56 h-56 emerald-gradient rounded-[2.5rem] -rotate-6 flex items-center justify-center p-8 relative shadow-2xl shadow-emerald-500/20">
                 <BookOpen size={70} className="text-white relative z-10" />
                 <div className="absolute inset-0 bg-black/10 rounded-[2.5rem]" />
              </div>
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-8 h-8 emerald-gradient rounded-lg flex items-center justify-center text-white">
                   <Play size={16} fill="currentColor" />
                </div>
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">SESI LANGSUNG</p>
                   <p className="text-xs font-bold text-slate-800">Plastik Campuran B-2</p>
                </div>
              </motion.div>
           </div>
           
           <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-100 w-full md:w-auto overflow-x-auto scrollbar-hide shadow-inner">
              {['Semua Panduan', 'Tips Cepat', 'Video Pembelajaran', 'Pemkot', 'Sertifikasi'].map((tab, idx) => (
                <button key={tab} className={cn(
                  "px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                  idx === 0 ? "bg-white text-emerald-600 shadow-sm border border-slate-100" : "text-slate-400 hover:text-emerald-600"
                )}>
                   {tab}
                </button>
              ))}
           </div>
           <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Cari materi..." className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10" />
           </div>
        </div>

        {/* Featured Video / Daily Tip */}
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 tracking-tight font-display">
                 <Play size={24} className="text-emerald-500" /> Belajar Terus
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                 {courses.map((course) => (
                   <div key={course.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col">
                      <div className="aspect-video bg-slate-50 flex items-center justify-center relative">
                         <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{course.img}</span>
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-slate-900/40 transition-all flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl shadow-emerald-500/20">
                               <Play size={20} fill="currentColor" />
                            </div>
                         </div>
                         <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[9px] font-bold uppercase tracking-widest">
                            {course.duration}
                         </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                         <div className="flex gap-2 mb-4">
                            <span className={cn("px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm border border-slate-100", categoryColors[course.level as keyof typeof categoryColors])}>
                               {course.level}
                            </span>
                            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-emerald-100">
                               +{course.pts} GP
                            </span>
                         </div>
                         <h4 className="text-lg font-bold text-slate-800 mb-6 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug tracking-tight">
                            {course.title}
                         </h4>
                         <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                            <div className="flex -space-x-2">
                               {[1, 2, 3].map(i => (
                                 <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="user" />
                                 </div>
                               ))}
                               <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[7px] font-bold text-slate-400">+12rb</div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">Daftar sekarang</span>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 tracking-tight font-display">
                 <Leaf size={24} className="text-emerald-500" /> Panduan Memilah
              </h3>
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
                 <div className="space-y-4">
                    {[
                      { icon: '🥛', title: 'Bilas Plastik', desc: 'Sisa makanan dapat mencemari seluruh tumpukan sampah.' },
                      { icon: '📦', title: 'Pipihkan Kardus', desc: 'Menghemat ruang dan membuat transportasi 40% lebih efisien.' },
                      { icon: '🥫', title: 'Label Tetap Ada', desc: 'Tidak perlu melepas label dari kaleng logam.' },
                    ].map((tip, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                         <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{tip.icon}</div>
                         <div>
                            <h5 className="font-bold text-slate-800 mb-0.5 group-hover:text-emerald-700 transition-colors">{tip.title}</h5>
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{tip.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full py-4 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-emerald-100 transition-all flex items-center justify-center gap-2">
                    Infografis Lengkap <ChevronRight size={16} />
                 </button>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                 <div className="relative z-10">
                    <p className="text-emerald-400 font-bold uppercase text-[9px] tracking-widest mb-4">Dampak Komunitas</p>
                    <h4 className="text-2xl font-bold mb-6 leading-tight tracking-tight font-display">Bersama, kita mengurangi 12.400kg minggu lalu!</h4>
                    <div className="flex flex-col gap-3">
                       <div className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                          <CheckCircle2 size={18} className="text-emerald-400" />
                          <span className="text-[11px] font-bold text-slate-300">128 kelompok warga aktif</span>
                       </div>
                       <div className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                          <CheckCircle2 size={18} className="text-emerald-400" />
                          <span className="text-[11px] font-bold text-slate-300">45 mitra baru terverifikasi</span>
                       </div>
                    </div>
                 </div>
                 <Leaf size={140} className="absolute -bottom-10 -right-10 text-emerald-500 opacity-10 -rotate-12 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
