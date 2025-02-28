import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../../features/contact/contactApi";
import "../../App.css";
import Navbar from "../Navbar/Navbar";

const ViewContact = () => {
  const { id } = useParams();
  const { data: contact, error, isLoading } = useGetSingleContactQuery(id);

  if (isLoading) return <p>Loading contact details...</p>;
  if (error) return <p>Error fetching contact details.</p>;

  return (
    <div className='nav-common'>
      <Navbar showDashboardButton={true} />
    <div className="page-container">
      
      <div className="profile-container">
        <h2>Contact Details</h2>
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
      </div>
    </div>
    </div>
  );
};

export default ViewContact;
