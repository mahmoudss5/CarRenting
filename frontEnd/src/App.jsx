import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import { NotificationProvider } from "./features/notifications/NotificationContext";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";
import AdminOverviewPage from "./Admin/pages/AdminOverviewPage";
import AdminCarsPage from "./Admin/pages/AdminCarsPage";
import AdminRentalsPage from "./Admin/pages/AdminRentalsPage";
import AdminUsersPage from "./Admin/pages/AdminUsersPage";
import AdminVerificationsPage from "./Admin/pages/AdminVerificationsPage";
import OwnerDashboard from "./Owner/OwnerDashboard";
import OwnerHome from "./Owner/OwnerHome";
import CreateCarPostPage from "./Owner/CreateCarPostPage";
import EditCarPostPage from "./Owner/EditCarPostPage";
import OwnerProfileSettings from "./Owner/OwnerProfileSettings";
// Feature pages
import RenterHomePage from "./features/home/RenterHomePage";
import RenterExplorePage from "./features/explore/RenterExplorePage";
import RenterCarDetailPage from "./features/car-detail/RenterCarDetailPage";
import RenterDashboardPage from "./features/dashboard/RenterDashboardPage";
import RenterConfirmRequestPage from "./features/confirm-request/RenterConfirmRequestPage";
import RenterProfileSettingsPage from "./features/profile-settings/RenterProfileSettingsPage";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.22, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminOverviewPage />} />
          <Route path="/admin/cars" element={<AdminCarsPage />} />
          <Route path="/admin/rentals" element={<AdminRentalsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/verifications" element={<AdminVerificationsPage />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/home" element={<OwnerHome />} />
          <Route path="/owner/create-post" element={<CreateCarPostPage />} />
          <Route path="/owner/edit-post/:postId" element={<EditCarPostPage />} />
          <Route path="/owner/settings" element={<OwnerProfileSettings />} />
          <Route path="/owner/*" element={<Navigate to="/owner/home" replace />} />

          {/* Renter Feature Routes */}
          <Route path="/renter-home" element={<RenterHomePage />} />
          <Route path="/renter-explore" element={<RenterExplorePage />} />
          <Route path="/renter-car-detail/:carId" element={<RenterCarDetailPage />} />
          <Route path="/renter-dashboard" element={<RenterDashboardPage />} />
          <Route path="/renter-confirm-request" element={<RenterConfirmRequestPage />} />
          <Route path="/renter-settings" element={<RenterProfileSettingsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  console.log("from the app function")
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: { fontFamily: "Inter, sans-serif" },
          }}
        />
        <AnimatedRoutes />
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
