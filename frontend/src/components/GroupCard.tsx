import React from 'react';

interface GroupCardProps {
  isEmpty: boolean;
  onCreateClick?: () => void;
  onAddMemberClick?: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ isEmpty, onCreateClick, onAddMemberClick }) => {
  return (
    <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <span className="material-symbols-outlined text-8xl">hub</span>
      </div>
      <h3 className="text-sm font-bold font-headline tracking-widest text-primary/80 uppercase mb-6">Active Research Group</h3>
      
      {isEmpty ? (
        <>
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-on-surface-variant font-body">No group created yet</p>
          </div>
          <button onClick={onCreateClick} className="w-full py-3 rounded-xl bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed font-bold font-headline flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform mt-auto">
            <span className="material-symbols-outlined text-lg">group_add</span>
            <span>Create or Join Group</span>
          </button>
        </>
      ) : (
        <>
          <div id="group-content">
            <div className="mb-8">
              <h4 className="text-3xl font-bold font-headline text-on-surface mb-1">Neural Nexus</h4>
            </div>
            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full object-cover border border-primary/20" alt="Student avatar portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUrbEUsdb0JMvkMYa8vPFJ4Zwg_vpaN5bRlZKXSc3hXZTn7K1I9wxVowW3rtYvYV-TzcYQkSN8mt0kxO6ARq6UeoZDjKm83j4eol4KMZweVbRT7ZxzXTyyx4D-6zyn0x5GH3Pua2VrP782KHZKLzAkSvHK0U29FP5Lj0PCKVRjnsAs4rRD5iQQjjTIWkTLpk0OA7DEkb6k09PNAUTZ9h2938isLxHYgyOVJTvd2NtXmd8VTDUga0Vyro8iPRmWf79L7o08HknnmVQ"/>
                  <div>
                    <p className="text-sm font-medium text-on-surface font-body">Alex Chen (You)</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full object-cover border border-outline-variant/20" alt="Female student avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNT3XY5icB2joLojTM1l5Zw8ncUw9BUFVwNQPQkxfct15eSU2Aec0SL-Yew-IXzGsE2yVW9JxNryfAZobLH-JKsa1y8EZS2sczWhW3yIUPPG-E6HQL69zo0OwiZH5LnAtxssXOaDWW4afjGLTA-k9UNojzCjOPjQtr2b19t5sTVGM42_b3Hu97tbHvonYlt3eBHBAnrogJRIrkF4Cw7uEul-bObSuVLKcdC7DjsAThXA6dLmChgkVma2IF4Y3O_eLuAxVPYdZo230"/>
                  <div>
                    <p className="text-sm font-medium text-on-surface font-body">Sarah Miller</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full object-cover border border-outline-variant/20" alt="Male student avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsPypdfAvb9Vw3j4RdLEJDf7FVdyc9KXjgLHhmpFt8NtvxJhPq1XL6DzF3SqoNJUjb78z6yE5R4jrs-9hjR2GqaDcs42nk28Tk9yaLrJenEI81k_rOSNuwL2N_UWq3Ld_xItKxiItXwVaZBgWBwtLtpiMHVgS7BUUiAmzBT1AacWDzU_a2lz5zKHdMPtxueSBkbA5ZiHs_LbBW7xB4v5-gFa8nFJ2_HtaJN1Kw_EOaYNOKHsdpjYcd0aK4862pSmFpWW-GLqxiW34"/>
                  <div>
                    <p className="text-sm font-medium text-on-surface font-body">Jordan Wu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={onAddMemberClick} className="w-full py-3 rounded-xl border border-primary/30 text-primary font-bold font-headline flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors mt-auto">
            <span className="material-symbols-outlined text-lg">person_add</span>
            <span>Add Member</span>
          </button>
        </>
      )}
    </div>
  );
};
