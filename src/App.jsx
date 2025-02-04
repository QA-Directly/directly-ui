import { Route, Routes } from "react-router-dom";
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
import SearchResult from "./pages/SearchResult";
import ProviderApplication from "./pages/ProviderApplication";
import Dashboard from "./pages/Dashboard";
import Provider from "./pages/Provider";
import Profile from "./components/Dashoard/Profile";
import Messages from "./components/Dashoard/Messages";
import Transactions from "./components/Dashoard/Transactions";
import Notifications from "./components/Dashoard/Notifications";
import ResetPassword from "./components/Dashoard/ResetPassword";
import SavedProviders from "./components/Dashoard/SavedProviders";
import Bookings from "./components/Dashoard/Bokings";

const RootRoute = () => {
  const { authenticated } = useAuth();
  return authenticated ? <Products /> : <Home />;
};

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/provider" element={<Provider />} />
            <Route path="/provider" element={<ProviderApplication />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="messages" element={<Messages />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="savedProviders" element={<SavedProviders />} />
              <Route path="resetPassword" element={<ResetPassword />} />
            </Route>
          </Route>
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
      </AuthProvider>
    </>
  );
}

export default App;
