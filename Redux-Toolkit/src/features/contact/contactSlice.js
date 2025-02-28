import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: { contacts: [] },
  reducers: {
    setContact: (state, action) => {
      state.contacts = action.payload.contact;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload.contact);
    },
    updateContact: (state, action) => {
      state.contacts = state.contacts.map((contact) =>
        contact.id === action.payload.contact.id ? action.payload.contact : contact
      );
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload.id);
    },
  },
});

export const { setContact, addContact, updateContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
