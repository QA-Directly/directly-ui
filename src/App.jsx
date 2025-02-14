import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import VerificationSuccessPage from "./pages/VerificationSuccess";
import ForgotPasswordSuccess from "./pages/ForgotPasswordSuccess";
import ChangePassword from "./pages/ChangePassword";
import Products from "./pages/Products";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import { ProviderContextProvider } from "./Contexts/ProviderContext";
import SearchResult from "./pages/SearchResult";
import ProviderApplication from "./pages/ProviderApplication";
import Dashboard from "./pages/Dashboard";
import Provider from "./assets/Provider";
import Profile from "./components/Dashoard/Profile";
import Messages from "./components/Dashoard/Messages";
import Transactions from "./components/Dashoard/Transactions";
import Notifications from "./components/Dashoard/Notifications";
import SavedProviders from "./components/Dashoard/SavedProviders";
import Bookings from "./components/Dashoard/Bookings";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import FileUpload from "./components/Dashoard/FileUpload";
import ResetPassword from "./components/Dashoard/ResetPassword";
import ManageProviders from "./components/Admin/ManageProviders";
import ManageUsers from "./components/Admin/ManageUsers";
import Analysis from "./components/Admin/Analysis";
import AdminNotification from "./components/Admin/AdminNotification";

// New AdminRoute component for protected admin routes
const AdminRoute = ({ children }) => {
  const { user, isAdmin, authenticated } = useAuth();

  console.log("is user admin ", isAdmin);

  if (!authenticated || !isAdmin) {
    return <Navigate to="/signin" />;
  }

  return children;
};

const RootRoute = () => {
  const { authenticated, isAdmin } = useAuth();

  if (!authenticated) {
    return <Navigate to="/home" />;
  }

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  return <Navigate to="/products" />;
};

function App() {
  return (
    <AuthProvider>
      <ProviderContextProvider>
        <Routes>
          <Route path="/" element={<RootRoute />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<ManageProviders />} />
            <Route path="manage-provider" element={<ManageProviders />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="notifications" element={<AdminNotification />} />
          </Route>

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Provider />} />
            <Route path="/provider/:id" element={<Provider />} />
            <Route path="/book/:id" element={<Booking />} />
            <Route
              path="/provider/application"
              element={<ProviderApplication />}
            />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="upload" element={<FileUpload />} />
              <Route path="messages" element={<Messages />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="savedProviders" element={<SavedProviders />} />
              <Route path="resetPassword" element={<ResetPassword />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/auth/verify-email"
            element={<VerificationSuccessPage />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/email-sent" element={<ForgotPasswordSuccess />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </ProviderContextProvider>
    </AuthProvider>
  );
}

export default App;
