import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit3, Trash2, LogOut, ArrowLeft, Upload, X } from 'lucide-react';

export default function AdminHotels() {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [currentHotel, setCurrentHotel] = useState<any>({ name: '', description: '', image: '', whatsappMessage: '' });
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/hotels`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setHotels(data.hotels);
            });
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this hotel?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/hotels/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setHotels(hotels.filter(h => h._id !== id));
            }
        } catch (err) {
            console.error(err);
            alert('Failed to delete');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingImage(true);
        const fd = new FormData();
        fd.append('image', file);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/media/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });
            const data = await res.json();
            if (data.success && data.url) {
                const url = data.url.startsWith('http') ? data.url : `${import.meta.env.VITE_API_URL.replace('/api', '')}${data.url}`;
                setCurrentHotel((prev: any) => ({ ...prev, image: url }));
            } else {
                alert(data.message || 'Upload failed.');
            }
        } catch {
            alert('Upload failed. Check backend connection.');
        } finally {
            setUploadingImage(false);
            e.target.value = '';
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const isNew = !currentHotel._id;
            const url = isNew 
                ? `${import.meta.env.VITE_API_URL}/hotels` 
                : `${import.meta.env.VITE_API_URL}/hotels/${currentHotel._id}`;
            const method = isNew ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(currentHotel)
            });
            const data = await res.json();
            if (data.success) {
                if (isNew) {
                    setHotels([data.hotel, ...hotels]);
                } else {
                    setHotels(hotels.map(h => h._id === data.hotel._id ? data.hotel : h));
                }
                setIsEditing(false);
                setCurrentHotel({ name: '', description: '', image: '', whatsappMessage: '' });
            } else {
                alert(data.message || 'Failed to save hotel');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to save hotel');
        }
    };

    return (
        <div className="min-h-screen bg-[#1A120B] text-slate-100 p-8 pt-16">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10 relative">
                    <div>
                        <Link to="/admin" className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-1 hover:text-white transition-colors">
                            <ArrowLeft size={14} /> Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold text-white">Manage Hotels</h1>
                    </div>
                </div>

                {isEditing ? (
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {currentHotel._id ? 'Edit Hotel' : 'Add New Hotel'}
                        </h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Hotel Name</label>
                                <input 
                                    required 
                                    className="w-full bg-[#1A120B] border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white outline-none" 
                                    value={currentHotel.name} 
                                    onChange={e => setCurrentHotel({...currentHotel, name: e.target.value})} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Description</label>
                                <textarea 
                                    required 
                                    rows={3}
                                    className="w-full bg-[#1A120B] border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white outline-none" 
                                    value={currentHotel.description} 
                                    onChange={e => setCurrentHotel({...currentHotel, description: e.target.value})} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Hotel Image</label>
                                <div className="flex items-start gap-4">
                                    <label className="cursor-pointer shrink-0">
                                        <div className={`w-32 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-colors overflow-hidden ${currentHotel.image ? 'border-primary/50' : 'border-white/15 hover:border-white/30'}`}>
                                            {currentHotel.image ? (
                                                <img src={currentHotel.image} alt="Hotel" className="w-full h-full object-cover" />
                                            ) : (
                                                <>
                                                    <Upload size={20} className="text-slate-500" />
                                                    <span className="text-slate-500 text-xs text-center leading-tight px-1">Upload Image</span>
                                                </>
                                            )}
                                        </div>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                                    </label>

                                    <div className="flex-1 space-y-2">
                                        <p className="text-slate-500 text-xs">Recommended: <strong className="text-slate-300">800×600px</strong> · Max 5MB · JPG/PNG/WebP</p>
                                        {uploadingImage && <p className="text-primary text-xs animate-pulse">Uploading…</p>}
                                        <input 
                                            type="url"
                                            className="w-full bg-[#1A120B] border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white outline-none text-sm placeholder:text-slate-600 transition-colors" 
                                            value={currentHotel.image || ''} 
                                            placeholder="Or paste image URL (e.g., https://example.com/img.jpg)"
                                            onChange={e => setCurrentHotel({...currentHotel, image: e.target.value})} 
                                        />
                                        {currentHotel.image && (
                                            <button type="button" onClick={() => setCurrentHotel({...currentHotel, image: ''})} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 mt-2">
                                                <X size={12} /> Remove Image
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">WhatsApp Message Template (optional)</label>
                                <input 
                                    className="w-full bg-[#1A120B] border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white outline-none" 
                                    value={currentHotel.whatsappMessage || ''} 
                                    placeholder={`Hi! I am interested in booking ${currentHotel.name || 'this hotel'}.`}
                                    onChange={e => setCurrentHotel({...currentHotel, whatsappMessage: e.target.value})} 
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold">
                                    Save Hotel
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">All Hotels</h2>
                            <button
                                onClick={() => {
                                    setCurrentHotel({ name: '', description: '', image: '', whatsappMessage: '' });
                                    setIsEditing(true);
                                }}
                                className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-widest uppercase transition-all shadow-xl active:scale-95 flex items-center gap-2"
                            >
                                <PlusCircle size={18} /> Add Hotel
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                                        <th className="pb-3 px-4 w-16">Image</th>
                                        <th className="pb-3 px-4">Name</th>
                                        <th className="pb-3 px-4 w-1/3">Description</th>
                                        <th className="pb-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hotels.map(hotel => (
                                        <tr key={hotel._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            <td className="py-2 px-4">
                                                <img src={hotel.image} alt={hotel.name} className="w-12 h-12 object-cover rounded-md" />
                                            </td>
                                            <td className="py-4 px-4 font-semibold text-white">{hotel.name}</td>
                                            <td className="py-4 px-4 text-sm text-slate-300 truncate max-w-[200px]" title={hotel.description}>
                                                {hotel.description}
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => {
                                                            setCurrentHotel(hotel);
                                                            setIsEditing(true);
                                                        }}
                                                        className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(hotel._id)}
                                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-colors border border-red-500/20"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {hotels.length === 0 && (
                                <div className="text-center py-12 text-slate-400 text-sm">
                                    No hotels found. Click the button above to add one.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
