import React from 'react';

interface EmptyStateProps {
  icon: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => {
  return (
    <div className="group bg-surface-container rounded-xl p-6 border border-outline-variant/10 shadow-xl flex flex-col items-center justify-center h-64 text-center">
      <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-4">{icon}</span>
      <h4 className="text-xl font-bold font-headline text-on-surface-variant">{message}</h4>
    </div>
  );
};
