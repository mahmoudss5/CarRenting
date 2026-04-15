import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";
import AdminDashboard from "./Admin/AdminDashboard";
import OwnerDashboard from "./Owner/OwnerDashboard";
import OwnerHome from "./Owner/OwnerHome";
import CreateCarPostPage from "./Owner/CreateCarPostPage";
import OwnerProfileSettings from "./Owner/OwnerProfileSettings";

// Feature pages
import RenterHomePage from "./features/home/RenterHomePage";
import RenterExplorePage from "./features/explore/RenterExplorePage";
import RenterCarDetailPage from "./features/car-detail/RenterCarDetailPage";
import RenterDashboardPage from "./features/dashboard/RenterDashboardPage";
import RenterConfirmRequestPage from "./features/confirm-request/RenterConfirmRequestPage";
import RenterProfileSettingsPage from "./features/profile-settings/RenterProfileSettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/home" element={<OwnerHome />} />
        <Route path="/owner/create-post" element={<CreateCarPostPage />} />
        <Route path="/owner/settings" element={<OwnerProfileSettings />} />
        <Route path="/owner/*" element={<Navigate to="/owner/home" replace />} />
        
        {/* Features Routes */}
        <Route path="/renter-home" element={<RenterHomePage />} />
        <Route path="/renter-explore" element={<RenterExplorePage />} />
        <Route path="/renter-car-detail/:carId" element={<RenterCarDetailPage />} />
        <Route path="/renter-dashboard" element={<RenterDashboardPage />} />
        <Route path="/renter-confirm-request" element={<RenterConfirmRequestPage />} />
        <Route path="/renter-settings" element={<RenterProfileSettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;