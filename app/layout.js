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
				{/* <link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
					crossOrigin="anonymous"
				></link> */}
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
