import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice'
import '../../App.css'

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handlelogout = (() => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  })
  return (
    <div className='dashboard'>
      <nav className='navbar'>
        <h1>Welcome to Dashboard</h1>
        <div className='navbar-right'>
          <NavLink to="/dashboard/profile" onClick={() => setProfileOpen(true)}>
            Profile
          </NavLink>
          <button className="btn-logout" onClick={handlelogout}>Logout</button>
        </div>
      </nav>

      {profileOpen && <Profile onClose={() => setProfileOpen(false)} />}

    </div>
  )
}

export default Dashboard;