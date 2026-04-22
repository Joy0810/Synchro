import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { EmptyState } from '../../components/EmptyState';
import axiosInstance from '../../api/axios';
import { type Assignment, type Submission, type Course, type Group } from '../../types';

export const CourseAssignments: React.FC = () => {
    const { id: courseId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [course, setCourse] = useState<Course | null>(null);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [studentGroup, setStudentGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [submissionLink, setSubmissionLink] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        if (courseId) {
            fetchCourseAndAssignments();
        }
    }, [courseId]);

    const fetchCourseAndAssignments = async () => {
        try {
            setLoading(true);
            setError('');

            const [assignmentsRes, coursesRes, groupsRes] = await Promise.all([
                axiosInstance.get(`/api/assignments/course/${courseId}`),
                axiosInstance.get('/api/courses'),
                axiosInstance.get('/api/groups')
            ]);

            const assignmentsData = assignmentsRes.data.data;
            const coursesData = coursesRes.data.data as Course[];
            const foundCourse = coursesData.find(c => c._id === courseId);

            if (foundCourse) {
                setCourse(foundCourse);
            }

            setAssignments(assignmentsData);

            const groupsData = groupsRes.data.data as Group[];
            if (groupsData.length > 0) {
                const group = groupsData[0];
                setStudentGroup(group);
                
                const submissionsRes = await axiosInstance.get(`/api/submissions/group/${group._id}`);
                setSubmissions(submissionsRes.data.data);
            }

        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to load assignments');
        } finally {
            setLoading(false);
        }
    };

    const isAlreadySubmitted = (assignmentId: string) => {
        return submissions.some(s => (s.assignment as any)?._id?.toString() === assignmentId || s.assignmentId === assignmentId);
    };

    const handleOpenSubmitModal = (assignment: Assignment) => {
        setSelectedAssignment(assignment);
        setSubmissionLink('');
        setSubmitError('');
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAssignment || !studentGroup || !submissionLink.trim()) return;

        try {
            setSubmitting(true);
            setSubmitError('');
            
            const response = await axiosInstance.post('/api/submissions', {
                assignmentId: selectedAssignment._id,
                groupId: studentGroup._id,
                submissionLink: submissionLink.trim()
            });

            const newSubmission = response.data.data;
            setSubmissions(prev => [...prev, newSubmission]);
            setIsModalOpen(false);
        } catch (err: any) {
            setSubmitError(err.response?.data?.error || 'Failed to submit assignment');
        } finally {
            setSubmitting(false);
        }
    };

    const getTimerPill = (dueDate: string) => {
        const diff = new Date(dueDate).getTime() - Date.now();
        
        if (diff <= 0) {
            return (
                <div className="bg-red-500/20 text-red-400 border border-red-500/30 rounded-full px-3 py-1 text-xs font-medium">
                    Overdue
                </div>
            );
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (diff < 24 * 60 * 60 * 1000) {
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            return (
                <div className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full px-3 py-1 text-xs font-medium">
                    {hours}h {mins}m left
                </div>
            );
        }

        const remainingHours = hours % 24;
        return (
            <div className="bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-3 py-1 text-xs font-medium">
                {days}d {remainingHours}h left
            </div>
        );
    };

    if (loading) {
        return (
            <div className="bg-[#131313] text-white min-h-screen">
                <Navbar />
                <main className="ml-64 p-8 flex items-center justify-center min-h-screen">
                    <div className="text-cyan-400 text-lg">Loading assignments...</div>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-[#131313] text-white min-h-screen selection:bg-purple-500/30">
            <Navbar />

            <main className="ml-64 p-8 min-h-screen">
                {/* Header */}
                <div className="mb-8">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-4"
                    >
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Back to Courses
                    </button>
                    
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-white">{course?.title || 'Course Details'}</h1>
                        {course?.courseCode && (
                            <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full px-3 py-1 text-sm font-mono">
                                {course.courseCode}
                            </span>
                        )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                        {assignments.length} {assignments.length === 1 ? 'assignment' : 'assignments'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-8">
                        {error}
                    </div>
                )}

                {assignments.length === 0 ? (
                    <div className="mt-12 bg-[#1a1919] rounded-xl border border-white/5 p-12">
                        <EmptyState 
                            icon="assignment_late" 
                            message="No assignments found for this course." 
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">
                        {assignments.map((assignment) => {
                            const submitted = isAlreadySubmitted(assignment._id);
                            
                            return (
                                <div key={assignment._id} className="bg-[#1a1919] rounded-xl border border-white/5 p-6 flex flex-col gap-3 transition-all hover:border-white/10 hover:bg-[#201f1f]">
                                    <div className="flex items-center justify-between">
                                        <div className="bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full px-3 py-1 text-xs font-medium">
                                            {course?.title}
                                        </div>
                                        {getTimerPill(assignment.dueDate)}
                                    </div>

                                    <h2 className="text-lg font-semibold text-white mt-1">{assignment.title}</h2>
                                    
                                    {assignment.description && (
                                        <p className="text-sm text-gray-400 line-clamp-2">
                                            {assignment.description}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-4 mt-auto pt-2">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <span className="material-symbols-outlined text-base">calendar_today</span>
                                            {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })} at {new Date(assignment.dueDate).toLocaleTimeString('en-US', { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </div>

                                        {assignment.driveLink && (
                                            <a 
                                                href={assignment.driveLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-base">link</span>
                                                Drive Link
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex justify-end mt-2">
                                        {submitted ? (
                                            <div className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
                                                <span>Submitted</span>
                                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleOpenSubmitModal(assignment)}
                                                className="px-6 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-sm font-bold transition-all"
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Submit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-[#131313] border border-[#484847]/30 rounded-xl p-6 w-full max-w-md shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-2">Submit Assignment</h2>
                            <p className="text-gray-400 text-sm mb-6">
                                {selectedAssignment?.title}
                            </p>

                            {selectedAssignment?.driveLink && (
                                <div className="mb-6 p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Assignment Resource</p>
                                    <a href={selectedAssignment.driveLink} target="_blank" rel="noopener noreferrer" 
                                       className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1.5 font-medium transition-colors">
                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        <span>Open Assignment Link</span>
                                        <span className="text-[10px]">↗</span>
                                    </a>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                        Remarks
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                        placeholder=""
                                        value={submissionLink}
                                        onChange={(e) => setSubmissionLink(e.target.value)}
                                        disabled={submitting}
                                    />
                                    <p className="text-[10px] text-gray-500 mt-2">
                                        Please provide a public link to your work (Google Drive, GitHub, etc.)
                                    </p>
                                </div>

                                {submitError && (
                                    <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-lg">
                                        {submitError}
                                    </p>
                                )}

                                <div className="flex items-center gap-3 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2.5 bg-cyan-500 text-cyan-950 rounded-lg text-sm font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/10 disabled:opacity-50"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Submitting...' : 'Confirm Submission'}
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
