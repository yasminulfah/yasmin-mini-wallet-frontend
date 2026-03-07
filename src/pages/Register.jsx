import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await api.post('/register', formData);

            alert("Register success! Please Sign in ✨");
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data.errors) {
                const firstError = Object.values(err.response.data.errors)[0][0];
                setError(firstError);
            } else {
                setError("Gagal mendaftar. Pastikan data benar.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-soft-yellow flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-soft-pink">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-black text-pink-400">Create Account</h1>
                    <p className="text-gray-500 mt-2">Start organize your digital wallet now</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-3 mb-6 rounded-lg text-sm font-bold animate-pulse">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
                        <input 
                            type="text" required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-soft-yellow outline-none transition-all"
                            placeholder="yasmin17"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-soft-yellow outline-none transition-all"
                            placeholder="yasmin@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-soft-yellow outline-none transition-all pr-12"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-soft-pink transition-colors"
                            >
                                {showPassword ? "🙈" : "👁️"} 
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Password Confirmation</label>
                        <div className="relative">
                            <input 
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-soft-yellow outline-none transition-all pr-12"
                                placeholder="••••••••"
                                value={formData.password_confirmation}
                                onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-soft-pink transition-colors"
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer ${
                            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-400'
                        }`}
                    >
                        {isLoading ? 'Registering...' : 'Register Now!'}
                    </button>
                </form>
                
                <p className="text-center mt-6 text-sm text-gray-400">
                    Have an account? <Link to="/" className="text-soft-pink font-bold hover:underline">Sign in here!</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;