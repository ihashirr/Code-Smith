"use client"

import React, { createContext, useState, useEffect } from 'react';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import '../globals.css'; // Import global styles (optional)
// import { auth, googleProvider } from './utils/firebase'; // Import from firebase.js
// import { signInWithPopup } from "firebase/auth";


function MyContextProvider({ Component, pageProps }) {
  console.log('mycontextprovider is running...');
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyContextProvider;
