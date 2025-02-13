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

// New AdminRoute component for protected admin routes
const AdminRoute = ({ children }) => {
  const { user, authenticated } = useAuth();

  if (!authenticated || user?.email !== "admin@directly.com") {
    return <Navigate to="/signin" />;
  }

  return children;
};

const RootRoute = () => {
  const { authenticated, user } = useAuth();

  if (!authenticated) {
    return <Home />;
  }

  // Redirect admin to admin dashboard
  if (user?.email === "admin@directly.com") {
    return <Navigate to="/admin/dashboard" />;
  }

  return <Products />;
};

function App() {
  return (
    <AuthProvider>
      <ProviderContextProvider>
        <Routes>
          <Route path="/" element={<RootRoute />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Routes>
                  <Route path="dashboard" element={<Admin />} />
                  {/* Add more admin routes here as needed */}
                </Routes>
              </AdminRoute>
            }
          />

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
