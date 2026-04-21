import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../api/axios';
import type { Assignment } from '../../types';

export const Assignments: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/assignments');
      setAssignments(response.data.data);
      const groupsRes = await axiosInstance.get('/api/groups');
      const groups = groupsRes.data.data;
      if (groups.length > 0) {
        const subsRes = await axiosInstance.get(`/api/submissions/group/${groups[0]._id}`);
        setSubmissions(subsRes.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load assignments');
      console.error('Assignments error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isSubmitted = (assignmentId: string) => submissions.some(s => {
    const id = typeof s.assignment === 'object' ? s.assignment?._id : s.assignmentId;
    return id === assignmentId;
  });

  const getTimeLeft = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (diff < 0) return 'Overdue';
    if (hours < 24) return `${hours} hours remaining`;
    if (days === 1) return 'Tomorrow';
    return `${days} days remaining`;
  };

  const getStatus = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (diff < 0) return { label: 'OVERDUE', class: 'bg-red-500 text-white' };
    if (hours < 24) return { label: 'URGENT', class: 'bg-[#f94d4e] text-[#110000]' };
    if (hours < 48) return { label: 'DUE SOON', class: 'bg-primary/20 text-primary' };
    return { label: 'IN PROGRESS', class: 'bg-[#006a62] text-[#dcfff9]' };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const upcomingAssignments = assignments
    .filter(a => new Date(a.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

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

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen">
      <Navbar />

      <main className="ml-64 pt-24 pb-12 px-12 min-h-screen">
        {/* Page Header */}
        <header className="mb-10">
          <h2 className="text-4xl font-bold font-headline tracking-tight text-white mb-1">Assignments</h2>
          <p className="text-zinc-500 font-body">
            {assignments.length === 0 ? (
              `Welcome back, ${user?.name}. Your academic queue is currently clear.`
            ) : (
              <>Welcome back, {user?.name}. You have <span className="text-primary font-semibold">{upcomingAssignments.length} items</span> requiring immediate attention.</>
            )}
          </p>
        </header>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Content Section */}
        <div className="space-y-12 max-w-6xl">

          {/* Upcoming Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-500 font-label">UPCOMING ASSIGNMENTS</h3>
              {upcomingAssignments.length > 0 && <div className="h-px flex-1 mx-4 bg-white/5"></div>}
            </div>

            {upcomingAssignments.length === 0 ? (
              <div className="relative group overflow-hidden rounded-xl bg-[#131313] p-12 border border-[#484847]/10 flex flex-col items-center justify-center text-center transition-all hover:border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-20 h-20 rounded-full bg-[#262626] flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"></div>
                  <span className="material-symbols-outlined text-4xl text-primary/40">assignment_late</span>
                </div>
                <h4 className="text-xl font-headline font-semibold text-white mb-2">No upcoming assignments</h4>
                <p className="text-zinc-400 font-body max-w-xs mx-auto text-sm leading-relaxed">
                  Your schedule is clear. Check back later for new assignments.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingAssignments.map((assignment) => {
                  const status = getStatus(assignment.dueDate);
                  return (
                    <div key={assignment._id} className="bg-[#1a1919] rounded-xl p-6 relative overflow-hidden group hover:bg-[#201f1f] transition-all glass-panel">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`${status.class} px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-wider`}>{status.label}</span>
                          {(assignment as any).course?.title && (
                            <span className="px-2 py-1 rounded bg-[#a78bfa]/10 text-[#a78bfa] text-[10px] font-bold border border-[#a78bfa]/20 uppercase tracking-wider truncate max-w-[120px]">
                              {(assignment as any).course.title}
                            </span>
                          )}
                        </div>
                        <span className="material-symbols-outlined text-zinc-500 hover:text-primary cursor-pointer transition-colors">more_horiz</span>
                      </div>
                      <h4 className="text-xl font-headline font-semibold text-white mb-2 leading-tight">{assignment.title}</h4>
                      <p className="text-[#adaaaa] text-sm font-body mb-6 line-clamp-2">{assignment.description || 'No description provided'}</p>
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 text-zinc-400">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          <span className="text-xs font-label">Due: {formatDate(assignment.dueDate)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-primary">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          <span className="text-xs font-label">{getTimeLeft(assignment.dueDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                        {assignment.driveLink && (
                          <a href={assignment.driveLink} target="_blank" rel="noopener noreferrer" className="bg-[#262626] p-2 rounded-lg text-zinc-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">drive_file_move</span>
                          </a>
                        )}
                        {isSubmitted(assignment._id!) 
                          ? <span className="flex-1 text-center py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-[#81f3e5]/10 text-[#81f3e5] border border-[#81f3e5]/20">✓ Submitted</span>
                          : <button className="flex-1 bg-gradient-to-r from-primary to-primary-dim text-[#003840] font-bold py-2 rounded-full text-xs font-label uppercase tracking-widest active:scale-95 transition-all shadow-[0_0_15px_rgba(129,236,255,0.2)]" onClick={() => window.location.href = '/submissions'}>SUBMIT</button>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Table Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-500 font-label uppercase">All Assignments</h3>
            </div>

            <div className="w-full bg-[#000000] border border-white/5 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#201f1f]/50 border-b border-white/5">
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Assignment</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Course</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Due Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Drive Link</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 font-label tracking-widest uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {assignments.length === 0 ? (
                    <tr>
                      <td className="px-6 py-20 text-center" colSpan={6}>
                        <div className="flex flex-col items-center gap-3">
                          <span className="material-symbols-outlined text-zinc-700 text-3xl">folder_off</span>
                          <p className="text-zinc-600 font-body text-sm italic">No assignments to show in this view</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    assignments.map((assignment) => {
                      const isPast = new Date(assignment.dueDate) < new Date();
                      return (
                        <tr key={assignment._id} className="hover:bg-[#201f1f]/30 transition-colors group">
                          <td className="px-6 py-5">
                            <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{assignment.title}</p>
                            <p className="text-xs text-zinc-500">{assignment.description?.substring(0, 50)}{assignment.description && assignment.description.length > 50 ? '...' : ''}</p>
                          </td>
                          <td className="px-6 py-5">
                            {(assignment as any).course?.title
                              ? <span className="px-2 py-1 rounded bg-[#a78bfa]/10 text-[#a78bfa] text-[10px] font-bold border border-[#a78bfa]/20 uppercase tracking-wider">{(assignment as any).course.title}</span>
                              : <span className="text-zinc-600 text-xs">—</span>}
                          </td>
                          <td className="px-6 py-5 text-sm text-zinc-400 font-label">{formatDate(assignment.dueDate)}</td>
                          <td className="px-6 py-5">
                            {isSubmitted(assignment._id!) ? (
                              <span className="bg-[#81f3e5]/10 text-[#81f3e5] px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-wider">SUBMITTED</span>
                            ) : (
                              <span className={`${isPast ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-zinc-800 text-zinc-400'} px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-wider`}>
                                {isPast ? 'OVERDUE' : 'UPCOMING'}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            {assignment.driveLink ? (
                              <a className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors" href={assignment.driveLink} target="_blank" rel="noopener noreferrer">
                                <span className="material-symbols-outlined text-lg">folder</span>
                                <span className="text-xs">Resources</span>
                              </a>
                            ) : (
                              <span className="text-xs text-zinc-600">No link</span>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <button className="text-primary hover:text-white transition-colors" onClick={() => window.location.href = '/submissions'}>
                              <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
