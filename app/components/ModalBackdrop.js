import React from 'react';
import { motion } from 'framer-motion';

const ModalBackdrop = () => {
  const backdropVariants = {
    open: { opacity: 0.5 },
    closed: { opacity: 0 },
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      transition={{ duration: 0.2 }}
      variants={backdropVariants}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    />
  );
};

export default ModalBackdrop;
