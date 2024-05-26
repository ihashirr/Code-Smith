"use client";
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import "../styling/login.css";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { auth, googleProvider } from '../Create/firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../components/AuthContext';
import ModalContent from '../components/ModalBackdrop';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { user, signInWithGoogle, signUpWithEmail, signInWithEmail } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [profilePic, setProfilePic] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || user.email);
      setProfilePic(user.photoURL || '');
      setShowModal(true);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Email and password are required');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      router.push('/upload');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLogin ? (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input type="email" id="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Login</button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <Link href="#" onClick={() => setIsLogin(false)} className="text-blue-500 hover:underline">Sign up here</Link>
            </p>
            <div className="mt-4 flex items-center justify-center">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-red-600 focus:outline-none"
                onClick={signInWithGoogle}
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.1 0 5.9 1.1 8.1 3.2l6.1-6.1C34.8 3.5 29.8 1.5 24 1.5 14.3 1.5 6.1 7.7 3.2 16.3l7.4 5.7c1.4-5.7 6.4-9.8 12.4-9.8z"></path>
                  <path fill="#34A853" d="M44.5 24c0-1.5-.1-2.9-.4-4.3H24v8.3h11.8c-.5 2.8-2 5.2-4.2 6.8l6.5 5.1c3.8-3.5 6-8.7 6-15.9z"></path>
                  <path fill="#FBBC05" d="M10.6 28.1c-.6-1.7-.9-3.6-.9-5.6s.3-3.8.9-5.6L3.2 11.3c-1.5 3-2.4 6.3-2.4 9.9s.8 6.9 2.4 9.9l7.4-5.7z"></path>
                  <path fill="#4285F4" d="M24 44.5c5.8 0 10.7-1.9 14.2-5.2l-6.5-5.1c-2 1.3-4.4 2-7.7 2-6.1 0-11.1-4.1-12.4-9.8l-7.4 5.7c3 8.5 11.2 14.7 19.8 14.7z"></path>
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input type="email" id="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Sign Up</button>
            </form>
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <Link href="#" onClick={() => setIsLogin(true)} className="text-green-500 hover:underline">Login here</Link>
            </p>
          </div>
        )}
      </motion.div>
      {showModal && (
        <div>
          <ModalContent />
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Welcome {username}🎉🎉</h2>
				  <p className="mb-4">You are signed in now</p>
				  {profilePic ? (
					<img src={profilePic} alt="Profile" className="w-16 h-16 rounded-full mx-auto mb-4" />
				  ) : (
					<div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-4">
					  <span className="text-2xl">{username.charAt(0)}</span>
					</div>
				  )}
				  <Link href="/upload" onClick={handleCloseModal} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none">Close</Link>
				</motion.div>
			  </div>
			</div>
		  )}
		</div>
	  );
	  

}
