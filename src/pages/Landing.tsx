import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Recycle, ArrowRight, ShieldCheck, TrendingUp, Users, CheckCircle2, ChevronRight, Menu, X, Leaf, Smartphone, Gift, Award } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Landing() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Recycle size={22} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-800 font-display">Green<span className="text-emerald-600">pay</span></span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-colors">Cara Kerja</a>
              <a href="#benefits" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-colors">Manfaat</a>
              <a href="#impact" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-colors">Dampak</a>
              <button 
                onClick={() => navigate('/auth')}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-md shadow-emerald-500/10"
              >
                Masuk
              </button>
            </div>

            <button className="md:hidden text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-brand-200/30 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-6 border border-emerald-100 shadow-sm">
                <Leaf size={14} className="text-emerald-500" />
                Platform Daur Ulang #1 di Pontianak
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-800 leading-[1.1] mb-8 tracking-tight font-display">
                Tukar Sampah Jadi <span className="text-emerald-600">Kebutuhan Pokok</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-lg">
                Kurangi sampah di Kota Pontianak, kumpulkan poin dari sampah terpilah, dan tukarkan dengan kebutuhan harian seperti beras, minyak, gula, telur, dan lainnya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/auth')}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 group"
                >
                  Mulai Tukar Sampah <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="#how-it-works"
                  className="px-8 py-4 bg-white text-slate-700 border border-slate-100 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Lihat Cara Kerja
                </a>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-50 overflow-hidden shadow-sm">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-800 tracking-tight">Bergabung dengan 2.500+ Warga</p>
                   <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">Membantu Pontianak tetap hijau</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/40 overflow-hidden">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50/80 rounded-3xl p-6 flex flex-col justify-between h-48 border border-emerald-100 shadow-sm transition-transform hover:scale-[1.02] duration-300">
                    <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-50">
                      <Gift size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Poin Terkumpul</p>
                      <p className="text-3xl font-bold text-slate-800 font-display">1.240</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-3xl p-6 flex flex-col justify-between h-48 border border-slate-100 shadow-sm transition-transform hover:scale-[1.02] duration-300">
                    <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 shadow-sm border border-slate-50">
                      <Recycle size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sampah Didaur Ulang</p>
                      <p className="text-3xl font-bold text-slate-800 font-display">42<span className="text-base font-bold ml-1 text-slate-400">kg</span></p>
                    </div>
                  </div>
                  <div className="col-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden h-64 border border-slate-800 shadow-xl group">
                    <div className="relative z-10">
                      <p className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest mb-2">Pelacak Dampak</p>
                      <h3 className="text-2xl font-bold mb-4 font-display tracking-tight leading-snug">Kamu menyelamatkan <br /> 12 pohon bulan ini!</h3>
                      <div className="w-full bg-white/10 rounded-full h-2.5 mb-2 overflow-hidden">
                        <div className="emerald-gradient h-full rounded-full transition-all duration-1000" style={{ width: '75%' }} />
                      </div>
                      <p className="text-xs text-white/50 font-medium">Target Keberlanjutan: 75% tercapai</p>
                    </div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-700" />
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 z-30"
              >
                <div className="w-8 h-8 emerald-gradient rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <Award size={18} />
                </div>
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">HADIAH BARU</p>
                   <p className="text-xs font-bold text-slate-800">Beras 5kg Ditukar!</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="impact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Sampah Terkumpul', value: '1.240', unit: 'ton', icon: Recycle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Warga Aktif', value: '15.400', unit: '+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Poin Disalurkan', value: '2,5', unit: 'M', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Hadiah Ditukar', value: '8.900', unit: '+', icon: Gift, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className={cn("w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:shadow-lg duration-500", stat.bg, stat.color)}>
                   <stat.icon size={36} strokeWidth={1.5} />
                </div>
                <div className="flex items-baseline justify-center">
                   <span className="text-4xl font-bold text-slate-800 tracking-tight font-display">{stat.value}</span>
                   <span className="text-xl font-bold ml-1 text-slate-300">{stat.unit}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-4">Proses Kami</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-display tracking-tight">Langkah Mudah Memberi Dampak</h3>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
               Ekosistem digital kami memudahkan siapa saja di Pontianak untuk berpartisipasi dalam ekonomi sirkular dan mendapatkan imbalan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-slate-200 -translate-y-1/2 z-0" />
            
            {[
              { step: '01', title: 'Kumpulkan & Pilah', desc: 'Kumpulkan dan pisahkan sampah daur ulang rumah tangga Anda.', icon: Recycle },
              { step: '02', title: 'Ajukan Penukaran', desc: 'Masukkan detail sampah dan lokasi penjemputan di aplikasi.', icon: Smartphone },
              { step: '03', title: 'Verifikasi', desc: 'Mitra kami akan memverifikasi dan mengambil sampah Anda.', icon: ShieldCheck },
              { step: '04', title: 'Dapatkan Poin', desc: 'Terima poin digital secara instan di dompet Greenpay Anda.', icon: TrendingUp },
              { step: '05', title: 'Tukar Sembako', desc: 'Tukarkan poin dengan beras, minyak, gula, dan lainnya.', icon: Gift },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:emerald-gradient group-hover:text-white transition-all duration-500">
                   <item.icon size={26} />
                </div>
                <div className="mb-4">
                   <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">{item.step}</span>
                   <h4 className="text-lg font-bold text-slate-800 mt-1 tracking-tight">{item.title}</h4>
                </div>
                <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
                   {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Verification */}
      <section id="benefits" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-slate-800 mb-8 mt-4 leading-tight tracking-tight font-display">
                Dirancang untuk Transparansi dan <span className="text-emerald-600">Kepercayaan Warga</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Mitra Terverifikasi', desc: 'Kami hanya bekerja sama dengan unit pengumpul sampah terpercaya di seluruh Pontianak.', icon: CheckCircle2 },
                  { title: 'Pelacakan Transparan', desc: 'Setiap gram sampah dan poin yang diberikan dapat dilacak sepenuhnya di portal Anda.', icon: ShieldCheck },
                  { title: 'Pasar Realistis', desc: 'Kebutuhan pokok nyata untuk memenuhi kebutuhan masyarakat secara instan.', icon: Gift },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-emerald-600">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate('/auth')}
                className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-all flex items-center gap-2 shadow-xl shadow-slate-900/10"
              >
                Mulai Gunakan Greenpay <ChevronRight size={20} />
              </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
               <div className="emerald-gradient p-8 rounded-[2.5rem] text-white flex flex-col justify-between h-72 shadow-xl shadow-emerald-500/20">
                  <h4 className="text-xl font-bold tracking-tight">Didukung Pemerintah Kota Pontianak</h4>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <ShieldCheck size={32} />
                  </div>
               </div>
               <div className="bg-slate-50 p-8 rounded-[2.5rem] text-slate-800 flex flex-col justify-between h-72 translate-y-12 border border-slate-100 shadow-sm">
                  <h4 className="text-xl font-bold tracking-tight">128 Bank Sampah Aktif</h4>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md shadow-slate-200/50">
                    <Users size={32} className="text-emerald-600" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-20 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 border-b border-white/5 pb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center text-white">
                  <Recycle size={22} />
                </div>
                <span className="text-2xl font-bold tracking-tight font-display">Green<span className="text-emerald-500">pay</span></span>
              </div>
              <p className="text-slate-400 font-medium max-w-sm mb-8 leading-relaxed">
                Memberdayakan masyarakat Kota Pontianak untuk menyelesaikan masalah sampah melalui imbalan digital dan kebiasaan berkelanjutan.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'Facebook'].map(social => (
                  <div key={social} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center cursor-pointer hover:bg-emerald-600 hover:text-white transition-all">
                    <span className="text-[10px] font-bold uppercase">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-6">Platform</h4>
              <ul className="space-y-4 text-slate-400 font-medium text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Cara Kerja</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Sistem Poin</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Tukar Poin</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Edukasi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-400 font-medium text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Registrasi Mitra</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Hubungi Kami</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">© 2026 Greenpay Pontianak. Hak cipta dilindungi.</p>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Status Sistem: Beroperasi Penuh
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
