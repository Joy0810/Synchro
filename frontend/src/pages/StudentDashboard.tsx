import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { AssignmentCard } from '../components/AssignmentCard';
import { GroupCard } from '../components/GroupCard';
import { SubmissionTable } from '../components/SubmissionTable';
import { EmptyState } from '../components/EmptyState';

export const StudentDashboard: React.FC = () => {
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface selection:bg-primary/30 min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="ml-64 min-h-screen relative">
        <section className="pt-24 px-12 pb-12 max-w-[1440px] mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold font-headline tracking-tight text-on-surface">Dashboard</h2>
            <p className="text-on-surface-variant mt-2 font-body max-w-2xl">
              {isLoggedIn ? "Welcome back, Alex Chen" : "Welcome, please sign in"}
            </p>
          </div>

          {/* Upcoming Assignments: Bento Row */}
          <div className="mb-16">
            <div className="flex items-end justify-between mb-6">
              <h3 className="text-lg font-bold font-headline tracking-wide uppercase text-primary/80">Upcoming Assignments</h3>
              <a className="text-sm text-primary hover:underline font-label" href="#">View All</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isDataEmpty ? (
                <div className="md:col-span-1">
                  <EmptyState icon="assignment_turned_in" message="No assignments yet" />
                </div>
              ) : (
                <>
                  <AssignmentCard 
                    title="Advanced Algorithms: Final Proof" 
                    status="URGENT" 
                    timeLeft="2h 14m left" 
                  />
                  <AssignmentCard 
                    title="Neural Network Architecture Design" 
                    status="DUE SOON" 
                    timeLeft="Tomorrow, 11:59 PM" 
                  />
                  <AssignmentCard 
                    title="Quantization Methods in Bio-Tech" 
                    status="IN PROGRESS" 
                    timeLeft="3 Days Left" 
                  />
                </>
              )}
            </div>
          </div>

          {/* Second Tier: My Group & Submission History */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <GroupCard isEmpty={isDataEmpty} onCreateClick={() => setIsCreateModalOpen(true)} />
            </div>
            <div className="lg:col-span-2">
              <SubmissionTable isEmpty={isDataEmpty} />
            </div>
          </div>
        </section>

        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-[#131313] border border-[#484847]/30 rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
              <h2 className="text-2xl font-headline font-bold text-white mb-6">Create Group</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-label text-[#adaaaa] mb-1">Group Name *</label>
                  <input type="text" className="w-full bg-[#262626] border border-[#484847]/30 text-white focus:outline-none focus:border-[#81ecff] px-4 py-2 rounded-lg transition-colors" placeholder="e.g. Neural Nexus" required />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-[#484847]/20">
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-sm font-bold text-[#adaaaa] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-2 bg-[#81ecff] hover:bg-[#00d4ec] text-[#003840] rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#81ecff]/10"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Debug Controls */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
          <button 
            onClick={() => setIsDataEmpty(!isDataEmpty)}
            className="px-4 py-2 bg-primary text-on-primary-fixed rounded shadow-lg font-bold font-label text-xs uppercase"
          >
            Toggle Empty State: {isDataEmpty ? 'ON' : 'OFF'}
          </button>
          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="px-4 py-2 bg-secondary text-secondary-container rounded shadow-lg font-bold font-label text-xs uppercase"
            style={{ backgroundColor: '#81f3e5', color: '#006a62' }}
          >
            Toggle Login: {isLoggedIn ? 'ON' : 'OFF'}
          </button>
        </div>
      </main>
    </div>
  );
};
