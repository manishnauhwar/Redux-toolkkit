import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import "../../App.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h1>Welcome</h1>
      <div className="navbar-right">
        <NavLink to="/dashboard/profile">Profile</NavLink>
        {location.pathname !== "/dashboard" && (
          <button className="btn-dashboard" onClick={() => navigate("/dashboard")}>Dashboard</button>
        )}
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
