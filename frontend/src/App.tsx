import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Assignments } from './pages/student/Assignments';
import { MyGroup } from './pages/student/MyGroup';
import { Submissions } from './pages/student/Submissions';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAssignments } from './pages/admin/AdminAssignments';
import { AdminGroups } from './pages/admin/AdminGroups';
import { AdminSubmissions } from './pages/admin/AdminSubmissions';
import { AdminCourses } from './pages/admin/AdminCourses';
import './index.css';

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'student' | 'admin' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-cyan-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }

  return <>{children}</>;
};

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-cyan-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
      <Route path="/register" element={<AuthRedirect><Register /></AuthRedirect>} />

      {/* Student Routes */}
      <Route path="/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
      <Route path="/assignments" element={<ProtectedRoute allowedRole="student"><Assignments /></ProtectedRoute>} />
      <Route path="/my-group" element={<ProtectedRoute allowedRole="student"><MyGroup /></ProtectedRoute>} />
      <Route path="/submissions" element={<ProtectedRoute allowedRole="student"><Submissions /></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute allowedRole="student"><div>Courses Coming Soon</div></ProtectedRoute>} />
      <Route path="/courses/:id" element={<ProtectedRoute allowedRole="student"><div>Courses Coming Soon</div></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/assignments" element={<ProtectedRoute allowedRole="admin"><AdminAssignments /></ProtectedRoute>} />
      <Route path="/admin/groups" element={<ProtectedRoute allowedRole="admin"><AdminGroups /></ProtectedRoute>} />
      <Route path="/admin/submissions" element={<ProtectedRoute allowedRole="admin"><AdminSubmissions /></ProtectedRoute>} />
      <Route path="/admin/courses" element={<ProtectedRoute allowedRole="admin"><AdminCourses /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
