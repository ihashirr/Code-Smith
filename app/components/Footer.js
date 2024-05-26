import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Footer = () => {
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
    { id: 1, href: '/', text: 'Home', authRequired: false },
    { id: 2, href: '/upload/new', text: 'Upload', authRequired: true },
    { id: 3, href: '/generate/report', text: 'Generate Reports', authRequired: true },
    { id: 4, href: '/payment', text: 'Payment', authRequired: false },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-bold mb-2">CodeSmith</h1>
            <p className="text-gray-400 mb-4">Effortlessly manage your data</p>
          </div>
          <div className="flex flex-col md:flex-row items-center md:space-x-6">
            {links.map(({ id, href, text, authRequired }) => (
              (!authRequired || user) && (
                <Link key={id} href={href} passHref>
                  <motion.p 
                    className="text-lg mb-2 md:mb-0 hover:text-cyan-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {text}
                  </motion.p>
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
                <motion.p
                  className="text-lg mb-2 md:mb-0 hover:text-cyan-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login/Signup
                </motion.p>
              </Link>
            )}
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>© 2023 CodeSmith. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
