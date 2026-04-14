import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import AdminDashboard from './features/admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}