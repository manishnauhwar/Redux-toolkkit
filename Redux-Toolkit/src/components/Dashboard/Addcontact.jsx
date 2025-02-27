import React, { useState } from 'react';
import { useCreateContactMutation } from '../../features/contact/contactApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addContact } from '../../features/contact/contactSlice';
import Navbar from '../../components/Navbar/Navbar';
import '../../App.css';

const AddContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [createContact] = useCreateContactMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !String(phone).trim()) {
      alert('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await createContact({
        name: name.trim(),
        email: email.trim(),
        phone: String(phone).trim(),
      }).unwrap();

      dispatch(addContact(response));
      navigate('/dashboard');
    } catch (error) {
      console.error('Adding New Contact Failed', error);
      alert('Error: ' + (error.data?.message || 'Something went wrong'));
    }

    setLoading(false);
  };

  return (
    <div className='nav-common'>
      <Navbar />
    <div className="page-container">
      
      <div className="modal-container">
        <form className="add-contact-form" onSubmit={handleSubmit}>
          <h2>Add Contact</h2>
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
            {loading ? 'Creating contact...' : 'Add Contact'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddContact;
