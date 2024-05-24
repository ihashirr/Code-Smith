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
	const { user } = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const { signOut } = useContext(AuthContext);

	// const user = "asa";
	// const { profilePic } = useContext(AuthContext);
	// console.log(user.photoURL);


	const [profilePic, setProfilePic] = useState('');
	const links = [
		{ id: 1, link: 'upload', text: 'upload' },
		{ id: 2, link: 'reports', text: 'reports' },
		{ id: 3, link: 'pi', text: 'pi' },
		{ id: 4, link: 'raw', text: 'raw' },
		{ id: 5, link: 'utils', text: 'utils' },
		{ id: 6, link: 'utils', text: 'utils' },
		{ id: 7, link: 'login', text: 'login/signup' }, // Changed 'login/signup' to 'login' for the link, but kept 'login/signup' for the text
	];
	useEffect(() => {
		if (user) {
			//   setUsername(user.displayName);
			setProfilePic(user.photoURL);
			setUsername(user.displayName);
			//   setShowModal(true);
		}
	}, [user]); // Update state when user changes
	return (
		<div>

			<motion.div className="sticky top-0 flex justify-between items-center w-full h-20 px-4 text-black nav backdrop-blur-md"
				style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
			>
				<div className="flex justify-center items-center">
					<h1 className="text-black text-5xl font-signature ml-2">
						<Link href="/" passHref>
							<div className="flex title-font font-medium items-center hover:text-aqua-200 cursor-pointer">
								<Image src={logo} alt="logo" className="w-20 h-20 text-white p-2" />
								<span className="ml-3 text-xl" style={{
									background: 'linear-gradient(to right, cyan, deepskyblue)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
								}}>CodeSmith</span>
							</div>
						</Link>
					</h1>
				</div>
				<div className='flex '>
					<ul
						className="hidden md:flex flex-col md:flex-row md:space"
					>
						{links.map(({ id, link, text }) => (
							<motion.li
								key={id}
								className="nav-links px-4 cursor-pointer capitalize font-medium text-black-500 hover:scale-105 hover:text-pink duration-200 link-underline flex items-center justify-center"
								whileHover={{ scale: 1.1 }}
								transition={{ duration: 0.3 }}
							>
								{id === 6 && user ? (
									<div className="shadow-sm flex flex-col items-center justify-center">
										<Image width={25} height={25} src={profilePic} alt="Profile" className="object-cover rounded-full" />								<p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-skyblue-500 to-blue-500">{username}</p>
									</div>
								) : (
									<Link href={`/${link}`} className="nav-links cursor-pointer capitalize font-medium text-black-500 hover:scale-105 hover:text-pink duration-200 link-underline">
										<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
											{text}
										</div>
									</Link>
								)}
							</motion.li>
						))}


					</ul>
					{user && (
						<motion.button
							key="sign-out-button"
							className="bg-blue-600 text-white rounded px-2 py-1 w-20" // Add flex-shrink-0 here
							onClick={() => signOut()}
						// initial={{ opacity: 0 }} // Initial state: invisible
						// animate={{ opacity: 1 }} // Animate to visible on render
						// exit={{ opacity: 0 }} // Animate to invisible on unmount
						// transition={{ duration: 0.3 }} // Animation duration
						>
							<span>Sign out </span>
						</motion.button>
					)}
				</div>
				<div className=" md:hidden flex items-center">
					<div
						className="cursor-pointer pr-4 z-10 text-teal-500 md:hidden hover:bg-teal-100 hover:text-teal-700 rounded-full p-2 transition duration-200 ease-in-out"
						onClick={() => setNav(!nav)}
					>
						{nav ? <FaTimes size={30} /> : <FaBars size={30} />}
					</div>
				</div>
				{nav && (
					<motion.ul
						className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-gradient-to-b from-black to-gray-800 text-teal-500 md:hidden flex flex-col justify-center items-center z-50 "
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						{links.map(({ id, link, text }) => (
							<motion.li
								key={id}
								className="nav-links px-4 cursor-pointer capitalize font-medium text-black-500 hover:scale-105 hover:text-pink duration-200 link-underline"
								whileHover={{ scale: 1.1 }}
								transition={{ duration: 0.3 }}
							>
								{id == 6 && user ? (
									<img src={user} alt="Profile" />
								) : (
									<Link href={`/${link}`}>{text}</Link>
								)}
							</motion.li>
						))}
					</motion.ul>
				)}
			</motion.div>
		</div>

	);
};

export default Navbar;