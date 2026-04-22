import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../../components/AdminNavbar';
import axiosInstance from '../../api/axios';
import type { Assignment, Group, Course } from '../../types';

interface CreateAssignmentForm {
    title: string;
    description: string;
    dueDate: string;
    driveLink: string;
    assignedTo: 'all' | 'specific';
    groupIds: string[];
    courseId: string;
}

export const AdminAssignments: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<CreateAssignmentForm>({
        title: '',
        description: '',
        dueDate: '',
        driveLink: '',
        courseId: '',
        assignedTo: 'all',
        groupIds: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [assignmentsRes, groupsRes, coursesRes, submissionsRes] = await Promise.all([
                axiosInstance.get('/api/assignments'),
                axiosInstance.get('/api/groups'),
                axiosInstance.get('/api/courses'),
                axiosInstance.get('/api/submissions/admin')
            ]);
            setAssignments(assignmentsRes.data.data);
            setGroups(groupsRes.data.data);
            setCourses(coursesRes.data.data);
            setSubmissions(submissionsRes.data.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to load assignments');
            console.error('Assignments error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.dueDate) return;

        try {
            setSubmitting(true);
            setError(null);
            const payload = {
                ...formData,
                courseId: formData.courseId || undefined,
                dueDate: new Date(formData.dueDate).toISOString()
            };
            await axiosInstance.post('/api/assignments', payload);
            await fetchData();
            setIsCreateModalOpen(false);
            resetForm();
        } catch (err: any) {
            console.log('create error:', err.response?.data);
            setError(err.response?.data?.error || 'Failed to create assignment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingAssignment || !formData.title || !formData.dueDate) return;

        try {
            setSubmitting(true);
            setError(null);
            const payload = {
                ...formData,
                courseId: formData.courseId || undefined,
                dueDate: new Date(formData.dueDate).toISOString()
            };
            await axiosInstance.put(`/api/assignments/${editingAssignment._id!}`, payload);
            await fetchData();
            setIsEditModalOpen(false);
            setEditingAssignment(null);
            resetForm();
        } catch (err: any) {
            console.log('edit error:', err.response?.data);
            setError(err.response?.data?.error || 'Failed to update assignment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this assignment?')) return;

        try {
            setError(null);
            await axiosInstance.delete(`/api/assignments/${id}`);
            await fetchData();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to delete assignment');
        }
    };

    const openEditModal = (assignment: Assignment) => {
        setEditingAssignment(assignment);
        setFormData({
            title: assignment.title,
            description: assignment.description || '',
            dueDate: assignment.dueDate,
            driveLink: assignment.driveLink || '',
            courseId: typeof (assignment as any).course === 'string' ? (assignment as any).course : (assignment as any).course?._id || '',
            assignedTo: assignment.assignedTo,
            groupIds: []
        });
        setIsEditModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            driveLink: '',
            courseId: '',
            assignedTo: 'all',
            groupIds: []
        });
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const isEmpty = !loading && assignments.length === 0;

    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen selection:bg-[#81ecff] selection:text-[#003840] overflow-hidden">
            <AdminNavbar />

            <main className="ml-64 pt-24 px-12 pb-12 min-h-screen flex flex-col">
                <header className="mb-12 relative flex items-center justify-center min-h-[48px]">
                    <h1 className="text-4xl font-headline font-black tracking-tight text-white uppercase">Assignments</h1>
                    <button onClick={() => { resetForm(); setIsCreateModalOpen(true); }} className="absolute right-0 top-1/2 -translate-y-1/2 px-6 py-3 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-xl shadow-[#81ecff]/10 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Create Assignment
                    </button>
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
                                    <h2 className="text-xl font-headline font-bold text-white">Assignment Directory</h2>
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
                                            <span className="material-symbols-outlined text-4xl text-[#adaaaa]/30">assignment</span>
                                        </div>
                                        <h3 className="text-2xl font-headline font-bold mb-2">No assignments yet.</h3>
                                        <p className="text-[#adaaaa] max-w-sm mx-auto">Create one to get started.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto flex-1">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#201f1f]/30">
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Title</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10 w-48">Course</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-center border-b border-[#484847]/10 w-48">Due Date</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-center border-b border-[#484847]/10 w-48">Assigned To</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-center border-b border-[#484847]/10 w-32">Submissions</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest text-right border-b border-[#484847]/10 w-32">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#484847]/10">
                                            {assignments.map((assignment) => (
                                                <tr key={assignment._id!} className="hover:bg-white/5 transition-colors group">
                                                    <td className="px-8 py-5 font-medium">{assignment.title}</td>
                                                    <td className="px-8 py-5 text-sm text-[#adaaaa]">
                                                        {(assignment as any).course?.title
                                                            ? <span className="px-2 py-1 rounded bg-[#a78bfa]/10 text-[#a78bfa] text-[10px] font-bold border border-[#a78bfa]/20 uppercase tracking-wider whitespace-nowrap">{(assignment as any).course.title}</span>
                                                            : <span className="text-zinc-600">—</span>}
                                                    </td>
                                                    <td className="px-8 py-5 text-center text-sm text-[#adaaaa]">{formatDate(assignment.dueDate)}</td>
                                                    <td className="px-8 py-5 text-center">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase ${assignment.assignedTo === 'all'
                                                            ? 'bg-[#81ecff]/10 text-[#81ecff] border border-[#81ecff]/20'
                                                            : 'bg-[#c084fc]/10 text-[#c084fc] border border-[#c084fc]/20'
                                                            }`}>
                                                            {assignment.assignedTo === 'all' ? 'ALL GROUPS' : 'SPECIFIC GROUPS'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5 text-center">
                                                        <span className="text-sm font-mono text-[#81ecff]">
                                                            {submissions.filter(s => (s.assignment as any)?._id === assignment._id || (s as any).assignmentId === assignment._id).length}
                                                        </span>
                                                        <span className="text-xs text-zinc-600 ml-1">submitted</span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => openEditModal(assignment)} className="p-2 text-[#adaaaa] hover:text-[#81ecff] transition-colors rounded-full hover:bg-white/10" title="Edit">
                                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                                            </button>
                                                            <button onClick={() => handleDelete(assignment._id!)} className="p-2 text-[#adaaaa] hover:text-[#ff716c] transition-colors rounded-full hover:bg-white/10" title="Delete">
                                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                                            </button>
                                                        </div>
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

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-lg p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]">
                        <h2 className="text-2xl font-headline font-bold text-white mb-6">Create Assignment</h2>

                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Title *</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" placeholder="e.g. Final Project" required />
                            </div>
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors resize-none h-24" placeholder="Optional notes..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Due Date *</label>
                                <input type="datetime-local" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" required />
                            </div>
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Drive Link</label>
                                <input type="text" value={formData.driveLink} onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Course (Optional)</label>
                                <select value={formData.courseId} onChange={(e) => setFormData({ ...formData, courseId: e.target.value })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors appearance-none font-body">
                                    <option value="">No specific course</option>
                                    {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Assigned To *</label>
                                <select value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value as 'all' | 'specific' })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors appearance-none">
                                    <option value="all">All Groups</option>
                                    <option value="specific">Specific Groups</option>
                                </select>
                            </div>
                            {formData.assignedTo === 'specific' && (
                                <div>
                                    <label className="block text-sm font-label text-[#adaaaa] mb-1">Select Groups</label>
                                    <div className="bg-[#262626] border border-[#484847]/30 rounded-lg p-3 max-h-40 overflow-y-auto">
                                        {groups.map((group) => (
                                            <label key={group._id!} className="flex items-center gap-2 py-1 cursor-pointer hover:text-[#81ecff] transition-colors">
                                                <input type="checkbox" checked={formData.groupIds.includes(group._id!)} onChange={(e) => { if (e.target.checked) { setFormData({ ...formData, groupIds: [...formData.groupIds, group._id!] }); } else { setFormData({ ...formData, groupIds: formData.groupIds.filter(id => id !== group._id!) }); } }} className="rounded" />
                                                <span className="text-sm">{group.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-[#484847]/20">
                                <button type="button" onClick={() => { setIsCreateModalOpen(false); resetForm(); }} className="text-sm font-bold text-[#adaaaa] hover:text-white transition-colors" disabled={submitting}>Cancel</button>
                                <button type="submit" disabled={submitting} className="px-6 py-2 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#81ecff]/10 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {submitting ? 'Creating...' : 'Create Assignment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && editingAssignment && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-lg p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]">
                        <h2 className="text-2xl font-headline font-bold text-white mb-6">Edit Assignment</h2>

                        <form onSubmit={handleEdit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Title *</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" placeholder="e.g. Final Project" required />
                            </div>
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors resize-none h-24" placeholder="Optional notes..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Due Date *</label>
                                <input type="datetime-local" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" required />
                            </div>
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Drive Link</label>
                                <input type="text" value={formData.driveLink} onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Course (Optional)</label>
                                <select value={formData.courseId} onChange={(e) => setFormData({ ...formData, courseId: e.target.value })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors appearance-none font-body">
                                    <option value="">No specific course</option>
                                    {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-label text-[#adaaaa] mb-1">Assigned To *</label>
                                <select value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value as 'all' | 'specific' })} className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors appearance-none">
                                    <option value="all">All Groups</option>
                                    <option value="specific">Specific Groups</option>
                                </select>
                            </div>
                            {formData.assignedTo === 'specific' && (
                                <div>
                                    <label className="block text-sm font-label text-[#adaaaa] mb-1">Select Groups</label>
                                    <div className="bg-[#262626] border border-[#484847]/30 rounded-lg p-3 max-h-40 overflow-y-auto">
                                        {groups.map((group) => (
                                            <label key={group._id!} className="flex items-center gap-2 py-1 cursor-pointer hover:text-[#81ecff] transition-colors">
                                                <input type="checkbox" checked={formData.groupIds.includes(group._id!)} onChange={(e) => { if (e.target.checked) { setFormData({ ...formData, groupIds: [...formData.groupIds, group._id!] }); } else { setFormData({ ...formData, groupIds: formData.groupIds.filter(id => id !== group._id!) }); } }} className="rounded" />
                                                <span className="text-sm">{group.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-[#484847]/20">
                                <button type="button" onClick={() => { setIsEditModalOpen(false); setEditingAssignment(null); resetForm(); }} className="text-sm font-bold text-[#adaaaa] hover:text-white transition-colors" disabled={submitting}>Cancel</button>
                                <button type="submit" disabled={submitting} className="px-6 py-2 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#81ecff]/10 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {submitting ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};