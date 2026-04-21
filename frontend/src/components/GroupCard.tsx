import React from 'react';
import type { Group } from '../types';

interface GroupCardProps {
  group?: Group;
  isEmpty: boolean;
  onCreateClick?: () => void;
  onAddMemberClick?: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, isEmpty, onCreateClick, onAddMemberClick }) => {
  return (
    <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <span className="material-symbols-outlined text-8xl">hub</span>
      </div>
      <h3 className="text-sm font-bold font-headline tracking-widest text-primary/80 uppercase mb-6">Active Research Group</h3>
      
      {isEmpty || !group ? (
        <>
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-on-surface-variant font-body">No group created yet</p>
          </div>
          <button onClick={onCreateClick} className="w-full py-3 rounded-xl bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed font-bold font-headline flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform mt-auto">
            <span className="material-symbols-outlined text-lg">group_add</span>
            <span>Create Group</span>
          </button>
        </>
      ) : (
        <>
          <div id="group-content">
            <div className="mb-8">
              <h4 className="text-3xl font-bold font-headline text-on-surface mb-1">{group.name}</h4>
            </div>
            <div className="space-y-4 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {group.members?.map((member) => (
                <div key={member._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-surface font-body">
                        {member.name} {member.id === group.owner._id && '(Owner)'}
                      </p>
                    </div>
                  </div>
                  {member.id === group.owner._id && (
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  )}
                </div>
              ))}
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
