"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState, useContext, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../images/c.png';
import Image from 'next/image';

import { AuthContext } from '../components/AuthContext'; // Import AuthContext
const Navbar = () => {
	const [nav, setNav] = useState(false);
	const { user, signOut } = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [profilePic, setProfilePic] = useState('');
	const [mounted, setMounted] = useState(false);
  
	useEffect(() => {
	  if (user) {
		setProfilePic(user.photoURL);
		setUsername(user.displayName);
	  }
	  setMounted(true); // Component is mounted
	}, [user]);
  
	const links = [
	  { id: 1, link: 'payment', text: 'Payment', authRequired: false },
	  { id: 2, link: 'upload', text: 'Data manager', authRequired: true },
	  { id: 3, link: 'upload/Reports', text: 'Report', authRequired: true },
	  { id: 4, link: 'Create', text: 'Create', authRequired: true },
	];
  
	if (!mounted) {
	  return null;
	}
  
	return (
	  <motion.div className="sticky top-0 w-full z-50 bg-black shadow-md"
		initial={{ y: -100 }}
		animate={{ y: 0 }}
		transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
	  >
		<div className="flex justify-between items-center h-20 px-4 text-white nav">
		  <div className="flex items-center">
			<Link href="/" passHref>
			  <div className="flex items-center cursor-pointer">
				<Image src={logo} alt="logo" className="w-20 h-20 p-2" />
				<span className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
				  CodeSmith
				</span>
			  </div>
			</Link>
		  </div>
		  <div className="hidden md:flex space-x-4 items-center">
			{links.map(({ id, link, text, authRequired }) => (
			  (!authRequired || user) && (
				<Link key={id} href={`/${link}`} passHref>
				  <motion.a
					className="px-4 py-2 font-medium hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 hover:bg-clip-text transition duration-200"
					whileHover={{ scale: 1.1 }}
					transition={{ duration: 0.3 }}
				  >
					{text}
				  </motion.a>
				</Link>
			  )
			))}
			{user ? (
			  <div className="flex items-center space-x-2">
				<Image width={32} height={32} src={profilePic} alt="Profile" className="object-cover rounded-full" />
				<p className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">{username}</p>
				<motion.button
				  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white rounded px-2 py-1"
				  onClick={() => signOut()}
				  whileHover={{ scale: 1.1 }}
				  transition={{ duration: 0.3 }}
				>
				  Sign out
				</motion.button>
			  </div>
			) : (
			  <Link href="/login" passHref>
				<motion.a
				  className="px-4 py-2 font-medium hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 hover:bg-clip-text transition duration-200"
				  whileHover={{ scale: 1.1 }}
				  transition={{ duration: 0.3 }}
				>
				  Login/Signup
				</motion.a>
			  </Link>
			)}
		  </div>
		  <div className="md:hidden flex items-center">
			<div
			  className="cursor-pointer text-teal-500 hover:bg-teal-100 hover:text-teal-700 rounded-full p-2 transition duration-200"
			  onClick={() => setNav(!nav)}
			>
			  {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
			</div>
		  </div>
		</div>
		{nav && (
		  <motion.ul
			className="absolute top-20 right-0 w-64 bg-black shadow-lg rounded-lg z-50 flex flex-col items-start p-4 space-y-4 md:hidden"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		  >
			{links.map(({ id, link, text, authRequired }) => (
			  (!authRequired || user) && (
				<Link key={id} href={`/${link}`} passHref>
				  <motion.a
					className="text-lg font-medium text-white hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 hover:bg-clip-text transition duration-200"
					whileHover={{ scale: 1.1 }}
					transition={{ duration: 0.3 }}
					onClick={() => setNav(false)}
				  >
					{text}
				  </motion.a>
				</Link>
			  )
			))}
			{user ? (
			  <div className="flex items-center space-x-2 w-full">
				<Image width={32} height={32} src={profilePic} alt="Profile" className="object-cover rounded-full" />
				<p className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">{username}</p>
			  </div>
			) : (
			  <Link href="/login" passHref>
				<motion.a
				  className="text-lg font-medium text-white hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 hover:bg-clip-text transition duration-200 w-full"
				  whileHover={{ scale: 1.1 }}
				  transition={{ duration: 0.3 }}
				  onClick={() => setNav(false)}
				>
				  Login/Signup
				</motion.a>
			  </Link>
			)}
			{user && (
			  <motion.button
				className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white rounded px-4 py-2 w-full"
				onClick={() => signOut()}
				whileHover={{ scale: 1.1 }}
				transition={{ duration: 0.3 }}
			  >
				Sign out
			  </motion.button>
			)}
		  </motion.ul>
		)}
	  </motion.div>
	);
  };
  
  export default Navbar;
  