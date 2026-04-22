import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { CourseCard } from '../../components/ui/CourseCard';
import axiosInstance from '../../api/axios';
import { type Course, type Assignment, type Submission } from '../../types';

export const Courses: React.FC = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Enrollment modal state
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
    const [courseCode, setCourseCode] = useState('');
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [coursesRes, assignmentsRes, submissionsRes] = await Promise.all([
                axiosInstance.get('/api/courses'),
                axiosInstance.get('/api/assignments'),
                axiosInstance.get('/api/submissions/my'),
            ]);

            setCourses(coursesRes.data.data);
            setAssignments(assignmentsRes.data.data);
            setSubmissions(submissionsRes.data.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to load courses');
            console.error('Courses fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseCode.trim()) return;

        try {
            setEnrolling(true);
            await axiosInstance.post('/api/courses/enroll', { courseCode });
            setCourseCode('');
            setIsEnrollModalOpen(false);
            await fetchData();
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to enroll in course');
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#131313] text-white min-h-screen">
                <Navbar />
                <main className="ml-64 min-h-screen pt-24 pb-8 px-8 flex items-center justify-center">
                    <div className="text-cyan-400 text-lg">Loading courses...</div>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-[#131313] text-white min-h-screen selection:bg-primary/30">
            <Navbar />

            <main className="ml-64 min-h-screen pt-24 px-8 pb-8">
                <div className="max-w-[1440px] mx-auto">
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-4xl font-bold text-white">Courses</h1>
                            <p className="text-gray-400 mt-2 text-sm">
                                Manage your enrolled courses and view your progress.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsEnrollModalOpen(true)}
                            className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full font-bold text-sm transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            Enroll in Course
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Courses Grid */}
                    {courses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-[#1a1919] rounded-2xl border border-white/5">
                            <span className="material-symbols-outlined text-6xl text-zinc-700 mb-4">school</span>
                            <h4 className="text-xl font-semibold text-white mb-2">No courses yet</h4>
                            <p className="text-zinc-500 max-w-xs text-center text-sm">
                                You haven't enrolled in any courses yet. Ask your professor for a course code.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => {
                                const courseAssignments = assignments.filter(a => (a as any).course?._id === course._id || (a as any).course === course._id);
                                const courseSubmissions = submissions.filter(s => (s.assignment as any)?.course?._id === course._id || (s.assignment as any)?.course === course._id);

                                return (
                                    <CourseCard
                                        key={course._id}
                                        course={course}
                                        submittedCount={courseSubmissions.length}
                                        totalAssignments={courseAssignments.length}
                                        onClick={() => navigate('/courses/' + course._id)}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Enroll Modal */}
                {isEnrollModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
                            <h2 className="text-2xl font-bold text-white mb-6">Enroll in Course</h2>

                            <form onSubmit={handleEnroll} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Course Code *</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors"
                                        placeholder="e.g. CS-101-ABCD"
                                        value={courseCode}
                                        onChange={(e) => setCourseCode(e.target.value)}
                                        required
                                        disabled={enrolling}
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-[#484847]/20">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEnrollModalOpen(false);
                                            setCourseCode('');
                                        }}
                                        className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
                                        disabled={enrolling}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#81ecff]/10 disabled:opacity-50"
                                        disabled={enrolling}
                                    >
                                        {enrolling ? 'Enrolling...' : 'Enroll Now'}
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
