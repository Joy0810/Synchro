import React, { useState } from 'react';
import { AdminNavbar } from '../../components/AdminNavbar';

export const AdminAssignments: React.FC = () => {
    const [isEmpty, setIsEmpty] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [assignType, setAssignType] = useState('ALL');

    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen selection:bg-[#81ecff] selection:text-[#003840] overflow-hidden">
            <AdminNavbar />

            <main className="ml-64 pt-24 px-12 pb-12 min-h-screen flex flex-col">
                <header className="mb-12 relative flex items-center justify-center min-h-[48px]">
                    <h1 className="text-4xl font-headline font-black tracking-tight text-white uppercase">Assignments</h1>
                    <button onClick={() => setIsCreateModalOpen(true)} className="absolute right-0 top-1/2 -translate-y-1/2 px-6 py-3 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-xl shadow-[#81ecff]/10 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Create Assignment
                    </button>
                </header>

                {/* Main Content Area */}
                <div className="flex-1 w-full flex flex-col">
                    <section className="flex-1 w-full bg-[#131313] rounded-xl overflow-hidden border border-[#484847]/5 flex flex-col">
                        <div className="p-8 flex justify-between items-center border-b border-[#484847]/10">
                            <div>
                                <h2 className="text-xl font-headline font-bold text-white">Assignment Directory</h2>
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
                                        <span className="material-symbols-outlined text-4xl text-[#adaaaa]/30">assignment</span>
                                    </div>
                                    <h3 className="text-2xl font-headline font-bold mb-2">No assignments yet.</h3>
                                    <p className="text-[#adaaaa] max-w-sm mx-auto">Create one to get started.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#201f1f]/30">
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Title</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-center border-b border-[#484847]/10 w-48">Due Date</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-center border-b border-[#484847]/10 w-48">Assigned To</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-center border-b border-[#484847]/10 w-32">Submissions</th>
                                            <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-right border-b border-[#484847]/10 w-32">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#484847]/10">
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5 font-medium">Neural Networks Architecture</td>
                                            <td className="px-8 py-5 text-center text-sm text-[#adaaaa]">Oct 24, 2023</td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-[#81ecff]/10 text-[#81ecff] border border-[#81ecff]/20">
                                                    ALL GROUPS
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center font-mono text-[#adaaaa]">14/16</td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-[#adaaaa] hover:text-[#81ecff] transition-colors rounded-full hover:bg-white/10" title="Edit">
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button className="p-2 text-[#adaaaa] hover:text-[#ff716c] transition-colors rounded-full hover:bg-white/10" title="Delete">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5 font-medium">Quantum Lab Report</td>
                                            <td className="px-8 py-5 text-center text-sm text-[#adaaaa]">Oct 26, 2023</td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-[#c084fc]/10 text-[#c084fc] border border-[#c084fc]/20">
                                                    SPECIFIC GROUPS
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center font-mono text-[#adaaaa]">3/7</td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-[#adaaaa] hover:text-[#81ecff] transition-colors rounded-full hover:bg-white/10" title="Edit">
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button className="p-2 text-[#adaaaa] hover:text-[#ff716c] transition-colors rounded-full hover:bg-white/10" title="Delete">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5 font-medium">Data Structures Overview</td>
                                            <td className="px-8 py-5 text-center text-sm text-[#adaaaa]">Oct 30, 2023</td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-[#81ecff]/10 text-[#81ecff] border border-[#81ecff]/20">
                                                    ALL GROUPS
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center font-mono text-[#adaaaa]">8/16</td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-[#adaaaa] hover:text-[#81ecff] transition-colors rounded-full hover:bg-white/10" title="Edit">
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button className="p-2 text-[#adaaaa] hover:text-[#ff716c] transition-colors rounded-full hover:bg-white/10" title="Delete">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-lg p-8 shadow-2xl relative">
                        <h2 className="text-2xl font-headline font-bold text-white mb-6">Create Assignment</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Title *</label>
                                <input type="text" className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" placeholder="e.g. Final Project" required />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Description</label>
                                <textarea className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors resize-none h-24" placeholder="Optional notes..."></textarea>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Due Date *</label>
                                <input type="datetime-local" className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" required />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Drive Link</label>
                                <input type="text" className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" placeholder="https://..." />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Assigned To *</label>
                                <select 
                                    className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors appearance-none"
                                    onChange={(e) => setAssignType(e.target.value)}
                                >
                                    <option value="ALL">All Groups</option>
                                    <option value="SPECIFIC">Specific Groups</option>
                                </select>
                            </div>

                            {assignType === 'SPECIFIC' && (
                                <div>
                                    <label className="block text-sm font-label text-[#adaaaa] mb-1">Select Groups</label>
                                    <input type="text" className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" placeholder="Type group names..." />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-[#484847]/20">
                            <button 
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-sm font-bold text-[#adaaaa] hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => setIsCreateModalOpen(false)}
                                className="px-6 py-2 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#81ecff]/10"
                            >
                                Create Assignment
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
