import { useEffect, useRef } from 'react';

const ProfileDropdown = ({ user, isOpen, setIsOpen, onLogout }) => {
    const modalRef = useRef(null);

    // Menutup modal jika klik di area luar (overlay)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && event.target === modalRef.current) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Mencegah scroll di background saat modal buka
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    return (
        /* OVERLAY: Menutupi seluruh layar, blur, dan gelap transparan */
        <div 
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300"
        >
            {/* KOTAK MODAL*/}
            <div 
                className="w-full max-w-sm bg-white rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            >
                {/* Header User */}
                <div className="p-8 bg-soft-yellow flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="w-20 h-20 bg-white border-2 border-yellow-500 rounded-full flex items-center justify-center text-3xl mb-4">
                        👤
                    </div>
                    <p className="font-black text-2xl text-gray-800 truncate w-full leading-none mb-2">
                        {user?.username}
                    </p>
                    <p className="text-sm text-gray-500 font-bold truncate w-full">
                        {user?.email}
                    </p>
                </div>
                
                {/* Action Menu */}
                <div className="p-4 space-y-2">
                    <button className="w-full text-left px-6 py-4 text-md font-black text-gray-700 hover:bg-soft-yellow rounded-2xl transition-all active:translate-y-1 active:shadow-none flex items-center gap-4">
                        <span className="text-xl">🖼️</span> My Profile
                    </button>
                    
                    <button 
                        onClick={onLogout}
                        className="w-full text-left px-6 py-4 text-md font-black text-red-500 hover:bg-red-50 rounded-2xl transition-all flex items-center gap-4"
                    >
                        <span className="text-xl">🚪</span> Sign Out
                    </button>

                    {/* Tombol Close Tambahan */}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-full py-3 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-800 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileDropdown;