import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Recycle, Mail, Lock, Phone, User, MapPin, ArrowLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { addNotification } = useNotifications();
  
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Form states
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        addNotification('success', 'Login Berhasil', 'Selamat datang kembali di Greenpay!');
      } else {
        if (formData.password.length < 8) {
          addNotification('error', 'Registrasi Gagal', 'Kata sandi minimal 8 karakter.');
          setIsLoading(false);
          return;
        }
        await register(formData);
        addNotification('success', 'Akun Berhasil Dibuat', 'Selamat bergabung di gerakan hijau Pontianak!');
      }
      navigate('/app/dashboard');
    } catch (error) {
      addNotification('error', 'Autentikasi Gagal', 'Silakan periksa kembali kredensial Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side: Visual/Motivation */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        
        <div className="relative z-10 flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center text-white shadow-xl">
            <Recycle size={22} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-display">Green<span className="text-emerald-500">pay</span></span>
        </div>

        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white leading-tight mb-8 tracking-tight font-display"
          >
            Memperdayakan <br />
            <span className="text-emerald-500 underline decoration-2 underline-offset-8">Generasi Hijau</span> <br />
            Kota Pontianak.
          </motion.h2>
          <div className="flex gap-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex-1">
              <p className="text-4xl font-bold text-white mb-1 font-display tracking-tight">15rb+</p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Pengguna Terverifikasi</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex-1">
              <p className="text-4xl font-bold text-white mb-1 font-display tracking-tight">42t</p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Sampah Terdaur Ulang</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          Didukung oleh Pontianak Digital Sustainability Hub
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 lg:left-12 flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke Beranda
        </button>

        <motion.div 
          key={isLogin ? 'login' : 'register'}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12 text-center lg:text-left">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 mx-auto lg:mx-0 border border-slate-100 shadow-sm transition-transform hover:scale-105 duration-300">
               <User size={32} />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-3 tracking-tight font-display">
              {isLogin ? 'Selamat Datang!' : 'Mulai Sekarang'}
            </h1>
            <p className="text-slate-400 font-medium leading-relaxed text-sm">
              {isLogin 
                ? 'Masuk untuk mengakses portal hadiah dan pantau dampak lingkunganmu.' 
                : 'Buat akun untuk mulai menukarkan sampah dan dapatkan poin sembako.'
              }
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nama Lengkap</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      name="name"
                      type="text" 
                      placeholder="Masukkan nama" 
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-bold text-sm" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nomor HP</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      name="phone"
                      type="tel" 
                      placeholder="08..." 
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-bold text-sm" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Alamat Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  name="email"
                  type="email" 
                  placeholder="nama@email.com" 
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-bold text-sm" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Kata Sandi</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-bold text-sm" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Alamat Lengkap (Kota Pontianak)</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    name="address"
                    type="text" 
                    placeholder="Jalan, Kecamatan, Kelurahan" 
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-bold text-sm" 
                    value={formData.address}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-[11px] font-bold text-emerald-600 hover:underline tracking-tight">Lupa kata sandi?</button>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-95"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Masuk Sekarang' : 'Daftar Akun'} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm font-medium">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 font-bold hover:underline"
            >
              {isLogin ? 'Daftar Gratis' : 'Masuk'}
            </button>
          </p>

          <p className="mt-12 text-center text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] px-8">
            Data Anda dienkripsi dengan standar keamanan perbankan
          </p>
        </motion.div>
      </div>
    </div>
  );
}
