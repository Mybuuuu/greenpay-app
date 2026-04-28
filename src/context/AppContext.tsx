import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

interface Transaction {
  id: string;
  type: 'EXCHANGE' | 'REDEMPTION';
  title: string;
  category: string;
  date: string;
  points: number;
  status: 'COMPLETED' | 'VERIFIED' | 'PENDING' | 'REJECTED';
  partner: string;
  weight?: string;
  staff?: string;
}

interface AppContextType {
  points: number;
  transactions: Transaction[];
  addExchange: (data: any) => Promise<void>;
  addRedemption: (product: any) => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateProfile } = useAuth();
  const { addNotification } = useNotifications();
  const [points, setPoints] = useState(user?.points || 1240);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TX-9012448', type: 'EXCHANGE', title: 'Paket Botol Plastik', category: 'Plastik', date: '24 Okt 2023, 11:20 WIB', points: 120, status: 'VERIFIED', partner: 'Bank Sampah Pontianak Utara', weight: '4.2kg', staff: 'Ahmad S.' },
    { id: 'TX-9012447', type: 'EXCHANGE', title: 'Kardus Bekas Kantor', category: 'Kertas', date: '22 Okt 2023, 09:45 WIB', points: 250, status: 'VERIFIED', partner: 'Depo Pontianak City Mall', weight: '12.5kg', staff: 'Siti K.' },
    { id: 'TX-9012446', type: 'REDEMPTION', title: 'Beras Premium 5kg', category: 'Sembako', date: '20 Okt 2023, 16:15 WIB', points: -480, status: 'COMPLETED', partner: 'Mitra Toko Kelontong #4', staff: 'Budi H.' },
  ]);

  useEffect(() => {
    if (user) {
      setPoints(user.points);
    }
  }, [user]);

  const addExchange = async (data: any) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate estimated points (simple logic)
    const estimatedPoints = Math.round(data.weight * 30); // 30 points per kg
    
    const newTx: Transaction = {
      id: `GP-${Math.floor(1000000 + Math.random() * 9000000)}`,
      type: 'EXCHANGE',
      title: `${data.category} (${data.weight}kg)`,
      category: data.category,
      date: new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB',
      points: estimatedPoints,
      status: 'PENDING',
      partner: 'Kurir Sedang Menuju Lokasi',
      weight: `${data.weight}kg`,
    };

    setTransactions(prev => [newTx, ...prev]);
    setIsLoading(false);
    addNotification('success', 'Berhasil Diajukan', `Penukaran ${data.category} seberat ${data.weight}kg sedang diproses.`);
  };

  const addRedemption = async (product: any) => {
    if (points < product.pts) {
      addNotification('error', 'Poin Tidak Cukup', `Anda butuh ${product.pts - points} poin lagi untuk menukar ${product.name}.`);
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const newPoints = points - product.pts;
    setPoints(newPoints);
    updateProfile({ points: newPoints });

    const newTx: Transaction = {
      id: `RD-${Math.floor(1000000 + Math.random() * 9000000)}`,
      type: 'REDEMPTION',
      title: product.name,
      category: product.category,
      date: new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB',
      points: -product.pts,
      status: 'COMPLETED',
      partner: 'Mitra Toko Terdekat',
      staff: 'Sistem'
    };

    setTransactions(prev => [newTx, ...prev]);
    setIsLoading(false);
    addNotification('success', 'Penukaran Berhasil', `Hadiah ${product.name} berhasil ditukar. Silakan ambil di mitra terdekat.`);
  };

  return (
    <AppContext.Provider value={{ 
      points, 
      transactions, 
      addExchange, 
      addRedemption,
      isLoading 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
