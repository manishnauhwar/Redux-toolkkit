import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteContactMutation, useGetContactsQuery } from "../../features/contact/contactApi";
import Navbar from "../../components/Navbar/Navbar";
import Profile from "./Profile";
import "../../App.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: contacts, error, isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data...</p>;

  const handleDelete = async (_id) => {
    alert("Are you sure you want to delete contact?");
    try {
      await deleteContact(_id);
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      {profileOpen && <Profile onClose={() => setProfileOpen(false)} />}
      <button className="add-btn" onClick={() => navigate("/dashboard/Addcontact")}>Add New Contact</button>
      <div className="table-container">
        <table className="contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td className="action-buttons">
                    <button onClick={() => navigate(`/dashboard/Viewcontact/${contact._id}`)} className="view-btn">View</button>
                    <button onClick={() => navigate(`/dashboard/Updatecontact/${contact._id}`, { state: { contact } })} className="update-btn">Update</button>
                    <button onClick={() => handleDelete(contact._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">No contacts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
