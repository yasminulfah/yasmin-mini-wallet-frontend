import { useState } from 'react';
import api from '../services/api';

const TransferForm = ({ onTransactionSuccess }) => {
    const [recipientUsername, setRecipientUsername] = useState('');
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/transfer', { receiver_username: recipientUsername, amount });
            alert('Transfer Successful!');
            setRecipientUsername('');
            setAmount('');
            onTransactionSuccess();
        } catch (err) {
            alert(err.response?.data?.message || 'Transfer Failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">🚀 Send Money</h3>
            <form onSubmit={handleTransfer} className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Enter Username"
                    className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-pink-400 outline-none"
                    value={recipientUsername}
                    onChange={(e) => setRecipientUsername(e.target.value)}
                    required
                />
                <input 
                    type="number" 
                    placeholder="Amount (IDR)"
                    className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-pink-400 outline-none no-spinner"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button disabled={isSubmitting} className="w-full py-2 bg-pink-400 text-sm text-white font-bold rounded-xl">
                    {isSubmitting ? 'Processing...' : 'CONFIRM TRANSFER'}
                </button>
            </form>
        </div>
    );
};

export default TransferForm;