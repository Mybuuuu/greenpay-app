import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X, Bell } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (type: NotificationType, title: string, message: string) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
  isNotificationCenterOpen: boolean;
  toggleNotificationCenter: () => void;
  closeNotificationCenter: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Selamat Datang!',
      message: 'Mulai tukar sampah Anda dan dapatkan poin Greenpay.',
      timestamp: new Date(),
      read: false
    }
  ]);
  const [toasts, setToasts] = useState<Notification[]>([]);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);

  const toggleNotificationCenter = useCallback(() => {
    setIsNotificationCenterOpen(prev => !prev);
  }, []);

  const closeNotificationCenter = useCallback(() => {
    setIsNotificationCenterOpen(false);
  }, []);

  const addNotification = useCallback((type: NotificationType, title: string, message: string) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    setToasts(prev => [...prev, newNotification]);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newNotification.id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      removeNotification, 
      markAsRead, 
      markAllAsRead,
      unreadCount,
      isNotificationCenterOpen,
      toggleNotificationCenter,
      closeNotificationCenter
    }}>
      {children}
      
      {/* Global Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              className="pointer-events-auto bg-white border border-slate-100 shadow-2xl rounded-2xl p-4 flex gap-4 min-w-[320px] max-w-[400px]"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                toast.type === 'error' ? 'bg-rose-50 text-rose-600' :
                'bg-blue-50 text-blue-600'
              }`}>
                {toast.type === 'success' && <CheckCircle2 size={24} />}
                {toast.type === 'error' && <AlertCircle size={24} />}
                {toast.type === 'info' && <Info size={24} />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate">{toast.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{toast.message}</p>
              </div>
              <button 
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-slate-300 hover:text-slate-500 transition-colors self-start"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Notification Center Panel */}
      <AnimatePresence>
        {isNotificationCenterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm sm:hidden"
              onClick={closeNotificationCenter}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
              className="fixed top-20 right-6 z-[101] w-[calc(100vw-3rem)] max-w-sm bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[80vh] font-sans"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-800 tracking-tight">Notifikasi</h3>
                  <p className="text-xs text-slate-400 font-medium">{unreadCount} pesan belum dibaca</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={markAllAsRead}
                    className="p-2 text-slate-400 hover:text-emerald-500 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors"
                  >
                    <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={closeNotificationCenter}
                    className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 m-4 rounded-[2rem]">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4 shadow-sm">
                      <Bell size={28} />
                    </div>
                    <p className="text-sm font-bold text-slate-800">Belum ada notifikasi</p>
                    <p className="text-xs text-slate-400 mt-1">Kami akan memberitahu Anda saat ada aktivitas baru.</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((msg) => (
                      <div 
                        key={msg.id}
                        onClick={() => markAsRead(msg.id)}
                        className={`p-4 rounded-[1.5rem] flex gap-4 cursor-pointer transition-all ${
                          msg.read ? 'hover:bg-slate-50' : 'bg-emerald-50 hover:bg-emerald-100/50'
                        }`}
                      >
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                           msg.type === 'success' ? 'bg-white text-emerald-500' :
                           msg.type === 'error' ? 'bg-white text-rose-500' :
                           'bg-white text-blue-500'
                         }`}>
                           {msg.type === 'success' && <CheckCircle2 size={20} />}
                           {msg.type === 'error' && <AlertCircle size={20} />}
                           {msg.type === 'info' && <Info size={20} />}
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-start mb-1">
                             <h4 className={`text-sm tracking-tight truncate pr-2 ${
                               msg.read ? 'font-semibold text-slate-700' : 'font-bold text-slate-900'
                             }`}>
                               {msg.title}
                             </h4>
                             <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap mt-0.5">
                               {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </span>
                           </div>
                           <p className={`text-xs line-clamp-2 leading-relaxed ${
                             msg.read ? 'text-slate-500' : 'text-slate-600 font-medium'
                           }`}>
                             {msg.message}
                           </p>
                         </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
