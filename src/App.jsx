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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
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
      </Routes>
    </>
  );
}

export default App;
