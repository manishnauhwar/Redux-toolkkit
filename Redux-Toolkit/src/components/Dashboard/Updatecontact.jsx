import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleContactQuery, useUpdateContactMutation } from "../../features/contact/contactApi";
import Navbar from "../../components/Navbar/Navbar";
import "../../App.css";

const UpdateContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const [updateContact] = useUpdateContactMutation();
  const { data: contact } = useGetSingleContactQuery(id, { skip: !id });

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !String(phone).trim()) {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    try {
      await updateContact({ id, updatedData: { name, email, phone } }).unwrap();
      navigate("/dashboard");
    } catch (error) {
      alert("Error: " + (error.data?.message || "Something went wrong."));
    }
    setLoading(false);
  };

  return (
    <div className='nav-common'>
 <Navbar />
    <div className="page-container">
      
      <div className="modal-container">
        <form className="update-contact-form" onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Enter contact"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Updating contact..." : "Update Contact"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateContact;
