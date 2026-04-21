import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../../components/AdminNavbar';
import axiosInstance from '../../api/axios';
import type { Course } from '../../types';

export const AdminCourses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [submitting, setSubmitting] = useState(false);
    const [shareModalCourse, setShareModalCourse] = useState<Course | null>(null);
    const [assignments, setAssignments] = useState<any[]>([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const [coursesRes, assignmentsRes] = await Promise.all([
                axiosInstance.get('/api/courses'),
                axiosInstance.get('/api/assignments')
            ]);
            setCourses(coursesRes.data.data);
            setAssignments(assignmentsRes.data.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to fetch courses');
            console.error('Fetch courses error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const response = await axiosInstance.post('/api/courses', formData);
            setCourses([...courses, response.data.data]);
            setIsCreateModalOpen(false);
            setShareModalCourse(response.data.data);
            setFormData({ title: '', description: '' });
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to create course');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCourse) return;
        try {
            setSubmitting(true);
            const response = await axiosInstance.put(`/api/courses/${selectedCourse._id}`, formData);
            setCourses(courses.map(c => c._id === selectedCourse._id ? response.data.data : c));
            setIsEditModalOpen(false);
            setSelectedCourse(null);
            setFormData({ title: '', description: '' });
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to update course');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;
        try {
            await axiosInstance.delete(`/api/courses/${id}`);
            setCourses(courses.filter(c => c._id !== id));
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to delete course');
        }
    };

    const openEditModal = (course: Course) => {
        setSelectedCourse(course);
        setFormData({ title: course.title, description: course.description });
        setIsEditModalOpen(true);
    };

    return (
        <div className="bg-[#0e0e0e] text-white min-h-screen font-body selection:bg-[#81ecff] selection:text-[#003840]">
            <AdminNavbar />
            <main className="ml-64 pt-24 px-12 pb-12 min-h-screen flex flex-col">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-headline font-black tracking-tight uppercase">Courses</h1>
                        <p className="text-zinc-400 mt-2">Manage academic courses and student enrollees</p>
                    </div>
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-6 py-2.5 bg-transparent border border-[#81ecff] text-[#81ecff] hover:bg-[#81ecff]/10 rounded-full font-bold text-sm transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                        Create Course
                    </button>
                </header>

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex-1 flex items-center justify-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#81ecff]"></div>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-24 bg-[#1a1919] rounded-2xl border border-white/5 min-h-[400px]">
                        <span className="material-symbols-outlined text-6xl text-zinc-700 mb-4">school</span>
                        <h2 className="text-2xl font-headline font-bold mb-2">No courses yet</h2>
                        <p className="text-zinc-500 max-w-xs text-center">Start by creating your first course to manage students and assignments.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div key={course._id} className="bg-[#1a1919] border border-white/5 rounded-2xl p-8 hover:bg-[#201f1f] transition-all group relative overflow-hidden flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="bg-[#81ecff]/10 text-[#81ecff] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-[#81ecff]/20">
                                        {course.courseCode}
                                    </span>
                                    <div className="flex gap-4">
                                        <button onClick={() => openEditModal(course)} className="text-zinc-600 hover:text-[#81ecff] transition-colors">
                                            <span className="material-symbols-outlined text-xl">edit</span>
                                        </button>
                                        <button onClick={() => handleDelete(course._id)} className="text-zinc-600 hover:text-red-400 transition-colors">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-headline font-bold text-white mb-2 leading-tight">
                                        {course.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm mb-8 line-clamp-3">
                                        {course.description}
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-white/5 flex items-center gap-6 mt-auto">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-[#81ecff]">groups</span>
                                        <span className="text-xs font-bold text-zinc-500 tracking-wider">{(course.enrolledStudents as any)?.length || 0} Students</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-[#a78bfa]">assignment</span>
                                        <span className="text-xs font-bold text-zinc-500 tracking-wider font-label uppercase">{assignments.filter(a => (a as any).course?._id === course._id || (a as any).course === course._id).length} Assignments</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create/Edit Modal */}
                {(isCreateModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-md p-8 shadow-2xl">
                            <h2 className="text-2xl font-headline font-bold text-white mb-6">
                                {isCreateModalOpen ? 'Create New Course' : 'Edit Course'}
                            </h2>
                            <form onSubmit={isCreateModalOpen ? handleCreate : handleUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Title *</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#262626] border border-white/5 text-white focus:outline-none focus:border-[#81ecff] px-4 py-3 rounded-lg transition-colors placeholder:text-zinc-600"
                                        placeholder="e.g. Advanced Neural Architectures"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        disabled={submitting}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Description</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-[#262626] border border-white/5 text-white focus:outline-none focus:border-[#81ecff] px-4 py-3 rounded-lg transition-colors placeholder:text-zinc-600 resize-none"
                                        placeholder="Course overview and objectives..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        disabled={submitting}
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-6 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsCreateModalOpen(false);
                                            setIsEditModalOpen(false);
                                            setFormData({ title: '', description: '' });
                                        }}
                                        className="text-sm font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-8 py-3 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-all shadow-lg shadow-[#81ecff]/10 disabled:opacity-50 uppercase tracking-wider"
                                    >
                                        {submitting ? 'PROCESSING...' : (isCreateModalOpen ? 'CREATE COURSE' : 'UPDATE COURSE')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Share Modal */}
                {shareModalCourse && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[201] flex items-center justify-center p-4">
                        <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-sm p-10 shadow-2xl flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[#81ecff]/10 rounded-full flex items-center justify-center mb-6 border border-[#81ecff]/20">
                                <span className="material-symbols-outlined text-4xl text-[#81ecff]">school</span>
                            </div>
                            
                            <h2 className="text-2xl font-headline font-bold text-white mb-2">Course Created!</h2>
                            <p className="text-zinc-400 text-sm mb-8">Share this code with your students so they can enroll.</p>
                            
                            <div className="w-full bg-[#262626] border border-white/5 rounded-xl px-6 py-4 flex items-center justify-between mb-2">
                                <span className="text-2xl font-mono font-bold text-[#81ecff] tracking-tight">
                                    {shareModalCourse.courseCode}
                                </span>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(shareModalCourse.courseCode);
                                    }}
                                    className="text-zinc-500 hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined">content_copy</span>
                                </button>
                            </div>
                            <p className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase mb-10">
                                {shareModalCourse.title}
                            </p>

                            <button
                                onClick={() => setShareModalCourse(null)}
                                className="w-full py-4 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-all shadow-lg shadow-[#81ecff]/10 uppercase tracking-widest"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
