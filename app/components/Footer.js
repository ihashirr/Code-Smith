import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { motion } from 'framer-motion';

const Footer = () => {
  const { user } = useContext(AuthContext);

  const links = [
    { id: 1, href: '/', text: 'Home', authRequired: false },
    { id: 2, href: '/upload/new', text: 'Upload', authRequired: true },
    { id: 3, href: '/generate/report', text: 'Generate Reports', authRequired: true },
    { id: 4, href: '/login', text: 'Login', authRequired: false },
    { id: 5, href: '/payment', text: 'Payment', authRequired: false },
  ];

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
