import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useSEO({ title: 'Admin Login', noIndex: true });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                navigate('/admin');
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch {
            setError('Cannot reach the server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1A120B] text-slate-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-2xl relative">
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-bl-xl rounded-tr-xl">
                    Restricted Area
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-3xl text-primary">admin_panel_settings</span>
                    <h1 className="text-3xl font-bold text-white">Admin Login</h1>
                </div>
                <p className="text-slate-400 text-sm mb-6">Manage website content from the dashboard.</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">error</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#1A120B] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-primary outline-none transition-colors"
                            placeholder="admin@soilnsoul.in"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#1A120B] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-primary outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white py-3 mt-2 rounded-xl font-bold text-sm tracking-widest uppercase transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading
                            ? <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Verifying...</>
                            : <><LogIn size={16} /> Access Dashboard</>
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}
