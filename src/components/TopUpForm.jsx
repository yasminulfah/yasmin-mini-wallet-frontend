import { useState } from 'react';
import api from '../services/api';

const TopUpForm = ({ onTransactionSuccess }) => {
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTopUp = async (e) => {
        e.preventDefault();
        
        // Validasi minimal 10.000
        if (amount < 10000) {
            alert('Minimal top up adalah IDR 10.000');
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post('/topup', { amount });
            alert('Top Up Successful!');
            setAmount(''); // Reset input
            onTransactionSuccess(); // Refresh saldo di dashboard
        } catch (err) {
            alert('Top Up Failed, please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">💎 Top Up Balance</h3>
            
            <form onSubmit={handleTopUp} className="space-y-4">
                {/* Pilihan Nominal Cepat */}
                <div>
                    <label className="text-xs font-black uppercase text-gray-400 mb-2 block">Quick Select</label>
                    <select 
                        className="w-full p-3 rounded-xl border-2 border-gray-800 focus:border-soft-yellow outline-none font-bold bg-gray-50"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    >
                        <option value="">-- Choose Amount --</option>
                        <option value="20000">IDR 20.000</option>
                        <option value="50000">IDR 50.000</option>
                        <option value="100000">IDR 100.000</option>
                        <option value="200000">IDR 200.000</option>
                    </select>
                </div>

                {/* Input Manual */}
                <div>
                    <label className="text-xs font-black uppercase text-gray-400 mb-2 block">Or Enter Manually</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">IDR</span>
                        <input 
                            type="number" 
                            placeholder="0"
                            className="w-full p-3 pl-14 rounded-xl border-2 border-gray-800 focus:border-soft-yellow outline-none font-bold"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="10000"
                            required
                        />
                    </div>
                    <p className="text-[10px] font-bold text-pink-500 mt-2 italic">* Minimum top up amount is IDR 10.000</p>
                </div>

                <button 
                    disabled={isSubmitting} 
                    className={`w-full py-2 bg-soft-green tex-sm text-gray-800 font-bold rounded-xl active:translate-y-1 active:shadow-none transition-all ${isSubmitting ? 'opacity-50' : 'hover:bg-yellow-300'}`}
                >
                    {isSubmitting ? 'Loading...' : 'TOP UP NOW'}
                </button>
            </form>
        </div>
    );
};

export default TopUpForm;