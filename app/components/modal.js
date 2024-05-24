import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ children, onClose }) => {
  const modalVariants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.9 },
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      transition={{ duration: 0.3 }}
      variants={modalVariants}
      style={{
        position: 'fixed',
        top: 50,
        left: '50%',
        transform: 'translate(-50%)',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
      <button onClick={onClose}>Surf the app</button>
    </motion.div>
  );
};

export default Modal;
