import React, { useState } from 'react';
import { AdminNavbar } from '../../components/AdminNavbar';

export const AdminDashboard: React.FC = () => {
    const [isEmpty, setIsEmpty] = useState(false);

    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen selection:bg-[#81ecff] selection:text-[#003840] overflow-hidden">
            <AdminNavbar />

            <main className="ml-64 pt-24 px-12 pb-12 min-h-screen">
                <header className="mb-12">
                    <h1 className="text-4xl font-headline font-black tracking-tight text-white mb-2">Dashboard</h1>
                    <p className="text-[#adaaaa] font-light text-lg">Welcome back, Professor</p>
                </header>

                {/* Bento Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="p-6 rounded-xl bg-[#1a1919] hover:bg-[#201f1f] transition-all group border border-[#484847]/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-[#81ecff]/10 rounded-lg text-[#81ecff]">
                                <span className="material-symbols-outlined">groups</span>
                            </div>
                        </div>
                        <p className="text-[#adaaaa] text-sm font-medium mb-1">Total Groups</p>
                        <h3 className="text-3xl font-headline font-bold">{isEmpty ? '0' : '12'}</h3>
                        {isEmpty && (
                            <div className="text-xs text-[#adaaaa]/60 flex items-center gap-1 mt-2">
                                <span className="material-symbols-outlined text-xs">trending_flat</span>
                                Waiting for initialization
                            </div>
                        )}
                    </div>
                    
                    <div className="p-6 rounded-xl bg-[#1a1919] hover:bg-[#201f1f] transition-all group border border-[#484847]/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-[#81ecff]/10 rounded-lg text-[#81ecff]">
                                <span className="material-symbols-outlined">assignment</span>
                            </div>
                        </div>
                        <p className="text-[#adaaaa] text-sm font-medium mb-1">Total Assignments</p>
                        <h3 className="text-3xl font-headline font-bold">{isEmpty ? '0' : '48'}</h3>
                        {isEmpty && (
                            <div className="text-xs text-[#adaaaa]/60 flex items-center gap-1 mt-2">
                                <span className="material-symbols-outlined text-xs">trending_flat</span>
                                No data available
                            </div>
                        )}
                    </div>

                    <div className="p-6 rounded-xl bg-[#1a1919] hover:bg-[#201f1f] transition-all group border border-[#484847]/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-[#81f3e5]/10 rounded-lg text-[#81f3e5]">
                                <span className="material-symbols-outlined">task_alt</span>
                            </div>
                        </div>
                        <p className="text-[#adaaaa] text-sm font-medium mb-1">Submitted Count</p>
                        <h3 className="text-3xl font-headline font-bold">{isEmpty ? '0' : '32'}</h3>
                        {isEmpty && (
                            <div className="text-xs text-[#adaaaa]/60 flex items-center gap-1 mt-2">
                                <span className="material-symbols-outlined text-xs">trending_flat</span>
                                Queue cleared
                            </div>
                        )}
                    </div>

                    <div className="p-6 rounded-xl bg-[#1a1919] hover:bg-[#201f1f] transition-all group border border-[#484847]/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-[#ff716c]/10 rounded-lg text-[#ff716c]">
                                <span className="material-symbols-outlined">pending_actions</span>
                            </div>
                        </div>
                        <p className="text-[#adaaaa] text-sm font-medium mb-1">Pending Count</p>
                        <h3 className="text-3xl font-headline font-bold">{isEmpty ? '0' : '16'}</h3>
                        {isEmpty && (
                            <div className="text-xs text-[#adaaaa]/60 flex items-center gap-1 mt-2">
                                <span className="material-symbols-outlined text-xs">trending_flat</span>
                                Queue cleared
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-12 gap-8 items-start">
                    <section className="col-span-12 lg:col-span-8 bg-[#131313] rounded-xl overflow-hidden border border-[#484847]/5">
                        <div className="p-8 flex justify-between items-center border-b border-[#484847]/10">
                            <div>
                                <h2 className="text-xl font-headline font-bold text-white">Group Performance</h2>
                                <p className="text-sm text-[#adaaaa] mt-1">Academic track metrics for current semester</p>
                            </div>
                        </div>
                        
                        {isEmpty ? (
                            <div className="relative min-h-[400px] flex flex-col items-center justify-center p-12 text-center">
                                <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                                    <svg height="100%" viewBox="0 0 400 400" width="100%">
                                        <circle cx="200" cy="200" fill="none" r="150" stroke="#81ecff" strokeDasharray="10 5" strokeWidth="1"></circle>
                                        <rect fill="none" height="200" stroke="#81ecff" strokeWidth="0.5" width="200" x="100" y="100"></rect>
                                    </svg>
                                </div>
                                <div className="relative z-10">
                                    <div className="w-24 h-24 bg-[#262626] rounded-full flex items-center justify-center mb-6 mx-auto border border-[#484847]/20">
                                        <span className="material-symbols-outlined text-4xl text-[#adaaaa]/30">group_off</span>
                                    </div>
                                    <h3 className="text-2xl font-headline font-bold mb-2">No groups yet</h3>
                                    <p className="text-[#adaaaa] max-w-sm mx-auto">Establish your first course and assign students to collaborative groups to begin tracking metrics.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#201f1f]/30">
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest">Group Name</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-center">Submitted</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-center">Total</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-center">Pending</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#484847]/10">
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-5 font-medium">Neural Networks A</td>
                                            <td className="px-8 py-5 text-center font-mono">14</td>
                                            <td className="px-8 py-5 text-center font-mono text-[#adaaaa]">16</td>
                                            <td className="px-8 py-5 text-center font-mono text-[#ff716c]">2</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-5 font-medium">Quantum Comp Lab</td>
                                            <td className="px-8 py-5 text-center font-mono">08</td>
                                            <td className="px-8 py-5 text-center font-mono text-[#adaaaa]">12</td>
                                            <td className="px-8 py-5 text-center font-mono text-[#ff716c]">4</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-5 font-medium">Data Ethics Sem</td>
                                            <td className="px-8 py-5 text-center font-mono">10</td>
                                            <td className="px-8 py-5 text-center font-mono text-[#adaaaa]">10</td>
                                            <td className="px-8 py-5 text-center font-mono text-[#81f3e5]">0</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-5 font-medium">Arch Linux Kernels</td>
                                            <td className="px-8 py-5 text-center font-mono">12</td>
                                            <td className="px-8 py-5 text-center font-mono text-[#adaaaa]">15</td>
                                            <td className="px-8 py-5 text-center font-mono text-[#ff716c]">3</td>
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
