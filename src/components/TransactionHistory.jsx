import { useState, useEffect } from 'react';
import api from '../services/api';

const TransactionHistory = () => {
    const [filter, setFilter] = useState('today');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/transactions?range=${filter}`);
            setTransactions(response.data.data.data);
        } catch (err) {
            console.error("Gagal mengambil data transaksi", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [filter]); 

    return (
        <div className="mt-12 bg-white border-gray-800 rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">
                    Transactions
                </h3>
                
                {/* Filter Buttons */}
                <div className="flex bg-gray-100 p-2 rounded-xl">
                    {['today', 'weekly', 'monthly'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-4 py-1.5 rounded-lg text-xs md:font-black uppercase transition-all ${
                                filter === item 
                                ? 'bg-pink-400 text-white shadow-sm' 
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {item === 'today' ? 'Today' : item === 'weekly' ? 'Week' : 'Month'}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Transaksi */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-center md:font-bold text-gray-400 animate-pulse">Loading transactions...</p>
                ) : transactions.length > 0 ? (
                    transactions.map((trx) => (
                        <div key={trx.id} className="flex justify-between items-center p-4 border-2 border-gray-100 rounded-2xl hover:border-pink-200 transition-colors">
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                <div className={`p-2 rounded-lg ${trx.type === 'transfer' ? 'bg-red-100' : 'bg-soft-green'}`}>
                                    {trx.type === 'transfer' ? '💸' : '💰'}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-gray-800 capitalize line-clamp-2 leading-tight">{trx.description || trx.type}</p>
                                    <p className="text-xs text-gray-400 font-bold">{trx.date}</p>
                                </div>
                            </div>
                            <p className={`font-black pl-2 flex-shrink-0 ${trx.type === 'transfer' ? 'text-red-500' : 'text-green-500'}`}>
                                {trx.type === 'transfer' ? '-' : '+'}{trx.amount_formatted}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400 font-bold italic">No transactions found for this period.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionHistory;