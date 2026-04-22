import React from 'react';
import { useNavigate } from 'react-router-dom';

export type AssignmentStatus = 'URGENT' | 'DUE SOON' | 'IN PROGRESS';

export interface AssignmentCardProps {
  title: string;
  status: AssignmentStatus;
  timeLeft: string;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({ title, status, timeLeft }) => {
  const navigate = useNavigate();
  let borderClass = '';
  let badgeBgClass = '';
  let badgeTextClass = '';

  switch (status) {
    case 'URGENT':
      borderClass = 'border-tertiary';
      badgeBgClass = 'bg-tertiary-container';
      badgeTextClass = 'text-on-tertiary-container';
      break;
    case 'DUE SOON':
      borderClass = 'border-yellow-500/50';
      badgeBgClass = 'bg-yellow-500/20';
      badgeTextClass = 'text-yellow-200';
      break;
    case 'IN PROGRESS':
      borderClass = 'border-secondary/30';
      badgeBgClass = 'bg-secondary-container';
      badgeTextClass = 'text-on-secondary-container';
      break;
  }

  return (
    <div className={`group bg-surface-container rounded-xl p-6 transition-all duration-300 hover:bg-surface-container-high border-l-4 ${borderClass} shadow-xl flex flex-col justify-between h-64`}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className={`px-2 py-1 rounded ${badgeBgClass} ${badgeTextClass} text-[10px] font-bold font-label tracking-widest uppercase`}>
            {status}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-bold border transition-colors ${
            status === 'URGENT' 
              ? 'bg-red-500/20 text-red-400 border-red-500/30' 
              : status === 'DUE SOON' 
                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
                : 'bg-green-500/20 text-green-400 border-green-500/30'
          }`}>
            {timeLeft}
          </span>
        </div>
        <h4 className="text-xl font-bold font-headline leading-tight group-hover:text-primary transition-colors">
          {title}
        </h4>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => navigate('/submissions')}
          className="bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed px-6 py-2 rounded-full font-bold font-label text-xs tracking-tighter hover:scale-105 active:scale-95 transition-transform"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};
