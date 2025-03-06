import React from 'react';
import { useGetprofileQuery } from '../../features/auth/authApi';
import "../../App.css";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  const { data: user, error, isLoading } = useGetprofileQuery();
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data...</p>;

  return (
    <div className='nav-common'>
      <Navbar />
    
    <div className="page-container">
      
      <div className="profile-container">
        <h1>User Information</h1>
        <div className="user-info">
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
