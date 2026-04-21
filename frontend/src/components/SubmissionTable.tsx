import React from 'react';
import type { Submission } from '../types';

interface SubmissionTableProps {
  submissions: Submission[];
}

export const SubmissionTable: React.FC<SubmissionTableProps> = ({ submissions }) => {
  const isEmpty = submissions.length === 0;

  return (
    <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold font-headline tracking-widest text-primary/80 uppercase">Submission History</h3>
        <button className="text-on-surface-variant hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-outline-variant/10">
            <tr>
              <th className="pb-4 font-headline text-xs text-on-surface-variant uppercase tracking-widest">Assignment</th>
              <th className="pb-4 font-headline text-xs text-on-surface-variant uppercase tracking-widest">Submitted Date</th>
              <th className="pb-4 font-headline text-xs text-on-surface-variant uppercase tracking-widest">Artifact</th>
              <th className="pb-4 font-headline text-xs text-on-surface-variant uppercase tracking-widest text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {isEmpty ? (
              <tr>
                <td className="py-20 text-center" colSpan={4}>
                  <p className="text-on-surface-variant font-body italic">No submissions yet</p>
                </td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <tr key={submission.id} className="group hover:bg-surface-container/50 transition-colors">
                  <td className="py-5">
                    <p className="text-sm font-bold font-headline text-on-surface">{submission.assignment?.title || 'Unknown Assignment'}</p>
                  </td>
                  <td className="py-5 text-sm text-on-surface-variant font-body">
                    {submission.confirmedAt ? new Date(submission.confirmedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) + ' • ' + new Date(submission.confirmedAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    }) : 'Pending'}
                  </td>
                  <td className="py-5">
                    {submission.submissionLink && (
                      <a 
                        className="text-primary hover:text-primary-dim transition-colors" 
                        href={submission.submissionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="material-symbols-outlined text-[18px]">link</span>
                      </a>
                    )}
                  </td>
                  <td className="py-5 text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-[10px] font-bold font-label uppercase tracking-tighter">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Submitted
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isEmpty && (
        <div className="mt-8 flex justify-center">
          <button className="text-xs font-headline text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-bold">View Archive</button>
        </div>
      )}
    </div>
  );
};
