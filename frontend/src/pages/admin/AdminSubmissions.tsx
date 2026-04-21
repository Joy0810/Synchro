import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../../components/AdminNavbar';
import axiosInstance from '../../api/axios';
import type { Submission } from '../../types';

export const AdminSubmissions: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            setError(null);
            const [submissionsRes, coursesRes] = await Promise.all([
                axiosInstance.get('/api/submissions/admin'),
                axiosInstance.get('/api/courses')
            ]);
            setSubmissions(submissionsRes.data.data);
            setCourses(coursesRes.data.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to load submissions');
            console.error('Submissions error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCourseTitle = (courseId: string) => {
        const course = courses.find(c => c._id === courseId);
        return course?.title || null;
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
    };

    const isEmpty = !loading && submissions.length === 0;

    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen selection:bg-[#81ecff] selection:text-[#003840] overflow-hidden">
            <AdminNavbar />

            <main className="ml-64 pt-24 px-12 pb-12 min-h-screen flex flex-col">
                <header className="mb-12 relative flex items-center justify-center min-h-[48px]">
                    <h1 className="text-4xl font-headline font-black tracking-tight text-white uppercase">Submissions</h1>
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
                                    <h2 className="text-xl font-headline font-bold text-white">Recent Submissions</h2>
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
                                            <span className="material-symbols-outlined text-4xl text-[#adaaaa]/30">outbox</span>
                                        </div>
                                        <h3 className="text-2xl font-headline font-bold mb-2">No submissions yet.</h3>
                                        <p className="text-[#adaaaa] max-w-sm mx-auto">Submitted assignments will appear here.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto flex-1">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#201f1f]/30">
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Assignment Title</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Course</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Group Name</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Confirmed By</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10">Confirmed At</th>
                                                <th className="px-8 py-4 text-xs font-bold text-[#adaaaa] uppercase tracking-widest border-b border-[#484847]/10 w-32 text-right">Link</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#484847]/10">
                                            {submissions.map((submission) => (
                                                <tr key={submission._id} className="hover:bg-white/5 transition-colors group">
                                                    <td className="px-8 py-5 font-medium">{submission.assignment?.title || 'N/A'}</td>
                                                    <td className="px-8 py-5">
                                                        {(() => {
                                                            const courseId = (submission.assignment as any)?.course;
                                                            const title = typeof courseId === 'object' ? courseId?.title : (courseId ? getCourseTitle(courseId) : null);
                                                            return title
                                                                ? <span className="px-2 py-1 rounded bg-[#a78bfa]/10 text-[#a78bfa] text-[10px] font-bold border border-[#a78bfa]/20 uppercase tracking-wider">{title}</span>
                                                                : <span className="text-zinc-600 text-xs">—</span>;
                                                        })()}
                                                    </td>
                                                    <td className="px-8 py-5 text-[#adaaaa]">{submission.group?.name || 'N/A'}</td>
                                                    <td className="px-8 py-5 text-[#81ecff]">{(submission as any).confirmedBy?.name || 'N/A'}</td>
                                                    <td className="px-8 py-5">
                                                        {(submission as any).confirmedAt ? (
                                                            <div className="flex flex-col">
                                                                <span className="text-sm">{formatDate((submission as any).confirmedAt)}</span>
                                                                <span className="text-xs text-[#adaaaa]">{formatTime((submission as any).confirmedAt)}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-[#adaaaa]">N/A</span>
                                                        )}
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        {submission.submissionLink ? (
                                                            <a
                                                                href={submission.submissionLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-[#81ecff] hover:bg-[#81ecff]/10 rounded transition-colors uppercase tracking-wider"
                                                            >
                                                                VIEW <span className="material-symbols-outlined text-xs">north_east</span>
                                                            </a>
                                                        ) : (
                                                            <span className="text-[#adaaaa] text-xs">No link</span>
                                                        )}
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