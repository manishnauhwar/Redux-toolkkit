import React from 'react';
import {useGetprofileQuery } from '../../features/auth/authApi';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { data: user, error, isloading } = useGetprofileQuery();

  if (isloading) return <p>Loading...</p>
  if (error) return <p>Error fetching data...</p>

  return (
    <div className='modal'>
      
      <div className='modal-container'>
        <button className="close-btn" onClick={()=> navigate('/dashboard')}>
          <span>&times;</span>
        </button>
        <h1>User Information</h1>
        <div className="user-info">
        <p>Username:{user?.username}</p>
        <p>Email:{user?.email}</p>
        </div>
      </div>
    </div>
  )
};

export default Profile;