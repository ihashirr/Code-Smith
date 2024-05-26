"use client"
import Image from "next/image";
import React from "react";
import cm from "./images/computer.jpg";
import cm1 from "./images/computer.jpg";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

import Link from 'next/link';

const simplifiedPricingPlans = [
	{
		title: "Basic",
		price: "$19/month",
	},
	{
		title: "Pro",
		price: "$49/month",
	},
	{
		title: "Enterprise",
		price: "$99/month",
	},
];

const SimplifiedPricingSection = () => {
	const simplifiedPricingPlans = [
	  {
		title: 'Software Purchase',
		price: '100 DHS',
		href: '/payment',
	  },
	  {
		title: 'Monthly Subscription',
		price: '200 DHS / month',
		href: '/payment',
	  },
	];
  
	return (
	  <section id="pricing" className="text-gray-700 body-font py-12 sm:py-20 bg-gray-50">
		<div className="container px-4 mx-auto">
		  <div className="flex flex-col text-center w-full mb-12 sm:mb-16">
			<motion.h2
			  className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900"
			  initial={{ opacity: 0 }}
			  whileInView={{ opacity: 1 }}
			  transition={{ duration: 0.5 }}
			>
			  Pricing Plans
			</motion.h2>
			<motion.p
			  className="lg:w-2/3 mx-auto leading-relaxed text-base"
			  initial={{ opacity: 0 }}
			  whileInView={{ opacity: 1 }}
			  transition={{ duration: 0.5, delay: 0.2 }}
			>
			  Choose the plan that fits your needs.
			</motion.p>
		  </div>
		  <div className="flex flex-wrap -m-4">
			{simplifiedPricingPlans.map((plan, index) => (
			  <motion.div
				key={index}
				className="p-4 md:w-1/2 w-full"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: index * 0.2 }}
			  >
				<div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
				  <h3 className="text-lg font-bold text-white mb-4">{plan.title}</h3>
				  <h4 className="text-xl font-semibold text-white mb-4">{plan.price}</h4>
				  <Link href={plan.href} className="text-white inline-flex items-center mt-4 font-medium">
					Learn More
					<svg
					  fill="none"
					  stroke="currentColor"
					  strokeLinecap="round"
					  strokeLinejoin="round"
					  strokeWidth="2"
					  className="w-4 h-4 ml-2"
					  viewBox="0 0 24 24"
					>
					  <path d="M5 12h14M12 5l7 7-7 7"></path>
					</svg>
				  </Link>
				</div>
			  </motion.div>
			))}
		  </div>
		</div>
	  </section>
	);
  };
  


// const teamMembers = [
// 	{
// 	  name: "John Doe",
// 	  role: "CEO",
// 	  image: "/path-to-john-image.jpg" // Ensure you have this image in the public folder
// 	},
// 	{
// 	  name: "Jane Smith",
// 	  role: "CTO",
// 	  image: "/path-to-jane-image.jpg" // Ensure you have this image in the public folder
// 	},
// 	{
// 	  name: "Sam Wilson",
// 	  role: "Lead Developer",
// 	  image: "/path-to-sam-image.jpg" // Ensure you have this image in the public folder
// 	},
// 	// Add more team members as needed
//   ];

const TeamSection = () => {
    return (
        <section className="text-gray-100 body-font border-t border-gray-700 py-24 bg-gradient-to-r from-teal-900 via-gray-900 to-teal-900">
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <motion.h1
                        className="sm:text-4xl text-3xl font-bold title-font mb-4 text-white"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Team
                    </motion.h1>
                    <motion.p
                        className="lg:w-2/3 mx-auto leading-relaxed text-base text-white"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Our hard-working team ensures that your data is safe and managed accordingly.
                    </motion.p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="p-2 lg:w-1/3 md:w-1/2 w-full"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="h-full flex items-center border-gray-700 border p-6 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-700 transition duration-300">
                                <div className="flex-grow">
                                    <h2 className="text-white title-font font-medium">{member.name}</h2>
                                    <p className="text-gray-400">{member.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AboutUsSection = () => {
    return (
        <section className="text-gray-100 body-font py-24 bg-gradient-to-r from-teal-900 via-gray-900 to-teal-900">
            <div className="container mx-auto px-5">
                <div className="flex flex-col text-center w-full mb-20">
                    <motion.h2
                        className="text-4xl sm:text-5xl font-bold title-font text-white mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        About Us
                    </motion.h2>
                    <motion.p
                        className="lg:w-2/3 mx-auto leading-relaxed text-base text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        At CodeSmith, we are dedicated to providing top-notch data management solutions. Our mission is to empower businesses with efficient and reliable tools for managing their data, transforming the way they operate.
                    </motion.p>
                </div>
                <div className="flex flex-wrap">
                    <motion.div
                        className="p-4 md:w-1/3 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="h-full bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                            <h3 className="text-lg font-medium text-white mb-4">Our Mission</h3>
                            <p className="leading-relaxed text-base text-gray-400">
                                To provide the best data management and report generation tools that empower businesses to streamline their processes and make informed decisions.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="p-4 md:w-1/3 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="h-full bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                            <h3 className="text-lg font-medium text-white mb-4">Our Vision</h3>
                            <p className="leading-relaxed text-base text-gray-400">
                                To be the leading provider of innovative data management solutions that help businesses grow and succeed in a data-driven world.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="p-4 md:w-1/3 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="h-full bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                            <h3 className="text-lg font-medium text-white mb-4">Our Values</h3>
                            <p className="leading-relaxed text-base text-gray-400">
                                Integrity, Innovation, Customer Focus, and Excellence in everything we do.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
const testimonials = [
	{
		name: "John Doe",
		title: "CEO, Company",
		quote: "CodeSmith has transformed our data management process. It's intuitive and powerful.",
	},
	{
		name: "Jane Smith",
		title: "CTO, Another Company",
		quote: "The report generation feature is a game changer. We save so much time now.",
	}
];

const TestimonialsSection = () => {
    return (
        <section className="text-gray-100 body-font bg-gradient-to-r from-gray-900 via-teal-900 to-gray-900 py-24">
            <div className="container mx-auto px-5">
                <div className="text-center mb-12">
                    <motion.h1
                        className="sm:text-3xl text-2xl font-medium title-font text-white"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        What Our Users Say
                    </motion.h1>
                </div>
                <div className="flex flex-wrap -m-4">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="p-4 md:w-1/2 w-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="h-full bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="flex-grow">
                                        <h2 className="text-white text-lg title-font font-medium">{testimonial.name}</h2>
                                        <p className="text-gray-400">{testimonial.title}</p>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <p className="leading-relaxed text-base text-gray-200">{testimonial.quote}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CallToActionSection = () => {
    return (
        <section className="text-gray-100 body-font bg-gradient-to-r from-teal-900 via-gray-900 to-teal-900 py-24">
            <div className="container mx-auto px-5 flex flex-col items-center">
                <motion.h2
                    className="text-3xl sm:text-4xl font-semibold mb-4 text-center text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Ready to Get Started?
                </motion.h2>
                <motion.p
                    className="mb-8 leading-relaxed text-lg text-center max-w-2xl text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Sign up today to take advantage of our powerful data management and report generation tools. Transform the way you handle data and reports with CodeSmith.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link className="inline-flex text-indigo-600 bg-white border-0 py-3 px-8 focus:outline-none hover:bg-gray-200 rounded text-lg transition duration-300" href="/payment">
                            View Pricing
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

const FeaturesSection = () => {
	const features = [
		{ title: "Data Management", description: "Centralized data storage and management." },
		{ title: "Report Generation", description: "Generate detailed reports with ease." },
		{ title: "Time Efficiency", description: "Save time with automated processes." },
	];

	return (
		<section className="text-gray-700 body-font border-t border-gray-200 bg-gradient-to-r from-teal-900 via-gray-900 to-teal-900 py-24">
			<div className="container px-5 mx-auto">
				<div className="flex flex-col text-center w-full mb-20">
					<motion.h1
						className="sm:text-4xl text-3xl font-bold title-font text-white mb-4"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						What CodeSmith Does
					</motion.h1>
				</div>
				<div className="flex flex-wrap -m-4">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className="p-4 md:w-1/2 lg:w-1/3"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
						>
							<motion.div
								className="flex rounded-lg h-full bg-gray-800 p-8 flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300"
								whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
							>
								<div className="flex items-center mb-3">
									<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-cyan-500 text-white flex-shrink-0">
										{/* Add an icon here if desired */}
									</div>
									<h2 className="text-white text-lg title-font font-medium ml-3">{feature.title}</h2>
								</div>
								<div className="flex-grow">
									<p className="leading-relaxed text-base text-gray-300">{feature.description}</p>
								</div>
							</motion.div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

const LandingPage = () => {

	const [position, setPosition] = useState({ x: 0, y: 0 });

	return (
		<main>
			<section className="relative w-full h-screen bg-gray-900 text-white flex items-center justify-center overflow-hidden">
				<video
					className="absolute top-0 left-0 w-full h-full object-cover"
					src="./codemsith.mp4"
					autoPlay
					loop
					muted
					style={{
						filter: 'blur(10px)', // Apply blur effect
						transform: 'scale(1.1)', // Optional: Scale video to cover blurred edges
					}}
				></video>
				<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
				<div className="relative z-10 text-center">
					<motion.div
						className="title-font sm:text-6xl text-4xl mb-4 font-bold cursor-pointer"
						initial={{ opacity: 0, y: -50 }}
						animate={{ x: position.x, y: position.y, opacity: 1 }}
						transition={{ duration: 1 }}
						whileHover={{ scale: 1.2 }}
						drag="x"
						dragConstraints={{ left: -50, right: 50 }}
						dragElastic={0.2}
						dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
						onDragEnd={() => {
							setPosition({ x: 0 });
						}}
						style={{
							background: 'linear-gradient(90deg, rgba(0,204,255,1) 0%, rgba(0,128,255,1) 50%, rgba(0,204,255,1) 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							transition: 'background 0.3s ease'
						}}
					>
						CodeSmith
					</motion.div>
					<motion.p
						className="mb-8 leading-relaxed sm:text-xl text-lg max-w-xl mx-auto"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
					>
						Where efficiency beats unpracticality.
					</motion.p>
					<motion.div
						className="flex justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, delay: 0.5 }}
					>
						<Link
						href="/payment"
							className="inline-flex text-white bg-indigo-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Start now
						</Link>
					</motion.div>
				</div>
			</section>
			<FeaturesSection />
			<AboutUsSection />
			<TestimonialsSection />
			<SimplifiedPricingSection />
			<TeamSection />
			<CallToActionSection />
			 
		</main>
	);
};

const features = [
	{ title: 'Data Management', description: 'A central database where data will be stored and managed by us.' },
	{ title: 'Report Generator', description: 'Choose what data to include in the report to filter certain data.' },
	{ title: 'Time Efficiency', description: 'Say goodbye to hours of stressful data management, and welcome fast and time-saving solutions.' }
];

const highlights = [
	{ title: 'Data Management', description: 'Keeping your data safe with us is our top priority. Security is number one priority.' },
	{ title: 'Report Generator', description: 'Have a clearer understanding of your data with a report generator to monitor it more efficiently.' },
	{ title: 'Time Efficiency', description: 'Time is crucial. Time is valuable. Time is always on the move just as data management is.' }
];

const teamMembers = [
	{ name: 'Malik Hashir', role: 'Full Stack Developer', image: 'https://dummyimage.com/80x80/edf2f7/a5afbd' },
	{ name: 'Michael Zoorob', role: 'Frontend designer', image: 'https://dummyimage.com/84x84/edf2f7/a5afbd' },
	{ name: 'Mohammad Ayaan', role: 'Designer', image: 'https://dummyimage.com/88x88/edf2f7/a5afbd' },
	{ name: 'Waleed Zahid', role: 'Web designer', image: 'https://dummyimage.com/90x90/edf2f7/a5afbd' },
	{ name: 'Sohail', role: 'Marketing and frontend designer', image: 'https://dummyimage.com/94x94/edf2f7/a5afbd' },
	{ name: 'Peter James', role: 'Marketing and documentation', image: 'https://dummyimage.com/98x98/edf2f7/a5afbd' }
];

export default LandingPage;
