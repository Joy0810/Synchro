import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { AssignmentCard } from '../../components/AssignmentCard';
import { CourseCard } from '../../components/ui/CourseCard';
import { EmptyState } from '../../components/EmptyState';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../api/axios';
import { type Assignment, type Submission, type Course } from '../../types';

export const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
    const [courseCode, setCourseCode] = useState('');
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
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
            setError(err.response?.data?.error || 'Failed to load dashboard data');
            console.error('Dashboard error:', err);
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
            await fetchDashboardData();
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to enroll in course');
        } finally {
            setEnrolling(false);
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

                    {/* Courses Section */}
                    <div className="mb-16">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold font-headline tracking-wide uppercase text-primary/80">Your Courses</h3>
                                <div className="h-1 w-12 bg-primary/30 mt-1 rounded-full"></div>
                            </div>
                            <button
                                onClick={() => setIsEnrollModalOpen(true)}
                                className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full font-bold text-sm transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                Enroll in Course
                            </button>
                        </div>

                        {courses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-[#131313] rounded-2xl border border-white/5">
                                <span className="material-symbols-outlined text-6xl text-zinc-700 mb-4">school</span>
                                <h4 className="text-xl font-headline font-semibold text-white mb-2">No courses yet</h4>
                                <p className="text-zinc-500 font-body max-w-xs text-center text-sm">
                                    Ask your professor for a course code to enroll in a course.
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

                    {/* Upcoming Assignments Section */}
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
                </section>

                {isEnrollModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
                            <h2 className="text-2xl font-headline font-bold text-white mb-6">Enroll in Course</h2>

                            <form onSubmit={handleEnroll} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-label text-[#adaaaa] mb-1">Course Code *</label>
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
                                        className="text-sm font-bold text-[#adaaaa] hover:text-white transition-colors"
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
