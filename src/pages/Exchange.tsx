import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'motion/react';
import { 
  Recycle, 
  MapPin, 
  Calendar, 
  Clock, 
  Upload, 
  Weight, 
  ChevronRight, 
  Info,
  CheckCircle2,
  AlertCircle,
  Leaf
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const categories = [
  { id: 'plastic', name: 'Botol Plastik', icon: '🥤', pts: '20 GP/kg', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: 'paper', name: 'Kertas & Kardus', icon: '📦', pts: '15 GP/kg', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { id: 'aluminum', name: 'Kaleng Aluminium', icon: '🥫', pts: '50 GP/kg', color: 'bg-slate-50 text-slate-600 border-slate-100' },
  { id: 'glass', name: 'Wadah Kaca', icon: '🫙', pts: '10 GP/kg', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
];

export default function Exchange() {
  const navigate = useNavigate();
  const { addExchange } = useApp();
  
  const [selectedCat, setSelectedCat] = React.useState('plastic');
  const [weight, setWeight] = React.useState('');
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    date: '',
    time: '09:00 - 11:00 WIB',
    address: ''
  });

  const estimatedPoints = React.useMemo(() => {
    const w = parseFloat(weight) || 0;
    const cat = categories.find(c => c.id === selectedCat);
    const rate = cat ? parseInt(cat.pts) : 0;
    return w * rate;
  }, [weight, selectedCat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const categoryName = categories.find(c => c.id === selectedCat)?.name || 'Sampah';
    
    await addExchange({
      category: categoryName,
      weight: parseFloat(weight),
      ...formData
    });
    
    setIsSubmitting(false);
    setStep(3);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-20">
        {/* Progress Header */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ring-4 ring-slate-50 z-10",
                step >= s ? "bg-emerald-500 text-white" : "bg-white text-slate-300 border border-slate-200"
              )}>
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
              {s < 3 && (
                <div className="w-16 md:w-24 h-1 bg-slate-200 relative -mx-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: step > s ? '100%' : '0%' }}
                    className="absolute inset-0 bg-emerald-500" 
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
               <h1 className="text-3xl font-black text-slate-800 mb-2">Apa yang ingin Anda tukarkan hari ini?</h1>
               <p className="text-slate-500 font-medium tracking-tight">Pilih kategori dan masukkan estimasi berat sampah Anda.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {categories.map((cat) => (
                 <button
                   key={cat.id}
                   onClick={() => setSelectedCat(cat.id)}
                   className={cn(
                     "relative p-6 rounded-2xl border-2 transition-all text-center group",
                     selectedCat === cat.id 
                      ? "border-emerald-500 bg-emerald-50/30 ring-4 ring-emerald-500/5 shadow-lg shadow-emerald-500/5 scale-105" 
                      : "border-slate-100 bg-white hover:border-slate-200"
                   )}
                 >
                   <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                   <h3 className="font-bold text-slate-800 mb-1">{cat.name}</h3>
                   <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{cat.pts}</p>
                   {selectedCat === cat.id && (
                     <div className="absolute top-4 right-4 text-emerald-500">
                        <CheckCircle2 size={20} fill="currentColor" stroke="white" />
                     </div>
                   )}
                 </button>
               ))}
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Estimasi Berat (kg)</label>
                  <div className="relative">
                     <Weight className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                     <input 
                       type="number" 
                       step="0.1"
                       value={weight}
                       onChange={(e) => setWeight(e.target.value)}
                       placeholder="Masukkan perkiraan berat..."
                       className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-xl text-slate-800 shadow-inner"
                     />
                  </div>
               </div>

               <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-50">
                        <Recycle size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Poin Estimasi</p>
                        <p className="text-2xl font-bold text-emerald-600 font-display">{estimatedPoints || 0} <span className="text-sm font-normal text-slate-400">GP</span></p>
                     </div>
                  </div>
                  <div className="flex flex-col items-end">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dampak Hijau</p>
                     <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                        <Leaf size={14} /> Hemat ~0.2 Pohon
                     </div>
                  </div>
               </div>
               
               <button 
                onClick={() => setStep(2)}
                disabled={!weight || parseFloat(weight) <= 0}
                className="w-full py-4.5 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
               >
                 Jadwalkan Penjemputan <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
               <h1 className="text-3xl font-black text-slate-900 mb-2">Lokasi & Waktu</h1>
               <p className="text-slate-500 font-medium tracking-tight">Kapan dan di mana kami harus mengambil sampah Anda?</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Tanggal</label>
                    <div className="relative">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        name="date"
                        type="date" 
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Waktu</label>
                    <div className="relative">
                      <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <select 
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 appearance-none outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500" 
                        required
                      >
                         <option>09:00 - 11:00 WIB</option>
                         <option>11:00 - 13:00 WIB</option>
                         <option>13:00 - 15:00 WIB</option>
                         <option>15:00 - 17:00 WIB</option>
                      </select>
                    </div>
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Alamat Lengkap</label>
                  <div className="relative">
                     <MapPin className="absolute left-5 top-8 text-slate-400" size={18} />
                     <textarea 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 min-h-[100px]"
                        placeholder="Detail alamat di Kota Pontianak..."
                        required
                     />
                  </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Foto Sampah (Opsional)</label>
                 <div className="w-full h-32 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-emerald-50 transition-colors cursor-pointer group">
                    <Upload size={24} className="text-slate-400 mb-2 group-hover:scale-110 transition-transform group-hover:text-emerald-500" />
                    <p className="text-xs font-bold text-slate-500 group-hover:text-emerald-600">Unggah foto sampah</p>
                    <p className="text-[9px] text-slate-400 uppercase font-black mt-1 tracking-widest">Max 5MB</p>
                 </div>
               </div>

               <div className="bg-amber-50 rounded-2xl p-6 flex gap-4 items-start border border-amber-100 shadow-sm">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Info size={20} />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-amber-900 mb-1">Tips Kebersihan</p>
                    <p className="text-amber-700 leading-relaxed font-medium text-xs">
                       Pastikan sampah Anda sudah dicuci/dibersihkan dari sisa makanan. Sampah yang kotor tidak dapat didaur ulang.
                    </p>
                  </div>
               </div>

               <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
                  >
                    Kembali
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] py-4.5 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 h-[60px]"
                   >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Ajukan Sekarang <CheckCircle2 size={24} /></>
                    )}
                  </button>
               </div>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="w-24 h-24 emerald-gradient rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-emerald-500/20 ring-8 ring-emerald-50 animate-bounce">
               <CheckCircle2 size={48} />
            </div>
            <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Berhasil Diajukan!</h1>
            <p className="text-base text-slate-500 font-medium max-w-md mx-auto leading-relaxed mb-10">
               Kurir kami akan menjemput <span className="text-emerald-600 font-bold">{weight}kg {categories.find(c => c.id === selectedCat)?.name}</span> di lokasi Anda sesuai jadwal.
            </p>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 max-w-sm mx-auto shadow-sm mb-12 text-left relative">
               <div className="absolute top-0 left-0 w-full h-1.5 emerald-gradient" />
               <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Informasi Transaksi</h4>
               <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 uppercase tracking-widest">Estimasi Poin</span>
                    <span className="text-emerald-600 font-black">{estimatedPoints} GP</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 uppercase tracking-widest">ID Pesanan</span>
                    <span className="text-slate-900">GP-{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 uppercase tracking-widest">Status</span>
                    <span className="text-amber-500 italic">Menunggu Kurir</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <button 
                onClick={() => navigate('/app/history')}
                className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-95"
               >
                 Lihat Riwayat
               </button>
               <button 
                onClick={() => { setStep(1); setWeight(''); }}
                className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
               >
                 Tukar Sampah Lagi
               </button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
