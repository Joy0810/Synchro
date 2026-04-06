import React, { useState } from 'react';
import { AdminNavbar } from '../../components/AdminNavbar';

export const AdminSubmissions: React.FC = () => {
    const [isEmpty, setIsEmpty] = useState(false);

    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen selection:bg-[#81ecff] selection:text-[#003840] overflow-hidden">
            <AdminNavbar />

            <main className="ml-64 pt-24 px-12 pb-12 min-h-screen flex flex-col">
                <header className="mb-12 relative flex items-center justify-center min-h-[48px]">
                    <h1 className="text-4xl font-headline font-black tracking-tight text-white uppercase">Submissions</h1>
                </header>

                {/* Main Content Area */}
                <div className="flex-1 w-full flex flex-col">
                    <section className="flex-1 w-full bg-[#131313] rounded-xl overflow-hidden border border-[#484847]/5 flex flex-col">
                        <div className="p-8 flex justify-between items-center border-b border-[#484847]/10">
                            <div>
                                <h2 className="text-xl font-headline font-bold text-white">Recent Submissions</h2>
                            </div>
                        </div>
                        
                        {isEmpty ? (
                            <div className="flex-1 relative flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                                <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                                    <svg height="100%" viewBox="0 0 400 400" width="100%">
                                        <circle cx="200" cy="200" fill="none" r="150" stroke="#81ecff" strokeDasharray="10 5" strokeWidth="1"></circle>
                                        <rect fill="none" height="200" stroke="#81ecff" strokeWidth="0.5" width="200" x="100" y="100"></rect>
                                    </svg>
                                </div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-24 h-24 bg-[#262626] rounded-full flex items-center justify-center mb-6 mx-auto border border-[#484847]/20">
                                        <span className="material-symbols-outlined text-4xl text-[#adaaaa]/30">outbox</span>
                                    </div>
                                    <h3 className="text-2xl font-headline font-bold mb-2">No submissions yet.</h3>
                                    <p className="text-[#adaaaa] max-w-sm mx-auto">Submitted assignments will appear here.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#201f1f]/30">
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Assignment Title</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Group Name</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Confirmed By</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Confirmed At</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10 w-32 text-right">Link</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#484847]/10">
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5 font-medium">Neural Networks Architecture</td>
                                            <td className="px-8 py-5 text-[#adaaaa]">Group Alpha</td>
                                            <td className="px-8 py-5 text-[#81ecff]">Alexender Pierce</td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm">Oct 24, 2023</span>
                                                    <span className="text-xs text-[#adaaaa]">14:30 EST</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <a href="#" className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-[#81ecff] hover:bg-[#81ecff]/10 rounded transition-colors uppercase tracking-wider">
                                                    VIEW <span className="material-symbols-outlined text-xs">north_east</span>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5 font-medium">Quantum Lab Report</td>
                                            <td className="px-8 py-5 text-[#adaaaa]">Singularity Group</td>
                                            <td className="px-8 py-5 text-[#81ecff]">Sarah Jenkins</td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm">Oct 25, 2023</span>
                                                    <span className="text-xs text-[#adaaaa]">09:15 EST</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <a href="#" className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-[#81ecff] hover:bg-[#81ecff]/10 rounded transition-colors uppercase tracking-wider">
                                                    VIEW <span className="material-symbols-outlined text-xs">north_east</span>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5 font-medium">Data Ethics Sem</td>
                                            <td className="px-8 py-5 text-[#adaaaa]">Ethics Committee</td>
                                            <td className="px-8 py-5 text-[#81ecff]">Marcus Thorne</td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm">Oct 26, 2023</span>
                                                    <span className="text-xs text-[#adaaaa]">16:45 EST</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <a href="#" className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-[#81ecff] hover:bg-[#81ecff]/10 rounded transition-colors uppercase tracking-wider">
                                                    VIEW <span className="material-symbols-outlined text-xs">north_east</span>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            {/* Local Debug Controls */}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 bg-[#131313] p-4 rounded-lg border border-[#484847]/30 shadow-xl opacity-50 hover:opacity-100 transition-opacity">
                <p className="text-xs font-label text-[#adaaaa] uppercase tracking-widest text-center mb-1">Debug Controls</p>
                <button 
                    onClick={() => setIsEmpty(!isEmpty)}
                    className="bg-[#262626] hover:bg-[#484847] text-white text-xs px-4 py-2 rounded transition-colors"
                >
                    Toggle Empty State: {isEmpty ? 'ON' : 'OFF'}
                </button>
            </div>
        </div>
    );
};
