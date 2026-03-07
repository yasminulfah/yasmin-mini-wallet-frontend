import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ProfileDropdown from '../components/ProfileDropdown';
import TransferForm from '../components/TransferForm';
import TopUpForm from '../components/TopUpForm';
import TransactionHistory from '../components/TransactionHistory';

const Dashboard = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { logout } = useAuth();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(null); 

    const fetchProfile = () => {
        setIsLoading(true);
        api.get('/user/profile')
            .then(res => {
                setUser(res.data.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to get profile:", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number || 0);
    };

    return (
        <div className="p-6 md:p-12 bg-soft-yellow min-h-screen font-sans">
            <div className="max-w-2xl mx-auto">
                
                {/* Header Welcome */}
                <header className="mb-8 flex justify-between items-start">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-xl md:text-4xl font-black text-gray-800 tracking-tight">
                            Halo, <span className="text-pink-500">{user?.username || 'Sobat Cuan'}!</span>
                        </h1>
                        <p className="text-sm md:text-lg">Wellcome to your Mini Wallet!</p>
                    </div>
                    
                    {/* Avatar atau Tombol Logout kecil bisa di sini */}
                    <div className="relative inline-block">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsProfileOpen(!isProfileOpen);
                            }}
                            className="w-12 h-12 border-gray-800 rounded-2xl flex items-center justify-center text-xl hover:scale-105 transition-transform"
                        >
                            👤
                        </button>

                        <ProfileDropdown 
                            user={user} 
                            isOpen={isProfileOpen} 
                            setIsOpen={setIsProfileOpen} 
                            onLogout={logout} 
                        />
                    </div>
                </header>

                {/* Card Saldo */}
                <div className="relative group mb-10">                   
                    <div className="relative p-8 bg-white rounded-3xl shadow-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Your Balance</p>
                                {isLoading ? (
                                    <div className="h-10 w-48 bg-gray-100 animate-pulse rounded-lg"></div>
                                ) : (
                                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                                        {formatRupiah(user?.balance)}
                                    </h2>
                                )}
                            </div>
                            <div>
                                💰
                            </div>
                        </div>
                        
                        {/* Quick Action Buttons */}
                        <div className="mt-8 flex gap-3">
                            <button 
                                onClick={() => setActiveTab(activeTab === 'transfer' ? null : 'transfer')}
                                className={`flex-1 py-1 px-2 rounded-xl text-sm font-bold transition-all shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none 
                                ${activeTab === 'transfer' ? 'bg-pink-600 text-white' : 'bg-pink-400 text-white'}`}
                            >
                                TRANSFER
                            </button>
                            <button 
                                onClick={() => setActiveTab(activeTab === 'topup' ? null : 'topup')}
                                className={`flex-1 py-1 px-2 rounded-xl text-sm font-bold transition-all shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none 
                                ${activeTab === 'topup' ? 'bg-green-300 text-gray-800' : 'bg-soft-green text-gray-800'}`}
                            >
                                TOP UP
                            </button>
                        </div>
                    </div>
                </div>

                {/* Conditional Rendering for Forms */}
                <div className="space-y-6">
                    {activeTab === 'transfer' && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                            <TransferForm onTransactionSuccess={fetchProfile} />
                        </div>
                    )}
                    
                    {activeTab === 'topup' && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                            <TopUpForm onTransactionSuccess={fetchProfile} />
                        </div>
                    )}
                </div>
                <TransactionHistory />
            </div>
        </div>
    );
};

export default Dashboard;