import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { AssignmentCard } from '../components/AssignmentCard';
import { GroupCard } from '../components/GroupCard';
import { SubmissionTable } from '../components/SubmissionTable';
import { EmptyState } from '../components/EmptyState';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axios';
import type { Group, Assignment, Submission } from '../types';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [groupsRes, assignmentsRes] = await Promise.all([
        axiosInstance.get('/api/groups'),
        axiosInstance.get('/api/assignments'),
      ]);

      setGroups(groupsRes.data.data);
      setAssignments(assignmentsRes.data.data);

      if (groupsRes.data.data.length > 0) {
        const submissionsRes = await axiosInstance.get(`/api/submissions/group/${groupsRes.data.data[0]._id}`);
        setSubmissions(submissionsRes.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    try {
      setCreating(true);
      await axiosInstance.post('/api/groups', { name: newGroupName });
      setNewGroupName('');
      setIsCreateModalOpen(false);
      await fetchDashboardData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create group');
    } finally {
      setCreating(false);
    }
  };

  const getUpcomingAssignments = () => {
    const now = new Date();
    return assignments
      .filter(a => new Date(a.dueDate) > now)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);
  };

  const getTimeLeft = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 24) {
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${mins}m left`;
    } else if (days === 1) {
      return 'Tomorrow, 11:59 PM';
    } else {
      return `${days} Days Left`;
    }
  };

  const getStatus = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) return 'URGENT';
    if (hours < 48) return 'DUE SOON';
    return 'IN PROGRESS';
  };

  if (loading) {
    return (
      <div className="bg-background text-on-surface min-h-screen">
        <Navbar />
        <main className="ml-64 min-h-screen flex items-center justify-center">
          <div className="text-cyan-400 text-lg">Loading...</div>
        </main>
      </div>
    );
  }

  const upcomingAssignments = getUpcomingAssignments();

  return (
    <div className="bg-background text-on-surface selection:bg-primary/30 min-h-screen">
      <Navbar />

      <main className="ml-64 min-h-screen relative">
        <section className="pt-24 px-12 pb-12 max-w-[1440px] mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold font-headline tracking-tight text-on-surface">Dashboard</h2>
            <p className="text-on-surface-variant mt-2 font-body max-w-2xl">
              Welcome back, {user?.name}
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Upcoming Assignments: Bento Row */}
          <div className="mb-16">
            <div className="flex items-end justify-between mb-6">
              <h3 className="text-lg font-bold font-headline tracking-wide uppercase text-primary/80">Upcoming Assignments</h3>
              <a className="text-sm text-primary hover:underline font-label" href="/assignments">View All</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingAssignments.length === 0 ? (
                <div className="md:col-span-1">
                  <EmptyState icon="assignment_turned_in" message="No assignments yet" />
                </div>
              ) : (
                upcomingAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment._id}
                    title={assignment.title}
                    status={getStatus(assignment.dueDate)}
                    timeLeft={getTimeLeft(assignment.dueDate)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Second Tier: My Group & Submission History */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <GroupCard
                group={groups[0]}
                isEmpty={groups.length === 0}
                onCreateClick={() => setIsCreateModalOpen(true)}
                onAddMemberClick={() => window.location.href = '/my-group'}
              />
            </div>
            <div className="lg:col-span-2">
              <SubmissionTable submissions={submissions} />
            </div>
          </div>
        </section>

        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
              <h2 className="text-2xl font-headline font-bold text-white mb-6">Create Group</h2>

              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-label text-[#adaaaa] mb-1">Group Name *</label>
                  <input
                    type="text"
                    className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors"
                    placeholder="e.g. Neural Nexus"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    required
                    disabled={creating}
                  />
                </div>

                <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-[#484847]/20">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setNewGroupName('');
                    }}
                    className="text-sm font-bold text-[#adaaaa] hover:text-white transition-colors"
                    disabled={creating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#81ecff]/10 disabled:opacity-50"
                    disabled={creating}
                  >
                    {creating ? 'Creating...' : 'Create Group'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
