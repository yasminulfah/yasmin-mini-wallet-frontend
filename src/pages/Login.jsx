import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    
    const { login: performLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true); 

        try {
            const response = await api.post('/login', { login: identifier, password });
            
            performLogin(response.data.data.user, response.data.data.token);

            navigate('/dashboard');
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Email or password is wrong. Try again.");
            }
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="min-h-screen bg-soft-yellow flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-b-8 border-soft-pink">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-pink-400">Wellcome!</h1>
                    <p className="text-gray-500 mt-2">Sign in to Yasmin Mini Wallet</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded shadow-sm animate-bounce">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email or Username</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-soft-pink outline-none transition-all"
                            placeholder="yasmin@example.com"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-soft-pink outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer ${
                            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-400'
                        }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                Processing...
                            </span>
                        ) : 'Sign In'}
                    </button>
                </form>
                
                <p className="text-center mt-8 text-sm text-gray-400">
                    Don't have an account? <Link to="/register" className="text-soft-pink font-bold cursor-pointer hover:underline">Register here!</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;