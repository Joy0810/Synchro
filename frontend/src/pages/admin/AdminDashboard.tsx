import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../../components/AdminNavbar';
import axiosInstance from '../../api/axios';
import type { AnalyticsOverview } from '../../types';

export const AdminDashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [overview, setOverview] = useState<AnalyticsOverview | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            const overviewRes = await axiosInstance.get('/api/analytics/overview');
            setOverview(overviewRes.data.data);
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
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
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

                            <div className="p-6 rounded-xl bg-[#1a1919] hover:bg-[#201f1f] transition-all group border border-[#484847]/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-[#a78bfa]/10 rounded-lg text-[#a78bfa]">
                                        <span className="material-symbols-outlined">menu_book</span>
                                    </div>
                                </div>
                                <p className="text-[#adaaaa] text-sm font-medium mb-1">Total Courses</p>
                                <h3 className="text-3xl font-headline font-bold">{overview?.total_courses || 0}</h3>
                                {isEmpty && (
                                    <div className="text-xs text-[#adaaaa]/60 flex items-center gap-1 mt-2">
                                        <span className="material-symbols-outlined text-xs">trending_flat</span>
                                        Courses pending
                                    </div>
                                )}
                            </div>
                        </div>

                    </>
                )}
            </main>
        </div>
    );
};
