import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../api/axios';
import type { Group } from '../../types';

export const MyGroup: React.FC = () => {
    const { user } = useAuth();
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [assignments, setAssignments] = useState<any[]>([]);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    const selectedGroup = groups.length > 0 ? groups[0] : null;

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            setLoading(true);
            setError(null);
            const [groupsRes, assignmentsRes] = await Promise.all([
                axiosInstance.get('/api/groups'),
                axiosInstance.get('/api/assignments')
            ]);
            setGroups(groupsRes.data.data);
            setAssignments(assignmentsRes.data.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to fetch data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateGroup = async () => {
        if (!newGroupName.trim()) return;

        try {
            setActionLoading(true);
            setActionError(null);
            await axiosInstance.post('/api/groups', {
                name: newGroupName.trim()
            });
            setNewGroupName('');
            setIsCreateModalOpen(false);
            await fetchGroups();
        } catch (err: any) {
            setActionError(err.response?.data?.error || 'Failed to create group');
            console.error('Error creating group:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleAddMember = async () => {
        if (!selectedGroup || !newMemberEmail.trim()) return;

        try {
            setActionLoading(true);
            setActionError(null);
            await axiosInstance.post(`/api/groups/${selectedGroup.id}/members`, {
                email: newMemberEmail.trim()
            });
            setNewMemberEmail('');
            setIsAddMemberModalOpen(false);
            await fetchGroups();
        } catch (err: any) {
            setActionError(err.response?.data?.error || 'Failed to add member');
            console.error('Error adding member:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleRemoveMember = async (memberId: string) => {
        if (!selectedGroup) return;

        if (!window.confirm('Are you sure you want to remove this member?')) return;

        try {
            setActionLoading(true);
            setActionError(null);
            await axiosInstance.delete(`/api/groups/${selectedGroup.id}/members/${memberId}`);
            await fetchGroups();
        } catch (err: any) {
            setActionError(err.response?.data?.error || 'Failed to remove member');
            console.error('Error removing member:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteGroup = async () => {
        if (!selectedGroup) return;

        if (!window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) return;

        try {
            setActionLoading(true);
            setActionError(null);
            await axiosInstance.delete(`/api/groups/${selectedGroup.id}`);
            await fetchGroups();
        } catch (err: any) {
            setActionError(err.response?.data?.error || 'Failed to delete group');
            console.error('Error deleting group:', err);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen">
            <Navbar />

            <main className="ml-64 pt-24 pb-12 px-10 min-h-screen">
                {/* Header Section */}
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-bold font-headline tracking-tighter text-white mb-2">My Group</h2>
                        <p className="text-on-surface-variant font-body">Welcome back, {user?.name || 'Student'}. Your team's neural network is synchronized.</p>
                    </div>
                </header>

                {/* Error Message */}
                {(error || actionError) && (
                    <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <p className="text-red-400 text-sm">{error || actionError}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <p className="text-zinc-400 text-sm">Loading your groups...</p>
                        </div>
                    </div>
                ) : groups.length === 0 ? (
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
                                            <h3 className="text-2xl font-bold font-headline tracking-tight text-white">{selectedGroup?.name || 'My Group'}</h3>
                                            <p className="text-zinc-500 text-sm font-label">Team ID: {selectedGroup?.id.substring(0, 8).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-[#006a62]/30 text-[#81f3e5] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#81f3e5]/20">Active Project</span>
                                        {selectedGroup?.owner_id === user?.id && (
                                            <button
                                                onClick={handleDeleteGroup}
                                                disabled={actionLoading}
                                                className="ml-2 p-2 rounded-full hover:bg-red-900/20 text-red-400 transition-all disabled:opacity-50"
                                                title="Delete Group"
                                            >
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Members List */}
                                    <div className="space-y-4">
                                        {selectedGroup?.members?.map((member) => (
                                            <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-[#131313] border border-white/5 hover:border-primary/20 transition-all group/item">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-[#003840] font-bold">
                                                        {member.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white">{member.name}</p>
                                                        <p className="text-xs text-zinc-500">{member.email}</p>
                                                        <div className="flex gap-2 mt-1">
                                                            {member.id === user?.id && (
                                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">You</span>
                                                            )}
                                                            {member.id === selectedGroup.owner_id && (
                                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#006a62]/20 text-[#81f3e5] uppercase">Owner</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                {selectedGroup.owner_id === user?.id && member.id !== user?.id && (
                                                    <button
                                                        onClick={() => handleRemoveMember(member.id)}
                                                        disabled={actionLoading}
                                                        className="opacity-0 group-hover/item:opacity-100 p-2 rounded-full hover:bg-[#ff716c]/10 text-[#ff716c] transition-all duration-200 disabled:opacity-50"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">person_remove</span>
                                                    </button>
                                                )}
                                                {member.id === user?.id && (
                                                    <span className="material-symbols-outlined text-primary/40">verified</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {/* Add Member Section */}
                                    {selectedGroup?.owner_id === user?.id && (
                                        <div className="pt-6 border-t border-white/5">
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <input
                                                        className="w-full bg-[#262626] border-none border-b-2 border-[#484847] rounded-t-xl rounded-b-none py-3 px-4 text-sm focus:border-primary focus:ring-0 transition-all placeholder:text-zinc-600 outline-none text-white"
                                                        placeholder="Enter student email..."
                                                        type="email"
                                                        value={newMemberEmail}
                                                        onChange={(e) => setNewMemberEmail(e.target.value)}
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                setIsAddMemberModalOpen(true);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => setIsAddMemberModalOpen(true)}
                                                    disabled={!newMemberEmail.trim() || actionLoading}
                                                    className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <span className="material-symbols-outlined">add</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
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
                                            {assignments.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="px-8 py-10 text-center text-zinc-500 font-body italic">
                                                        No assignments assigned to this group.
                                                    </td>
                                                </tr>
                                            ) : (
                                                assignments.map((assignment) => {
                                                    const dueDate = new Date(assignment.due_date);
                                                    const isPast = dueDate < new Date();
                                                    const isUrgent = !isPast && (dueDate.getTime() - new Date().getTime()) < (24 * 60 * 60 * 1000);

                                                    return (
                                                        <tr key={assignment.id} className="hover:bg-[#201f1f]/40 transition-colors group/row">
                                                            <td className="px-8 py-6">
                                                                <div>
                                                                    <p className="font-semibold text-white mb-1">{assignment.title}</p>
                                                                    <p className="text-xs text-zinc-500 line-clamp-1">{assignment.description || 'No description provided'}</p>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                <div className={`flex items-center gap-2 ${isUrgent ? 'text-[#ff716c]' : isPast ? 'text-zinc-500' : 'text-zinc-300'}`}>
                                                                    <span className="material-symbols-outlined text-sm">{isUrgent ? 'warning' : 'calendar_today'}</span>
                                                                    <span className={`text-sm ${isPast ? 'line-through decoration-zinc-600' : ''}`}>
                                                                        {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${isPast
                                                                        ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/20'
                                                                        : isUrgent
                                                                            ? 'bg-[#f94d4e]/20 text-[#ff716c] border-[#ff716c]/20'
                                                                            : 'bg-[#006a62]/30 text-[#81f3e5] border-[#81f3e5]/20'
                                                                    }`}>
                                                                    {isPast ? 'Completed' : isUrgent ? 'Urgent' : 'In-Progress'}
                                                                </span>
                                                            </td>
                                                            <td className="px-8 py-6 text-right">
                                                                <button
                                                                    className="text-primary hover:text-white transition-colors"
                                                                    onClick={() => window.location.href = '/submissions'}
                                                                >
                                                                    <span className="material-symbols-outlined">{isPast ? 'check_circle' : 'arrow_forward'}</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
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
                                <input
                                    type="text"
                                    className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors"
                                    placeholder="e.g. Neural Nexus"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    disabled={actionLoading}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-[#484847]/20">
                            <button
                                onClick={() => {
                                    setIsCreateModalOpen(false);
                                    setActionError(null);
                                }}
                                disabled={actionLoading}
                                className="text-sm font-bold text-[#adaaaa] hover:text-white transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateGroup}
                                disabled={!newGroupName.trim() || actionLoading}
                                className="px-6 py-2 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#81ecff]/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {actionLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-[#003840]/20 border-t-[#003840] rounded-full animate-spin"></div>
                                        Creating...
                                    </>
                                ) : (
                                    'Create Group'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddMemberModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
                        <h2 className="text-2xl font-headline font-bold text-white mb-6">Add Member</h2>

                        {actionError && (
                            <div className="mb-4 bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                                <p className="text-red-400 text-sm">{actionError}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Email address *</label>
                                <input
                                    type="email"
                                    className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors"
                                    placeholder="student@university.edu"
                                    value={newMemberEmail}
                                    onChange={(e) => setNewMemberEmail(e.target.value)}
                                    disabled={actionLoading}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-[#484847]/20">
                            <button
                                onClick={() => {
                                    setIsAddMemberModalOpen(false);
                                    setActionError(null);
                                }}
                                disabled={actionLoading}
                                className="text-sm font-bold text-[#adaaaa] hover:text-white transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddMember}
                                disabled={!newMemberEmail.trim() || actionLoading}
                                className="px-6 py-2 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#81ecff]/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {actionLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-[#003840]/20 border-t-[#003840] rounded-full animate-spin"></div>
                                        Adding...
                                    </>
                                ) : (
                                    'Add Member'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Local Debug Controls - Only show when no data */}
            {!loading && groups.length === 0 && (
                <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 bg-[#131313] p-4 rounded-lg border border-[#484847]/30 shadow-xl opacity-50 hover:opacity-100 transition-opacity">
                    <p className="text-xs font-label text-zinc-500 uppercase tracking-widest text-center mb-1">Debug Controls</p>
                    <button
                        onClick={fetchGroups}
                        className="bg-[#262626] hover:bg-[#484847] text-white text-xs px-4 py-2 rounded transition-colors"
                    >
                        Refresh Groups
                    </button>
                </div>
            )}
        </div>
    );
};
