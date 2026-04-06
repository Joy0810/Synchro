import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export const Submissions: React.FC = () => {
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <div className="bg-background text-on-surface font-body min-h-screen selection:bg-primary-container/30 overflow-hidden">
            <Navbar isLoggedIn={isLoggedIn} />

            <main className="ml-64 pt-32 px-12 pb-12 min-h-screen flex flex-col">
                {/* Page Header */}
                <section className="mb-12 flex justify-between items-end">
                    <div className="space-y-1">
                        <h2 className="text-5xl font-headline font-bold tracking-tight text-white glow-text" style={{ textShadow: "0 0 12px rgba(129, 236, 255, 0.4)" }}>Submissions</h2>
                        <p className="text-zinc-400 font-light text-lg">Welcome back, <span className="text-white font-medium">Alex Chen</span></p>
                    </div>
                </section>

                {isEmpty ? (
                    <div className="flex-1 flex flex-col items-center justify-center -mt-16">
                        <div className="relative w-full max-w-2xl flex flex-col items-center text-center">
                            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5">
                                <div className="w-[500px] h-[500px] border border-primary rounded-full animate-pulse"></div>
                                <div className="absolute w-[400px] h-[400px] border border-[#81f3e5] rotate-45"></div>
                                <div className="absolute w-[300px] h-[300px] border border-[#00d4ec] -rotate-12"></div>
                            </div>
                            
                            <div className="w-24 h-24 rounded-full bg-[#1a1919]/60 backdrop-blur-[24px] flex items-center justify-center mb-8 border border-primary/20 shadow-2xl shadow-primary/10">
                                <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>drafts</span>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-3xl font-headline font-medium text-white">No submissions yet</h3>
                                <p className="text-zinc-400 max-w-md mx-auto leading-relaxed border-none">
                                    Your academic ledger is currently a blank slate. Begin by drafting your first assignment or syncing with your course portal to populate your submission history.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <section className="bg-[#1a1919] rounded-xl overflow-hidden shadow-2xl border border-white/5">
                        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-[#201f1f]/20">
                            <h3 className="font-headline font-semibold text-xl text-white">Recent Activity</h3>
                            <div className="flex space-x-4">
                                <button className="flex items-center space-x-2 text-xs font-label text-zinc-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">filter_list</span>
                                    <span>Filter</span>
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-body">
                                <thead className="bg-[#1a1919] text-zinc-500 text-xs uppercase tracking-widest font-semibold border-b border-white/5">
                                    <tr>
                                        <th className="px-8 py-5">Assignment</th>
                                        <th className="px-8 py-5">Submitted Date</th>
                                        <th className="px-8 py-5">Submission Link</th>
                                        <th className="px-8 py-5">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">Neural Networks Final Report</span>
                                                <span className="text-xs text-zinc-500">Deep Learning Lab</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-zinc-400 text-sm">
                                            Oct 24, 2023 <span className="text-[10px] ml-2 px-1 bg-[#262626] rounded">14:22</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <a className="inline-flex items-center space-x-2 text-primary hover:text-[#00e3fd] transition-colors group/link" href="#">
                                                <span className="material-symbols-outlined text-sm">attachment</span>
                                                <span className="text-sm font-medium border-b border-primary/20 group-hover/link:border-[#00e3fd]">nn_report_v2.pdf</span>
                                            </a>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full bg-[#81f3e5]/10 text-[#81f3e5] text-[10px] font-bold tracking-widest uppercase border border-[#81f3e5]/20 flex items-center w-fit">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#81f3e5] mr-2"></span>
                                                Submitted
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">Data Structures Implementation</span>
                                                <span className="text-xs text-zinc-500">CS201 Core</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-zinc-400 text-sm">
                                            Oct 22, 2023 <span className="text-[10px] ml-2 px-1 bg-[#262626] rounded">09:15</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <a className="inline-flex items-center space-x-2 text-primary hover:text-[#00e3fd] transition-colors group/link" href="#">
                                                <span className="material-symbols-outlined text-sm">code</span>
                                                <span className="text-sm font-medium border-b border-primary/20 group-hover/link:border-[#00e3fd]">main_cpp.zip</span>
                                            </a>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full bg-[#81f3e5]/10 text-[#81f3e5] text-[10px] font-bold tracking-widest uppercase border border-[#81f3e5]/20 flex items-center w-fit">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#81f3e5] mr-2"></span>
                                                Submitted
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">Quantum Computing Abstract</span>
                                                <span className="text-xs text-zinc-500">Advanced Physics Elective</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-zinc-400 text-sm">
                                            Oct 20, 2023 <span className="text-[10px] ml-2 px-1 bg-[#262626] rounded">18:40</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <a className="inline-flex items-center space-x-2 text-primary hover:text-[#00e3fd] transition-colors group/link" href="#">
                                                <span className="material-symbols-outlined text-sm">description</span>
                                                <span className="text-sm font-medium border-b border-primary/20 group-hover/link:border-[#00e3fd]">quantum_abs.docx</span>
                                            </a>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full bg-[#81f3e5]/10 text-[#81f3e5] text-[10px] font-bold tracking-widest uppercase border border-[#81f3e5]/20 flex items-center w-fit">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#81f3e5] mr-2"></span>
                                                Submitted
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">Distributed Systems Project</span>
                                                <span className="text-xs text-zinc-500">Cloud Architecture</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-zinc-400 text-sm">
                                            Oct 18, 2023 <span className="text-[10px] ml-2 px-1 bg-[#262626] rounded">23:58</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <a className="inline-flex items-center space-x-2 text-primary hover:text-[#00e3fd] transition-colors group/link" href="#">
                                                <span className="material-symbols-outlined text-sm">link</span>
                                                <span className="text-sm font-medium border-b border-primary/20 group-hover/link:border-[#00e3fd]">github.com/alexchen/dist-sys</span>
                                            </a>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full bg-[#81f3e5]/10 text-[#81f3e5] text-[10px] font-bold tracking-widest uppercase border border-[#81f3e5]/20 flex items-center w-fit">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#81f3e5] mr-2"></span>
                                                Submitted
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">Ethical AI Framework</span>
                                                <span className="text-xs text-zinc-500">Humanities Seminar</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-zinc-400 text-sm">
                                            Oct 15, 2023 <span className="text-[10px] ml-2 px-1 bg-[#262626] rounded">12:00</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <a className="inline-flex items-center space-x-2 text-primary hover:text-[#00e3fd] transition-colors group/link" href="#">
                                                <span className="material-symbols-outlined text-sm">attachment</span>
                                                <span className="text-sm font-medium border-b border-primary/20 group-hover/link:border-[#00e3fd]">ethics_framework.pdf</span>
                                            </a>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full bg-[#81f3e5]/10 text-[#81f3e5] text-[10px] font-bold tracking-widest uppercase border border-[#81f3e5]/20 flex items-center w-fit">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#81f3e5] mr-2"></span>
                                                Submitted
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </main>

            {/* Background Decoration */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-50 overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#81f3e5]/5 rounded-full blur-[100px]"></div>
            </div>

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
