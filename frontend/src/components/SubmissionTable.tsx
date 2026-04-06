import React from 'react';

interface SubmissionTableProps {
  isEmpty: boolean;
}

export const SubmissionTable: React.FC<SubmissionTableProps> = ({ isEmpty }) => {
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
              <>
                <tr className="group hover:bg-surface-container/50 transition-colors">
                  <td className="py-5">
                    <p className="text-sm font-bold font-headline text-on-surface">QNN_Final_Architecture</p>
                  </td>
                  <td className="py-5 text-sm text-on-surface-variant font-body">Oct 24, 2023 • 14:20</td>
                  <td className="py-5">
                    <a className="text-primary hover:text-primary-dim transition-colors" href="#">
                      <span className="material-symbols-outlined text-[18px]">link</span>
                    </a>
                  </td>
                  <td className="py-5 text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-[10px] font-bold font-label uppercase tracking-tighter">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Submitted
                    </span>
                  </td>
                </tr>
                <tr className="group hover:bg-surface-container/50 transition-colors">
                  <td className="py-5">
                    <p className="text-sm font-bold font-headline text-on-surface">Data_Structures_Midterm</p>
                  </td>
                  <td className="py-5 text-sm text-on-surface-variant font-body">Oct 12, 2023 • 09:15</td>
                  <td className="py-5">
                    <a className="text-primary hover:text-primary-dim transition-colors" href="#">
                      <span className="material-symbols-outlined text-[18px]">link</span>
                    </a>
                  </td>
                  <td className="py-5 text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-[10px] font-bold font-label uppercase tracking-tighter">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Submitted
                    </span>
                  </td>
                </tr>
                <tr className="group hover:bg-surface-container/50 transition-colors">
                  <td className="py-5">
                    <p className="text-sm font-bold font-headline text-on-surface">Bio_Infra_Case_Study</p>
                  </td>
                  <td className="py-5 text-sm text-on-surface-variant font-body">Sep 30, 2023 • 23:58</td>
                  <td className="py-5">
                    <a className="text-primary hover:text-primary-dim transition-colors" href="#">
                      <span className="material-symbols-outlined text-[18px]">link</span>
                    </a>
                  </td>
                  <td className="py-5 text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-[10px] font-bold font-label uppercase tracking-tighter">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Submitted
                    </span>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-center">
        <button className="text-xs font-headline text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-bold">View Archive</button>
      </div>
    </div>
  );
};
