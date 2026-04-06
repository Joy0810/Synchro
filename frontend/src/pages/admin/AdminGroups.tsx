import React, { useState } from 'react';
import { AdminNavbar } from '../../components/AdminNavbar';

export const AdminGroups: React.FC = () => {
    const [isEmpty, setIsEmpty] = useState(false);

    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen selection:bg-[#81ecff] selection:text-[#003840] overflow-hidden">
            <AdminNavbar />

            <main className="ml-64 pt-24 px-12 pb-12 min-h-screen flex flex-col">
                <header className="mb-12 relative flex items-center justify-center min-h-[48px]">
                    <h1 className="text-4xl font-headline font-black tracking-tight text-white uppercase">Groups</h1>
                </header>

                {/* Main Content Area */}
                <div className="flex-1 w-full flex flex-col">
                    <section className="flex-1 w-full bg-[#131313] rounded-xl overflow-hidden border border-[#484847]/5 flex flex-col">
                        <div className="p-8 flex justify-between items-center border-b border-[#484847]/10">
                            <div>
                                <h2 className="text-xl font-headline font-bold text-white">Active Groups</h2>
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
                                        <span className="material-symbols-outlined text-4xl text-[#adaaaa]/30">group_off</span>
                                    </div>
                                    <h3 className="text-2xl font-headline font-bold mb-2">No groups yet.</h3>
                                    <p className="text-[#adaaaa] max-w-sm mx-auto">Students will appear here once they create groups.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#201f1f]/30">
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Group Name</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Owner Name</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10 w-48 text-center">Members</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10 w-48 text-center">Assignments</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10 w-32 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#484847]/10">
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5 font-medium">Neural Networks A</td>
                                            <td className="px-8 py-5 text-[#adaaaa]">Alexender Pierce</td>
                                            <td className="px-8 py-5 text-center text-[#adaaaa]">4 members</td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded text-xs font-bold tracking-wider bg-[#81ecff]/10 text-[#81ecff] border border-[#81ecff]/20">
                                                    3 assignments
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="px-4 py-2 text-xs font-bold text-[#ff716c] hover:bg-[#ff716c]/10 border border-[#ff716c]/20 rounded transition-colors uppercase tracking-wider opacity-0 group-hover:opacity-100">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5 font-medium">Quantum Comp Lab</td>
                                            <td className="px-8 py-5 text-[#adaaaa]">Sarah Jenkins</td>
                                            <td className="px-8 py-5 text-center text-[#adaaaa]">3 members</td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded text-xs font-bold tracking-wider bg-[#81ecff]/10 text-[#81ecff] border border-[#81ecff]/20">
                                                    1 assignment
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="px-4 py-2 text-xs font-bold text-[#ff716c] hover:bg-[#ff716c]/10 border border-[#ff716c]/20 rounded transition-colors uppercase tracking-wider opacity-0 group-hover:opacity-100">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5 font-medium">Data Ethics Sem</td>
                                            <td className="px-8 py-5 text-[#adaaaa]">Marcus Thorne</td>
                                            <td className="px-8 py-5 text-center text-[#adaaaa]">6 members</td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded text-xs font-bold tracking-wider bg-[#81ecff]/10 text-[#81ecff] border border-[#81ecff]/20">
                                                    5 assignments
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="px-4 py-2 text-xs font-bold text-[#ff716c] hover:bg-[#ff716c]/10 border border-[#ff716c]/20 rounded transition-colors uppercase tracking-wider opacity-0 group-hover:opacity-100">
                                                    Delete
                                                </button>
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
