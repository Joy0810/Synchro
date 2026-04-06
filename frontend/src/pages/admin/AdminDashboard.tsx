import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../../components/AdminNavbar';
import axiosInstance from '../../api/axios';
import type { AnalyticsOverview, GroupAnalytics } from '../../types';

export const AdminDashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
    const [groupAnalytics, setGroupAnalytics] = useState<GroupAnalytics[]>([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [overviewRes, groupsRes] = await Promise.all([
                axiosInstance.get('/api/analytics/overview'),
                axiosInstance.get('/api/analytics/groups')
            ]);

            setOverview(overviewRes.data.data);
            setGroupAnalytics(groupsRes.data.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to load dashboard data');
            console.error('Dashboard error:', err);
        } finally {
            setLoading(false);
        }
    };

    const isEmpty = !loading && overview && overview.total_groups === 0;

    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen selection:bg-[#81ecff] selection:text-[#003840] overflow-hidden">
            <AdminNavbar />

            <main className="ml-64 pt-24 px-12 pb-12 min-h-screen">
                <header className="mb-12">
                    <h1 className="text-4xl font-headline font-black tracking-tight text-white mb-2">Dashboard</h1>
                    <p className="text-[#adaaaa] font-light text-lg">Welcome back, Professor</p>
                </header>

                {error && (
                    <div className="mb-6 p-4 bg-[#ff716c]/10 border border-[#ff716c]/20 rounded-lg">
                        <p className="text-[#ff716c] text-sm">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#81ecff]"></div>
                    </div>
                ) : (
                    <>
                        {/* Bento Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                            <div className="p-6 rounded-xl bg-[#1a1919] hover:bg-[#201f1f] transition-all group border border-[#484847]/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-[#81ecff]/10 rounded-lg text-[#81ecff]">
                                        <span className="material-symbols-outlined">groups</span>
                                    </div>
                                </div>
                                <p className="text-[#adaaaa] text-sm font-medium mb-1">Total Groups</p>
                                <h3 className="text-3xl font-headline font-bold">{overview?.total_groups || 0}</h3>
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
                                <h3 className="text-3xl font-headline font-bold">{overview?.total_assignments || 0}</h3>
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
                                <h3 className="text-3xl font-headline font-bold">{overview?.submitted_count || 0}</h3>
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
                                <h3 className="text-3xl font-headline font-bold">{overview?.pending_count || 0}</h3>
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
                                                {groupAnalytics.map((group) => (
                                                    <tr key={group.id} className="hover:bg-white/5 transition-colors">
                                                        <td className="px-8 py-5 font-medium">{group.name}</td>
                                                        <td className="px-8 py-5 text-center font-mono">{group.submitted_count}</td>
                                                        <td className="px-8 py-5 text-center font-mono text-[#adaaaa]">{group.total_assignments}</td>
                                                        <td className={`px-8 py-5 text-center font-mono ${group.pending_count === 0 ? 'text-[#81f3e5]' : 'text-[#ff716c]'}`}>
                                                            {group.pending_count}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </section>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};
