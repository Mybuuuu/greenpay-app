import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gift, 
  Search, 
  Filter, 
  ShoppingBag, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Package,
  Award,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

const products = [
  { id: 1, name: 'Beras Premium 5kg', pts: 480, category: 'Kebutuhan Pokok', img: '🌾', stock: 12, rating: 4.8 },
  { id: 2, name: 'Minyak Goreng 1L', pts: 150, category: 'Kebutuhan Pokok', img: '🧴', stock: 45, rating: 4.9 },
  { id: 3, name: 'Gula Pasir 1kg', pts: 100, category: 'Kebutuhan Pokok', img: '🧊', stock: 28, rating: 4.7 },
  { id: 4, name: 'Telur Ayam (10 btr)', pts: 180, category: 'Segar', img: '🥚', stock: 5, rating: 4.5 },
  { id: 5, name: 'Mie Instan (Isi 5)', pts: 120, category: 'Makanan', img: '🍜', stock: 82, rating: 4.6 },
  { id: 6, name: 'Sabun Mandi Alami', pts: 45, category: 'Kebersihan', img: '🧼', stock: 120, rating: 4.9 },
  { id: 7, name: 'Deterjen Premium 800g', pts: 220, category: 'Kebersihan', img: '🫧', stock: 34, rating: 4.4 },
  { id: 8, name: 'Buku Catatan Eco (Daur Ulang)', pts: 95, category: 'Sekolah', img: '📔', stock: 15, rating: 5.0 },
  { id: 9, name: 'Botol Minum Baja', pts: 650, category: 'Keberlanjutan', img: '🫙', stock: 8, rating: 4.9 },
];

const categories = ['Semua', 'Kebutuhan Pokok', 'Segar', 'Makanan', 'Kebersihan', 'Keberlanjutan', 'Sekolah'];

export default function Rewards() {
  const { points, addRedemption } = useApp();
  const [selectedCat, setSelectedCat] = React.useState('Semua');
  const [search, setSearch] = React.useState('');
  const [redeemingId, setRedeemingId] = React.useState<number | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCat === 'Semua' || p.category === selectedCat;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRedeem = async (product: typeof products[0]) => {
    if (points < product.pts) return;
    
    setRedeemingId(product.id);
    await addRedemption({
      title: `Penukaran ${product.name}`,
      points: product.pts
    });
    
    setRedeemingId(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
           <div className="max-w-xl">
              <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight font-display">Pusat Hadiah</h1>
              <p className="text-slate-500 font-medium">Tukarkan poin yang Anda kumpulkan dengan kebutuhan rumah tangga harian dan produk ramah lingkungan.</p>
           </div>
           <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm w-full lg:w-auto relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 emerald-gradient opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Saldo Poin Anda</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-800 font-display tracking-tight">{points.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Poin</span>
                 </div>
              </div>
              <div className="w-14 h-14 emerald-gradient rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                 <Gift size={28} />
              </div>
           </div>
        </div>

        {/* Global Success Notification */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              className="bg-emerald-500 text-white p-4 rounded-2xl flex items-center justify-between shadow-xl shadow-emerald-500/20"
            >
               <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} />
                  <span className="font-bold">Penukaran berhasil! Hadiah Anda sedang disiapkan untuk diambil.</span>
               </div>
               <button onClick={() => setShowSuccess(false)} className="text-white/80 hover:text-white">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                    selectedCat === cat 
                      ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10" 
                      : "bg-white text-slate-500 border-slate-100 hover:border-emerald-500 hover:text-emerald-600"
                  )}
                >
                  {cat}
                </button>
              ))}
           </div>
           <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari hadiah..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
              />
           </div>
        </div>

        {/* Featured Card */}
        <div className="bg-slate-900 rounded-[2rem] p-10 overflow-hidden relative group">
           <div className="relative z-10 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Award size={14} /> Rekomendasi untuk Anda
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight font-display tracking-tight">Paket Pahlawan Lingkungan</h2>
              <p className="text-slate-400 font-medium mb-8 leading-relaxed text-sm font-sans">
                Dapatkan paket keberlanjutan pilihan termasuk Beras 5kg, Minyak Goreng 2L, dan Botol Baja Edisi Terbatas.
              </p>
              <div className="flex items-center gap-6 mb-8">
                 <div className="flex flex-col">
                    <span className="text-white text-3xl font-bold font-display tracking-tight">950</span>
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Poin Dibutuhkan</span>
                 </div>
                 <div className="w-px h-10 bg-white/10" />
                 <div className="flex flex-col">
                    <span className="text-emerald-400 text-3xl font-bold italic font-display">HEMAT 15%</span>
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest text-right">Ekstra poin</span>
                 </div>
              </div>
              <button 
                onClick={() => handleRedeem({ id: 99, name: 'Paket Pahlawan Lingkungan', pts: 950, category: 'Special', img: '📦', stock: 1, rating: 5.0 })}
                disabled={points < 950}
                className="px-10 py-4 bg-emerald-500 text-white rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 duration-200 disabled:opacity-50"
              >
                 Tukar Paket Sekarang
              </button>
           </div>
           
           <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:flex items-center justify-center pointer-events-none p-12">
              <div className="relative w-full h-full bg-emerald-500/5 backdrop-blur-[2px] rounded-3xl border border-white/5 flex items-center justify-center p-12 group-hover:rotate-3 transition-transform duration-700">
                  <div className="text-[140px] opacity-10 filter blur-[4px]">🌿</div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-emerald-500/10 rounded-full scale-75"
                  />
                  <div className="text-8xl filter drop-shadow-2xl">📦</div>
              </div>
           </div>

           <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none" />
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
           {filteredProducts.map((p, i) => {
             const canAfford = points >= p.pts;
             const progress = Math.min(100, (points / p.pts) * 100);
             const isRedeeming = redeemingId === p.id;

             return (
               <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                   "bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group",
                   !canAfford && "opacity-90 grayscale-[0.2]"
                )}
               >
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                       {p.img}
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{p.category}</p>
                       <div className="flex items-center gap-1 justify-end text-emerald-500">
                          <CheckCircle2 size={10} fill="currentColor" className="text-emerald-500" />
                          <span className="text-[10px] font-extrabold text-slate-800">{p.rating}</span>
                       </div>
                    </div>
                 </div>

                 <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-emerald-700 transition-colors tracking-tight">{p.name}</h3>
                 
                 <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-2xl font-bold text-emerald-600 font-display">{p.pts}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Poin</span>
                 </div>

                 <div className="mt-auto space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                          <span>Progress Anda</span>
                          <span className={cn(canAfford ? "text-emerald-500" : "text-slate-400")}>
                            {canAfford ? 'SIAP' : `${Math.round(progress)}%`}
                          </span>
                       </div>
                       <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden border border-slate-100/50">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className={cn("h-full rounded-full transition-colors", canAfford ? "emerald-gradient shadow-sm shadow-emerald-500/20" : "bg-slate-200")} 
                          />
                       </div>
                    </div>

                    <button
                      onClick={() => handleRedeem(p)}
                      disabled={!canAfford || isRedeeming}
                      className={cn(
                        "w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 h-[50px]",
                        canAfford 
                          ? "bg-slate-900 text-white hover:bg-emerald-600 active:scale-[0.98] duration-200" 
                          : "bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100"
                      )}
                    >
                      {isRedeeming ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : canAfford ? (
                        <>Tukar Sekarang <ShoppingBag size={14} /></>
                      ) : (
                        <>Poin Tidak Cukup <AlertCircle size={14} /></>
                      )}
                    </button>
                    
                    <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-tight font-sans">
                      {p.stock} unit tersedia di Depo Pontianak
                    </p>
                 </div>
               </motion.div>
             );
           })}
        </div>

        {/* Partner Info */}
        <div className="bg-slate-50 rounded-[2rem] p-8 lg:p-10 flex flex-col md:flex-row items-center gap-10 border border-slate-200/50 shadow-inner">
           <div className="flex-shrink-0 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-md border border-slate-100 text-emerald-500">
              <Truck size={40} />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Pengiriman & Pengambilan</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6 max-w-2xl text-sm font-sans">
                 Barang yang ditukarkan dapat diambil di unit Bank Sampah Terverifikasi terdekat atau dikirim ke rumah Anda dalam waktu 24 jam (hanya area Kota Pontianak).
              </p>
              <div className="flex flex-wrap gap-3">
                 <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100">
                    <Package size={14} className="text-emerald-500" /> Gratis Ongkir min. 500+ poin
                 </div>
                 <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Kualitas Terverifikasi
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
