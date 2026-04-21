import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../../components/AdminNavbar';
import axiosInstance from '../../api/axios';
import type { Group } from '../../types';

export const AdminGroups: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get('/api/groups');
            setGroups(response.data.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to load groups');
            console.error('Groups error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this group? This action cannot be undone.')) return;

        try {
            setError(null);
            await axiosInstance.delete(`/api/groups/${id}`);
            await fetchGroups();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to delete group');
        }
    };

    const isEmpty = !loading && groups.length === 0;

    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen selection:bg-[#81ecff] selection:text-[#003840] overflow-hidden">
            <AdminNavbar />

            <main className="ml-64 pt-24 px-12 pb-12 min-h-screen flex flex-col">
                <header className="mb-12 relative flex items-center justify-center min-h-[48px]">
                    <h1 className="text-4xl font-headline font-black tracking-tight text-white uppercase">Groups</h1>
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
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10 w-48 text-center">Created</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10 w-32 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#484847]/10">
                                            {groups.map((group) => (
                                                <tr key={group._id!} className="hover:bg-white/5 transition-colors group">
                                                    <td className="px-8 py-5 font-medium">{group.name}</td>
                                                    <td className="px-8 py-5 text-[#adaaaa]">{group.owner.name}</td>
                                                    <td className="px-8 py-5 text-center text-[#adaaaa]">{group.members?.length || 0} members</td>
                                                    <td className="px-8 py-5 text-center text-[#adaaaa]">
                                                        {new Date((group as any).createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <button
                                                            onClick={() => handleDelete(group._id!)}
                                                            className="px-4 py-2 text-xs font-bold text-[#ff716c] hover:bg-[#ff716c]/10 border border-[#ff716c]/20 rounded transition-colors uppercase tracking-wider opacity-0 group-hover:opacity-100"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
};
