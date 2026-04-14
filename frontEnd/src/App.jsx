import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import ExplorePage from './features/explore/ExplorePage';
import CarDetailPage from './features/car-detail/CarDetailPage';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import DashboardPage from './features/dashboard/DashboardPage';
import AdminDashboard from './features/admin/AdminDashboard';
import ProfileSettingsPage from './features/profile-settings/ProfileSettingsPage';
import ConfirmRequestPage from './features/confirm-request/ConfirmRequestPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/cars/:carId" element={<CarDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
        <Route path="/confirmrequest" element={<ConfirmRequestPage />} />
        <Route path="/confirm-request" element={<ConfirmRequestPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}