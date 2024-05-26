"use client";
import { auth, googleProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../Create/firebase';
import { signInWithPopup } from "firebase/auth";
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  signInWithGoogle: () => {},
  signInWithEmail: () => {},
  signUpWithEmail: () => {},
  signOut: () => {},
  formData: {},
  setFormData: () => {},
  saveFormDataById: () => {},
  fetchAllFormData: () => {},
  selectFormData: () => {},
  deleteFormDataById: () => {},
  selectedFormData: null,
  setSelectedFormData: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [allFormData, setAllFormData] = useState([]);
  const [selectedFormData, setSelectedFormData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAllFormData = localStorage.getItem('allFormData');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    if (storedAllFormData) {
      try {
        setAllFormData(JSON.parse(storedAllFormData));
      } catch (error) {
        console.error('Error parsing stored form data:', error);
        localStorage.removeItem('allFormData');
      }
    }
  }, []);

  const saveFormDataById = (id, data) => {
    const updatedAllFormData = [...allFormData, { id, ...data }];
    setAllFormData(updatedAllFormData);
    localStorage.setItem('allFormData', JSON.stringify(updatedAllFormData));
  };

  const fetchAllFormData = () => {
    return allFormData;
  };

  const deleteFormDataById = (id) => {
    const updatedAllFormData = allFormData.filter(item => item.id !== id);
    setAllFormData(updatedAllFormData);
    localStorage.setItem('allFormData', JSON.stringify(updatedAllFormData));
  };

  const selectFormData = (id) => {
    const data = allFormData.find(item => item.id === id);
    setSelectedFormData(data);
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify({
        uid: result.user.uid,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const signUpWithEmail = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify({
        uid: result.user.uid,
        email: result.user.email,
      }));
    } catch (error) {
      console.error('Error with email registration:', error);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify({
        uid: result.user.uid,
        email: result.user.email,
      }));
    } catch (error) {
      console.error('Error with email sign-in:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      formData,
      setFormData,
      saveFormDataById,
      fetchAllFormData,
      selectFormData,
      deleteFormDataById,
      selectedFormData,
      setSelectedFormData,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
