import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import Signup from "../components/Register";
import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../components/Dashboard/Profile";
import Addcontact from "../components/Dashboard/Addcontact";
import Viewcontact from '../components/Dashboard/Viewcontact';
import UpdateContact from "../components/Dashboard/Updatecontact";

const AppRouter = () => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/sign-up" element={token ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/profile/" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard/Addcontact/" element={<ProtectedRoute><Addcontact /></ProtectedRoute>} />
        <Route path="/dashboard/Updatecontact/:id" element={<ProtectedRoute><UpdateContact/></ProtectedRoute>} />
        <Route path="/dashboard/Viewcontact/:id" element={<ProtectedRoute><Viewcontact /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
