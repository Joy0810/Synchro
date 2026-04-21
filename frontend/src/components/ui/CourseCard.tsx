import React from 'react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  submittedCount: number;
  totalAssignments: number;
  onClick?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, submittedCount, totalAssignments, onClick }) => {
  const percent = totalAssignments > 0 ? (submittedCount / totalAssignments) * 100 : 0;
  
  let borderColor = 'border-l-red-500';
  let fillColor = 'bg-red-500';
  
  if (percent === 100) {
    borderColor = 'border-l-emerald-400';
    fillColor = 'bg-emerald-400';
  } else if (percent > 0) {
    borderColor = 'border-l-yellow-400';
    fillColor = 'bg-yellow-400';
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-[#1a1919] border border-white/5 ${borderColor} border-l-4 rounded-xl p-6 hover:bg-[#201f1f] hover:border-white/10 transition-all cursor-pointer group flex flex-col h-full`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold font-label tracking-wider uppercase">
          {course.courseCode}
        </span>
        <span className="material-symbols-outlined text-zinc-600 group-hover:text-primary transition-colors text-xl">
          arrow_forward
        </span>
      </div>
      
      <div className="flex-1">
        <h4 className="text-xl font-bold text-white font-headline leading-tight mb-2">
          {course.title}
        </h4>
        <p className="text-sm text-zinc-400 font-body">
          {course.createdBy?.name || 'Professor'}
        </p>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-zinc-500 font-label uppercase tracking-widest font-bold">
            {submittedCount}/{totalAssignments} submitted
          </span>
        </div>
        <div className="w-full bg-[#262626] rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full ${fillColor} transition-all duration-500`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
