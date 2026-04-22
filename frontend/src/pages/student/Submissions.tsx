import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../api/axios';
import type { Submission, Assignment, Group, Course } from '../../types';

export const Submissions: React.FC = () => {
    const { user } = useAuth();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [group, setGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [submissionLink, setSubmissionLink] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        fetchGroupsAndSubmissions();
    }, []);

    const fetchGroupsAndSubmissions = async () => {
        try {
            setLoading(true);
            setError(null);

            const [groupsResponse, assignmentsResponse, coursesResponse] = await Promise.all([
                axiosInstance.get('/api/groups'),
                axiosInstance.get('/api/assignments'),
                axiosInstance.get('/api/courses')
            ]);

            const fetchedGroups = groupsResponse.data.data;
            const fetchedAssignments = assignmentsResponse.data.data;
            const fetchedCourses = coursesResponse.data.data;
            setAssignments(fetchedAssignments);
            setCourses(fetchedCourses);

            if (fetchedGroups.length > 0) {
                const firstGroup = fetchedGroups[0];
                setGroup(firstGroup);
                const submissionsResponse = await axiosInstance.get(`/api/submissions/group/${firstGroup._id}`);
                setSubmissions(submissionsResponse.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to fetch data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!selectedAssignment) return;
        
        const isGroupRequired = selectedAssignment.assignedTo === 'specific';
        if (isGroupRequired && !group) return;

        try {
            setSubmitting(true);
            setSubmitError(null);
            await axiosInstance.post('/api/submissions', {
                assignmentId: selectedAssignment._id,
                groupId: isGroupRequired ? group?._id : null,
                submissionLink: submissionLink
            });
            setIsSubmitModalOpen(false);
            setSubmissionLink('');
            setSelectedAssignment(null);
            await fetchGroupsAndSubmissions();
            showToast('Assignment submitted successfully!');
        } catch (err: any) {
            const msg = err.response?.data?.error || 'Failed to submit';
            setSubmitError(msg);
            showToast(msg, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const openSubmitModal = (assignment: Assignment) => {
        setSelectedAssignment(assignment);
        setSubmissionLink('');
        setSubmitError(null);
        setIsSubmitModalOpen(true);
    };

    const isAlreadySubmitted = (assignmentId: string) => {
        return submissions.some(s => {
            const id = typeof s.assignment === 'object' && s.assignment !== null
                ? (s.assignment as any)._id?.toString()
                : s.assignmentId;
            return id === assignmentId;
        });
    };

    const getCourseName = (courseId: any) => {
        if (!courseId) return null;
        const id = typeof courseId === 'string' ? courseId : courseId?._id;
        if (!id) return null;
        const course = courses.find(c => c._id === id);
        return course?.title || null;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };


    return (
        <div className="bg-background text-on-surface font-body min-h-screen selection:bg-primary-container/30 overflow-hidden">
            <Navbar />

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[300] px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl backdrop-blur-md border animate-in fade-in zoom-in duration-300 ${
                    toast.type === 'success' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                    <span className="material-symbols-outlined text-xl">
                        {toast.type === 'success' ? 'check_circle' : 'error'}
                    </span>
                    <span className="text-sm font-bold tracking-wide uppercase font-label">{toast.message}</span>
                </div>
            )}

            <main className="ml-64 pt-32 px-12 pb-12 min-h-screen flex flex-col">
                {/* Page Header */}
                <section className="mb-12 flex justify-between items-end">
                    <div className="space-y-1">
                        <h2 className="text-5xl font-headline font-bold tracking-tight text-white" style={{ textShadow: "0 0 12px rgba(129, 236, 255, 0.4)" }}>Submissions</h2>
                        <p className="text-zinc-400 font-light text-lg">Welcome back, <span className="text-white font-medium">{user?.name || 'Student'}</span></p>
                    </div>
                </section>

                {error && (
                    <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <p className="text-zinc-400 text-sm">Loading your submissions...</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {/* Progress Bar */}
                        {!loading && assignments.length > 0 && (
                            <section className="mb-10">
                                <div className="bg-[#1a1919] rounded-xl p-6 border border-white/5">
                                    <div className="flex justify-between items-center mb-3">
                                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Group Progress</p>
                                        <span className="text-sm font-bold text-[#81ecff]">{submissions.length} / {assignments.length} Submitted</span>
                                    </div>
                                    <div className="w-full bg-[#262626] rounded-full h-2.5">
                                        <div
                                            className="h-2.5 rounded-full transition-all duration-700"
                                            style={{
                                                width: `${assignments.length > 0 ? (submissions.length / assignments.length) * 100 : 0}%`,
                                                background: 'linear-gradient(90deg, #81ecff, #81f3e5)'
                                            }}
                                        />
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <span className="px-3 py-1 rounded-full bg-[#81f3e5]/10 text-[#81f3e5] text-[10px] font-bold tracking-widest uppercase border border-[#81f3e5]/20">
                                            ✓ {submissions.length} Done
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-bold tracking-widest uppercase border border-white/5">
                                            ⏳ {assignments.length - submissions.length} Pending
                                        </span>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Assignments to Submit */}
                        {assignments.length > 0 && (
                            <section>
                                <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-6">Assignments</h3>
                                <div className="bg-[#1a1919] rounded-xl overflow-hidden border border-white/5">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#201f1f]/30 border-b border-white/5">
                                            <tr>
                                                <th className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Assignment</th>
                                                <th className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Course</th>
                                                <th className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Due Date</th>
                                                <th className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {assignments.map((assignment) => {
                                                const submitted = isAlreadySubmitted(assignment._id!);
                                                return (
                                                    <tr key={assignment._id} className="hover:bg-white/[0.02] transition-colors">
                                                        <td className="px-8 py-5">
                                                            <p className="text-white font-medium">{assignment.title}</p>
                                                            <p className="text-xs text-zinc-500">{assignment.description || 'No description'}</p>
                                                        </td>
                                                        <td className="px-8 py-5 text-sm text-zinc-400">
                                                            {getCourseName((assignment as any).course) ? (
                                                                <span className="px-2 py-1 rounded bg-[#a78bfa]/10 text-[#a78bfa] text-[10px] font-bold border border-[#a78bfa]/20 uppercase tracking-wider">
                                                                    {getCourseName((assignment as any).course)}
                                                                </span>
                                                            ) : (
                                                                <span className="text-zinc-600">—</span>
                                                            )}
                                                        </td>
                                                        <td className="px-8 py-5 text-sm text-zinc-400">{formatDate(assignment.dueDate)}</td>
                                                        <td className="px-8 py-5 text-right">
                                                            {submitted ? (
                                                                <span className="px-3 py-1 rounded-full bg-[#81f3e5]/10 text-[#81f3e5] text-[10px] font-bold tracking-widest uppercase border border-[#81f3e5]/20">
                                                                    Submitted
                                                                </span>
                                                            ) : (
                                                                 <button
                                                                    onClick={() => openSubmitModal(assignment)}
                                                                    className="px-4 py-2 bg-primary hover:bg-primary/80 text-[#003840] rounded-full text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                                                                >
                                                                    Submit
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}

                        {/* Submission History */}
                        <section>
                            <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-6">Submission History</h3>
                            {submissions.length === 0 ? (
                                <div className="bg-[#1a1919] rounded-xl p-12 text-center border border-white/5">
                                    <span className="material-symbols-outlined text-4xl text-zinc-700 mb-4 block">drafts</span>
                                    <p className="text-zinc-500">No submissions yet</p>
                                </div>
                            ) : (
                                <div className="bg-[#1a1919] rounded-xl overflow-hidden border border-white/5">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#201f1f]/30 border-b border-white/5">
                                            <tr>
                                                <th className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Assignment</th>
                                                <th className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Course</th>
                                                <th className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Submitted Date</th>
                                                <th className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Submission Link</th>
                                                <th className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {submissions.map((submission) => (
                                                <tr key={submission._id} className="hover:bg-white/[0.02] transition-colors">
                                                    <td className="px-8 py-6">
                                                        <p className="text-white font-medium">{(submission.assignment as any)?.title || 'Untitled'}</p>
                                                        <p className="text-xs text-zinc-500">{(submission.assignment as any)?.description || ''}</p>
                                                    </td>
                                                    <td className="px-8 py-6 text-sm text-zinc-400">
                                                        {getCourseName((submission.assignment as any)?.course) ? (
                                                            <span className="px-2 py-1 rounded bg-[#a78bfa]/10 text-[#a78bfa] text-[10px] font-bold border border-[#a78bfa]/20 uppercase tracking-wider">
                                                                {getCourseName((submission.assignment as any).course)}
                                                            </span>
                                                        ) : (
                                                            <span className="text-zinc-600">—</span>
                                                        )}
                                                    </td>
                                                    <td className="px-8 py-6 text-zinc-400 text-sm">
                                                        {submission.confirmedAt ? (
                                                            <>{formatDate(submission.confirmedAt)} <span className="text-[10px] ml-2 px-1 bg-[#262626] rounded">{formatTime(submission.confirmedAt)}</span></>
                                                        ) : (
                                                            <span className="text-zinc-600">—</span>
                                                        )}
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        {submission.submissionLink ? (
                                                            <a className="inline-flex items-center gap-2 text-primary hover:text-[#00e3fd] transition-colors text-sm" href={submission.submissionLink} target="_blank" rel="noopener noreferrer">
                                                                <span className="material-symbols-outlined text-sm">link</span>
                                                                {submission.submissionLink.length > 40 ? submission.submissionLink.substring(0, 40) + '...' : submission.submissionLink}
                                                            </a>
                                                        ) : (
                                                            <span className="text-zinc-600 text-sm">No link</span>
                                                        )}
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="px-3 py-1 rounded-full bg-[#81f3e5]/10 text-[#81f3e5] text-[10px] font-bold tracking-widest uppercase border border-[#81f3e5]/20">
                                                            Submitted
                                                        </span>
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

            {/* Submit Modal */}
            {isSubmitModalOpen && selectedAssignment && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-md p-8 shadow-2xl">
                        <h2 className="text-2xl font-headline font-bold text-white mb-2">Submit Assignment</h2>
                        <p className="text-zinc-400 text-sm mb-6">{selectedAssignment.title}</p>

                        {submitError && (
                            <div className="mb-4 bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                                <p className="text-red-400 text-sm">{submitError}</p>
                            </div>
                        )}

                        {selectedAssignment.assignedTo === 'specific' && !group && (
                            <div className="mb-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                                <p className="text-yellow-400 text-sm">You must be in a group to submit this assignment.</p>
                            </div>
                        )}

                        {selectedAssignment.assignedTo === 'specific' && group && user && group.owner._id !== (user.id || user._id) && (
                            <div className="mb-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                                <p className="text-blue-400 text-sm">Only the group leader can submit this assignment.</p>
                            </div>
                        )}

                        {selectedAssignment.driveLink && (
                            <div className="mb-6 p-4 bg-[#262626] rounded-lg border border-[#484847]/30">
                                <p className="text-sm text-zinc-400 mb-3">Step 1: Open the submission form and complete your work</p>
                                <a
                                    href={selectedAssignment.driveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg text-sm font-bold transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                    Open Submission Form
                                </a>
                            </div>
                        )}
                        <div className="mb-6">
                            <label className="block text-sm font-label text-zinc-400 mb-2">Remarks</label>
                            <input
                                type="text"
                                className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors"
                                placeholder=""
                                value={submissionLink}
                                onChange={(e) => setSubmissionLink(e.target.value)}
                                disabled={submitting}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-[#484847]/20">
                            <button
                                onClick={() => { setIsSubmitModalOpen(false); setSubmitError(null); }}
                                disabled={submitting}
                                className="text-sm font-bold text-[#adaaaa] hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={
                                    submitting || 
                                    !submissionLink.trim() || 
                                    (selectedAssignment.assignedTo === 'specific' && (!group || group.owner._id !== (user?.id || user?._id)))
                                }
                                className="px-6 py-2 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 
                                 (selectedAssignment.assignedTo === 'specific' && !group) ? 'Join a group first' :
                                 (selectedAssignment.assignedTo === 'specific' && group && group.owner._id !== (user?.id || user?._id)) ? 'Only leader can submit' :
                                 'Mark as Submitted'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-50 overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#81f3e5]/5 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
};