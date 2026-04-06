import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export const MyGroup: React.FC = () => {
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    return (
        <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen">
            <Navbar isLoggedIn={isLoggedIn} />

            <main className="ml-64 pt-24 pb-12 px-10 min-h-screen">
                {/* Header Section */}
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-bold font-headline tracking-tighter text-white mb-2">My Group</h2>
                        <p className="text-on-surface-variant font-body">Welcome back, Alex Chen. Your team's neural network is synchronized.</p>
                    </div>
                </header>

                {isEmpty ? (
                    <div className="flex-1 flex items-center justify-center pb-20 mt-20">
                        <div className="relative w-full max-w-4xl">
                            {/* Decorative Elements */}
                            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
                            <div className="glass-panel bg-[#1a1919]/60 backdrop-blur-[20px] rounded-[2rem] p-12 text-center relative overflow-hidden">
                                {/* Technical Grid Overlay */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
                                {/* Illustration/Icon Area */}
                                <div className="mb-8 relative inline-block">
                                    <div className="w-24 h-24 rounded-3xl bg-[#262626] flex items-center justify-center mx-auto mb-6 relative z-10">
                                        <span className="material-symbols-outlined text-primary text-5xl">groups_2</span>
                                    </div>
                                    <div className="absolute inset-0 bg-primary/20 blur-xl scale-75 opacity-50"></div>
                                </div>
                                <h3 className="text-3xl font-headline font-bold text-on-surface mb-4">You're not in a group yet</h3>
                                <p className="text-on-surface-variant max-w-md mx-auto mb-10 leading-relaxed font-body">
                                    Join your classmates to collaborate on assignments, share research notes, and synchronize your project timelines effortlessly.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <button onClick={() => setIsCreateModalOpen(true)} className="bg-gradient-to-br from-primary to-primary-dim text-[#003840] px-10 py-4 rounded-full font-bold font-headline flex items-center gap-2 hover:shadow-[0_0_20px_rgba(129,236,255,0.4)] transition-all active:scale-95">
                                        <span className="material-symbols-outlined">add_circle</span>
                                        Create Group
                                    </button>
                                    <button className="bg-transparent border border-primary/30 text-primary px-10 py-4 rounded-full font-bold font-headline flex items-center gap-2 hover:bg-primary/5 transition-all active:scale-95">
                                        <span className="material-symbols-outlined">search</span>
                                        Join Group
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-8">
                        {/* Group Info Card */}
                        <section className="col-span-12 lg:col-span-5 space-y-8">
                            <div className="bg-[#1a1919] rounded-xl p-8 border border-white/5 shadow-xl overflow-hidden relative group glass-panel">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                                
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[#003840] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold font-headline tracking-tight text-white">Neural Nexus</h3>
                                            <p className="text-zinc-500 text-sm font-label">Team ID: NN-2024-X</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-[#006a62]/30 text-[#81f3e5] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#81f3e5]/20">Active Project</span>
                                </div>
                                
                                <div className="space-y-6">
                                    {/* Members List */}
                                    <div className="space-y-4">
                                        {/* Member: Alex */}
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-[#131313] border border-white/5 hover:border-primary/20 transition-all group/item">
                                            <div className="flex items-center gap-4">
                                                <img alt="Member Avatar" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv5GhYaaWXDnzpDm_7Khsb9wGUsp-HMk_hAoCVZP7I-DLLJAKI8z5AXRmY4FVIy1hVlJXDZ3weszcLf5Q4v3P69ctTIk5Ondbfy3gvje8BiAR2jqVK0pOxYeF3F9q8cKPMwDoM6xPYeO5ina4YnyOr2Dt36n_RDK1d7oe1SlN6pn-VZqvZ-a8LVGm9D6VGNfiiHlxJC0f7af48zJVaq6Hd9YXL5WIQXCpepGsQtNZ5G8_qn5RLq1Lx5rlEbVSD_CpW6WZwdhDxDu4" />
                                                <div>
                                                    <p className="font-semibold text-white">Alex Chen</p>
                                                    <div className="flex gap-2 mt-1">
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">You</span>
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#006a62]/20 text-[#81f3e5] uppercase">Owner</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-primary/40">verified</span>
                                        </div>
                                        {/* Member: Sarah */}
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-[#131313] border border-white/5 hover:border-primary/20 transition-all group/item">
                                            <div className="flex items-center gap-4">
                                                <img alt="Member Avatar" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr5fLc-ANcBZKCIshRpuxkx9ffjmxrDP0Q-JH4u7TaEwcQhwjzTbbQswVlskq8ZbR3XaY_qrTWMIm8JRBOBg-cLGuXdKQxRF7FV9grzfC_BEbaV1oplyunkHTY85hscRz5h2RCfbT8omdm3yRCllDwRHB5lifH0qGd9UVSvx6fxTF6nI2krZdbgSsrvd4YhEhybq6Dy4CWfzdgnZVS-Hw_17N8ve2tQoWuCpQJyDQ8O36VGLaDlZ6-E4mpB18W7N9-TXoKsbvMclI" />
                                                <div>
                                                    <p className="font-semibold text-white">Sarah Miller</p>
                                                    <p className="text-xs text-zinc-500">UX Researcher</p>
                                                </div>
                                            </div>
                                            <button className="opacity-0 group-hover/item:opacity-100 p-2 rounded-full hover:bg-[#ff716c]/10 text-[#ff716c] transition-all duration-200">
                                                <span className="material-symbols-outlined text-sm">person_remove</span>
                                            </button>
                                        </div>
                                        {/* Member: Jamie */}
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-[#131313] border border-white/5 hover:border-primary/20 transition-all group/item">
                                            <div className="flex items-center gap-4">
                                                <img alt="Member Avatar" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnN1x9ai96DIgnjnf9HfpIJ6UMZ19Ygd-t4A8_n8tMOMUzbBuZs_CWieFhwpxHxzZamaAq1Iq1OOZ6yQ-NgIqOb-oAHBl-iUT00XewUFOwxlaaTN0p3gYcYxZNG1FrNNEi55kihk0h3reErCTpUo-q7MY4BQlnZAFS9MByy2RXlfNCGfzC3Gr1CUlhYd_7o4b77CfvorShkrHuOh58L15QZ_9Qf-NNdcnIChaEZvJQMct4OrMGwbXitlSJCid2NHmvQnGKu5Ojm-Q" />
                                                <div>
                                                    <p className="font-semibold text-white">Jamie Zhao</p>
                                                    <p className="text-xs text-zinc-500">System Architect</p>
                                                </div>
                                            </div>
                                            <button className="opacity-0 group-hover/item:opacity-100 p-2 rounded-full hover:bg-[#ff716c]/10 text-[#ff716c] transition-all duration-200">
                                                <span className="material-symbols-outlined text-sm">person_remove</span>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Add Member Section */}
                                    <div className="pt-6 border-t border-white/5">
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input className="w-full bg-[#262626] border-none border-b-2 border-[#484847] rounded-t-xl rounded-b-none py-3 px-4 text-sm focus:border-primary focus:ring-0 transition-all placeholder:text-zinc-600 outline-none text-white" placeholder="Enter student email..." type="email" />
                                            </div>
                                            <button onClick={() => setIsAddMemberModalOpen(true)} className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all border border-white/10 text-white">
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Assignments Table Section */}
                        <section className="col-span-12 lg:col-span-7">
                            <div className="bg-[#1a1919] rounded-xl border border-white/5 shadow-xl flex flex-col h-full overflow-hidden">
                                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#201f1f]/30">
                                    <h3 className="text-xl font-bold font-headline tracking-tight flex items-center gap-3 text-white">
                                        <span className="material-symbols-outlined text-primary">analytics</span>
                                        Group Assignments
                                    </h3>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg bg-[#000000] text-zinc-500 hover:text-white border border-white/5">
                                            <span className="material-symbols-outlined text-sm">filter_list</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto flex-1">
                                    <table className="w-full border-collapse">
                                        <thead className="bg-[#131313]/50">
                                            <tr className="text-left">
                                                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] font-label">Assignment</th>
                                                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] font-label">Due Date</th>
                                                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] font-label">Status</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] font-label text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {/* Row 1 */}
                                            <tr className="hover:bg-[#201f1f]/40 transition-colors group/row">
                                                <td className="px-8 py-6">
                                                    <div>
                                                        <p className="font-semibold text-white mb-1">Architecture Analysis</p>
                                                        <p className="text-xs text-zinc-500">Modernist Structures Study</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center gap-2 text-zinc-300">
                                                        <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                                                        <span className="text-sm">Oct 24, 2024</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className="px-3 py-1 rounded-full bg-[#006a62]/30 text-[#81f3e5] text-[10px] font-bold uppercase tracking-wider border border-[#81f3e5]/20">In-Progress</span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="text-primary hover:text-white transition-colors">
                                                        <span className="material-symbols-outlined">arrow_forward</span>
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* Row 2 */}
                                            <tr className="hover:bg-[#201f1f]/40 transition-colors group/row">
                                                <td className="px-8 py-6">
                                                    <div>
                                                        <p className="font-semibold text-white mb-1">Urban Integration Plan</p>
                                                        <p className="text-xs text-zinc-500">City Center Redevelopment</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center gap-2 text-zinc-300">
                                                        <span className="material-symbols-outlined text-sm text-[#ff716c]">warning</span>
                                                        <span className="text-sm font-medium text-[#ff716c]">Oct 18, 2024</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className="px-3 py-1 rounded-full bg-[#f94d4e]/20 text-[#ff716c] text-[10px] font-bold uppercase tracking-wider border border-[#ff716c]/20">Urgent</span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="text-primary hover:text-white transition-colors">
                                                        <span className="material-symbols-outlined">arrow_forward</span>
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* Row 3 */}
                                            <tr className="hover:bg-[#201f1f]/40 transition-colors group/row">
                                                <td className="px-8 py-6">
                                                    <div>
                                                        <p className="font-semibold text-white mb-1">Material Stress Tests</p>
                                                        <p className="text-xs text-zinc-500">Structural Lab Report</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center gap-2 text-zinc-400">
                                                        <span className="material-symbols-outlined text-sm">event_available</span>
                                                        <span className="text-sm line-through decoration-zinc-600">Oct 12, 2024</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className="px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">Completed</span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="text-primary hover:text-white transition-colors">
                                                        <span className="material-symbols-outlined">check_circle</span>
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* Row 4 */}
                                            <tr className="hover:bg-[#201f1f]/40 transition-colors group/row">
                                                <td className="px-8 py-6">
                                                    <div>
                                                        <p className="font-semibold text-white mb-1">Sustainable Energy Audit</p>
                                                        <p className="text-xs text-zinc-500">Green Building Index</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center gap-2 text-zinc-300">
                                                        <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                                                        <span className="text-sm">Nov 02, 2024</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className="px-3 py-1 rounded-full bg-[#262626] text-zinc-400 text-[10px] font-bold uppercase tracking-wider border border-[#484847]/30">Upcoming</span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="text-primary hover:text-white transition-colors">
                                                        <span className="material-symbols-outlined">arrow_forward</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                    </div>
                )}
            </main>
                        
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
                        <h2 className="text-2xl font-headline font-bold text-white mb-6">Create Group</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Group Name *</label>
                                <input type="text" className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" placeholder="e.g. Neural Nexus" required />
                            </div>
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
                                Create Group
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddMemberModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
                        <h2 className="text-2xl font-headline font-bold text-white mb-6">Add Member</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Email address *</label>
                                <input type="email" className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" placeholder="student@university.edu" required />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-[#484847]/20">
                            <button 
                                onClick={() => setIsAddMemberModalOpen(false)}
                                className="text-sm font-bold text-[#adaaaa] hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => setIsAddMemberModalOpen(false)}
                                className="px-6 py-2 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#81ecff]/10"
                            >
                                Add Member
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Local Debug Controls */}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 bg-[#131313] p-4 rounded-lg border border-[#484847]/30 shadow-xl opacity-50 hover:opacity-100 transition-opacity">
                <p className="text-xs font-label text-zinc-500 uppercase tracking-widest text-center mb-1">Debug Controls</p>
                <button 
                onClick={() => setIsEmpty(!isEmpty)}
                className="bg-[#262626] hover:bg-[#484847] text-white text-xs px-4 py-2 rounded transition-colors"
                >
                Toggle Empty State: {isEmpty ? 'ON' : 'OFF'}
                </button>
                <button 
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="bg-[#262626] hover:bg-[#484847] text-white text-xs px-4 py-2 rounded transition-colors"
                >
                Toggle Login: {isLoggedIn ? 'ON' : 'OFF'}
                </button>
            </div>
        </div>
    );
};
