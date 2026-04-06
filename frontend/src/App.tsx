import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentDashboard } from './pages/StudentDashboard';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Assignments } from './pages/student/Assignments';
import { MyGroup } from './pages/student/MyGroup';
import { Submissions } from './pages/student/Submissions';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAssignments } from './pages/admin/AdminAssignments';
import { AdminGroups } from './pages/admin/AdminGroups';
import { AdminSubmissions } from './pages/admin/AdminSubmissions';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/my-group" element={<MyGroup />} />
        <Route path="/submissions" element={<Submissions />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/assignments" element={<AdminAssignments />} />
        <Route path="/admin/groups" element={<AdminGroups />} />
        <Route path="/admin/submissions" element={<AdminSubmissions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
