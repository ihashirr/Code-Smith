"use client"
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./globals.css";
// import MyContextProvider from './components/MyContextProvider'; // Default export
import AuthProvider from './components/AuthContext';
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
	
	return (
		<html lang="en">
			<head>
			</head>
			<body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
		</html>
	);
}
