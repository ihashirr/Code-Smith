"use client"
import React, { useState,useContext,useEffect } from 'react';

import { useRouter } from 'next/navigation';
import "..//styling/login.css";
import Layout from "../layout";

import { auth, googleProvider } from '../utils/firebase';
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from '../components/AuthContext'; // Import AuthContext

import Modal from '../components/Modal'; // Import your Modal component
import ModalContent from '../components/ModalBackdrop'; // Import your ModalContent component

export default function App() {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	const { user } = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [profilePic, setProfilePic] = useState('');
	const { signInWithGoogle } = useContext(AuthContext);

	const handleCloseModal = () => {
		setShowModal(false);
	};
	useEffect(() => {
		if (user) {
		  setUsername(user.displayName);
		  setProfilePic(user.photoURL);
		  setShowModal(true);
		}
	  }, [user]); // Update state when user changes
	
	console.log('Current user from context:', user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Form validation
		if (!email || !password) {
			alert('Email and password are required');
			return;
		}

		if (password.length < 6) {
			alert('Password must be at least 6 characters long');
			return;
		}

		// If validation passes, make the fetch request
		try {
			const url = isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/register';
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			if (response.ok) {
				router.push('/');
				setUsername(data.username);
			} else {
				// Handle error
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className="app-container">
			{isLogin ? (
				<div className="login-container">
					<h1>Login</h1>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" id="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
						</div>
						<button type="submit">Login</button>
					</form>
					<p>
						Don't have an account?{' '}
						<a href="#" onClick={() => setIsLogin(false)}>
							Sign up here
						</a>
						<button
							className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2"
							onClick={() => signInWithGoogle()}
						>
							<svg className="w-5 h-5" viewBox="0 0 40 40">
								<path d="M20 3.6c-9.1 0-16.4 7.3-16.4 16.4s7.3 16.4 16.4 16.4 16.4-7.3 16.4-16.4S29.1 3.6 20 3.6zm0 30.4c-7.7 0-14-6.3-14-14s6.3-14 14-14 14 6.3 14 14-6.3 14-14 14zm7.7-20.7v2.8h-2.8v2.8h-2.8v-2.8h-2.8v-2.8h2.8V7.7h2.8v2.8h2.8zm-2.8-2.8h-2.8v2.8h2.8V7.7zm-2.8 2.8v2.8h-2.8v-2.8h2.8zm0 2.8v2.8h-2.8v-2.8h2.8z" fill="#ffffff"></path>
							</svg>
							<span>Sign in with Google</span>
						</button>
						.
					</p>
				</div>
			) : (
				<div className="signup-container">
					<h1>Sign Up</h1>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" id="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
						</div>
						<div className="form-group">
							<label htmlFor="confirm-password">Confirm Password:</label>
							<input type="password" id="confirm-password" name="confirm-password" required />
						</div>
						<button type="submit">Sign Up</button>
					</form>
					<p>
						Already have an account?{' '}
						<a href="#" onClick={() => setIsLogin(true)}>
							Login here
						</a>
						.
					</p>
				</div>
			)}
			{showModal && (
				<div>
					<ModalContent />
					<Modal onClose={handleCloseModal}>
						<h2>Welcome {username}🎉🎉🎊</h2>
						<p>You are signed in now</p>
						{profilePic && <img src={profilePic} alt="Profile" />}
					</Modal>
				</div>
			)}
		</div>
	);
}
