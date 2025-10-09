'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type PageWrapperProps = {
  children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.625 }}
    >
      {children}
    </motion.div>
  );
};
