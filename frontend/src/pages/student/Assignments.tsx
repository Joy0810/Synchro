import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export const Assignments: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="ml-64 pt-24 pb-12 px-12 min-h-screen">
        {/* Page Header */}
        <header className="mb-10">
          <h2 className="text-4xl font-bold font-headline tracking-tight text-white mb-1">Assignments</h2>
          <p className="text-zinc-500 font-body">
            {isEmpty ? (
               "Welcome back, Alex Chen. Your academic queue is currently clear."
            ) : (
               <>Welcome back, Alex Chen. You have <span className="text-primary font-semibold">3 items</span> requiring immediate attention.</>
            )}
          </p>
        </header>

        {/* Content Section */}
        <div className="space-y-12 max-w-6xl">
          
          {/* Upcoming Section */}
          <section>
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-500 font-label">UPCOMING ASSIGNMENTS</h3>
                {!isEmpty && <div className="h-px flex-1 mx-4 bg-white/5"></div>}
                {isEmpty && (
                  <button className="text-primary text-xs font-label hover:underline flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">add</span>
                      Create New
                  </button>
                )}
             </div>

             {isEmpty ? (
                <div className="relative group overflow-hidden rounded-xl bg-[#131313] p-12 border border-[#484847]/10 flex flex-col items-center justify-center text-center transition-all hover:border-primary/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-20 h-20 rounded-full bg-[#262626] flex items-center justify-center mb-6 relative">
                        <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"></div>
                        <span className="material-symbols-outlined text-4xl text-primary/40">assignment_late</span>
                    </div>
                    <h4 className="text-xl font-headline font-semibold text-white mb-2">No assignments yet</h4>
                    <p className="text-zinc-400 font-body max-w-xs mx-auto text-sm leading-relaxed">
                        Your architectural plan is clean. Add your first assignment to start architecting your success.
                    </p>
                    <button className="mt-8 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dim text-[#003840] font-bold rounded-full text-sm font-label shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all">
                        Add First Task
                    </button>
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Urgent Task Card */}
                    <div className="bg-[#1a1919] rounded-xl p-6 relative overflow-hidden group hover:bg-[#201f1f] transition-all glass-panel">
                        <div className="flex justify-between items-start mb-6">
                            <span className="bg-[#f94d4e] text-[#110000] px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-wider">URGENT</span>
                            <span className="material-symbols-outlined text-zinc-500 hover:text-primary cursor-pointer transition-colors">more_horiz</span>
                        </div>
                        <h4 className="text-xl font-headline font-semibold text-white mb-2 leading-tight">Advanced Algorithms: Final Proofs</h4>
                        <p className="text-[#adaaaa] text-sm font-body mb-6 line-clamp-2">Complete the complexity analysis for NP-hard reductions and provide formal proofs for the approximation ratios.</p>
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-zinc-400">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                <span className="text-xs font-label">Due: Oct 24, 2023</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#ff716c]">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                <span className="text-xs font-label font-bold">4 hours remaining</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                            <button className="bg-[#262626] p-2 rounded-lg text-zinc-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">drive_file_move</span>
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-primary to-primary-dim text-[#003840] font-bold py-2 rounded-full text-xs font-label uppercase tracking-widest active:scale-95 transition-all shadow-[0_0_15px_rgba(129,236,255,0.2)]">
                                SUBMIT
                            </button>
                        </div>
                    </div>

                    {/* Due Soon Card */}
                    <div className="bg-[#1a1919] rounded-xl p-6 relative group hover:bg-[#201f1f] transition-all glass-panel">
                        <div className="flex justify-between items-start mb-6">
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-wider">DUE SOON</span>
                            <span className="material-symbols-outlined text-zinc-500 hover:text-primary cursor-pointer transition-colors">more_horiz</span>
                        </div>
                        <h4 className="text-xl font-headline font-semibold text-white mb-2 leading-tight">Machine Learning: Neural Net Project</h4>
                        <p className="text-[#adaaaa] text-sm font-body mb-6 line-clamp-2">Implementation of a transformer-based model for text classification. Performance report and weights required.</p>
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-zinc-400">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                <span className="text-xs font-label">Due: Oct 26, 2023</span>
                            </div>
                            <div className="flex items-center gap-3 text-primary">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                <span className="text-xs font-label">2 days remaining</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                            <button className="bg-[#262626] p-2 rounded-lg text-zinc-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">drive_file_move</span>
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-primary to-primary-dim text-[#003840] font-bold py-2 rounded-full text-xs font-label uppercase tracking-widest active:scale-95 transition-all shadow-[0_0_15px_rgba(129,236,255,0.2)]">
                                SUBMIT
                            </button>
                        </div>
                    </div>

                    {/* In Progress Card */}
                    <div className="bg-[#1a1919] rounded-xl p-6 relative group hover:bg-[#201f1f] transition-all glass-panel">
                        <div className="flex justify-between items-start mb-6">
                            <span className="bg-[#006a62] text-[#dcfff9] px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-wider">IN PROGRESS</span>
                            <span className="material-symbols-outlined text-zinc-500 hover:text-primary cursor-pointer transition-colors">more_horiz</span>
                        </div>
                        <h4 className="text-xl font-headline font-semibold text-white mb-2 leading-tight">Distributed Systems: Consensus Lab</h4>
                        <p className="text-[#adaaaa] text-sm font-body mb-6 line-clamp-2">Debugging the Raft consensus algorithm implementation. Current failure in log replication phase.</p>
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-zinc-400">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                <span className="text-xs font-label">Due: Oct 30, 2023</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#81f3e5]">
                                <span className="material-symbols-outlined text-sm">rotate_right</span>
                                <span className="text-xs font-label">Work in progress</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                            <button className="bg-[#262626] p-2 rounded-lg text-zinc-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">drive_file_move</span>
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-primary to-primary-dim text-[#003840] font-bold py-2 rounded-full text-xs font-label uppercase tracking-widest active:scale-95 transition-all shadow-[0_0_15px_rgba(129,236,255,0.2)]">
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </div>
             )}
          </section>

          {/* Table Section */}
          <section>
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-500 font-label uppercase">All Assignments</h3>
                {!isEmpty && (
                    <div className="flex gap-4">
                        <button className="text-xs font-label text-zinc-400 hover:text-white flex items-center gap-1 transition-all">
                            <span className="material-symbols-outlined text-sm">filter_list</span> Filter
                        </button>
                        <button className="text-xs font-label text-zinc-400 hover:text-white flex items-center gap-1 transition-all">
                            <span className="material-symbols-outlined text-sm">sort</span> Sort
                        </button>
                    </div>
                )}
             </div>

             <div className="w-full bg-[#000000] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#201f1f]/50 border-b border-white/5">
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Assignment</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Due Date</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Drive Link</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {isEmpty ? (
                            <tr>
                                <td className="px-6 py-20 text-center" colSpan={5}>
                                    <div className="flex flex-col items-center gap-3">
                                        <span className="material-symbols-outlined text-zinc-700 text-3xl">folder_off</span>
                                        <p className="text-zinc-600 font-body text-sm italic">No assignments to show in this view</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <>
                                <tr className="hover:bg-[#201f1f]/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Quantum Computing 101</p>
                                        <p className="text-xs text-zinc-500">Physics Dept</p>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-zinc-400 font-label">Nov 05, 2023</td>
                                    <td className="px-6 py-5">
                                        <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-wider">UPCOMING</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <a className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors" href="#">
                                            <span className="material-symbols-outlined text-lg">folder</span>
                                            <span className="text-xs">Resources</span>
                                        </a>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button className="text-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#201f1f]/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Database Systems: SQL Optimization</p>
                                        <p className="text-xs text-zinc-500">CS Dept</p>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-zinc-400 font-label">Oct 12, 2023</td>
                                    <td className="px-6 py-5">
                                        <span className="bg-[#006a62]/30 text-[#81f3e5] px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-wider">COMPLETED</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <a className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors" href="#">
                                            <span className="material-symbols-outlined text-lg">folder</span>
                                            <span className="text-xs">Submission</span>
                                        </a>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button className="text-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#201f1f]/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">UX Design Research Paper</p>
                                        <p className="text-xs text-zinc-500">Design Dept</p>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-zinc-400 font-label">Sep 28, 2023</td>
                                    <td className="px-6 py-5">
                                        <span className="bg-[#006a62]/30 text-[#81f3e5] px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-wider">COMPLETED</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <a className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors" href="#">
                                            <span className="material-symbols-outlined text-lg">folder</span>
                                            <span className="text-xs">Final_Report.pdf</span>
                                        </a>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button className="text-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#201f1f]/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Compiler Design: Parser Implementation</p>
                                        <p className="text-xs text-zinc-500">CS Dept</p>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-zinc-400 font-label">Nov 15, 2023</td>
                                    <td className="px-6 py-5">
                                        <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-wider">UPCOMING</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <a className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors" href="#">
                                            <span className="material-symbols-outlined text-lg">folder</span>
                                            <span className="text-xs">Starter_Code</span>
                                        </a>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button className="text-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
             </div>
          </section>
        </div>
      </main>

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
