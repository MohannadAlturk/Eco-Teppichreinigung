'use client';

import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ visible }: { visible: boolean }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-50"
        >
          {/* Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1400 180"
            fill="none"
            className="w-64 h-auto mb-8 block"
            aria-label="Eco Teppichreinigung"
          >
            <defs>
              <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
            </defs>
            <text x="700" y="130"
              fontFamily="'Dancing Script', cursive"
              fontWeight="700"
              fontSize="110"
              textAnchor="middle"
              fill="#1a1a1a"
              stroke="#1a1a1a"
              strokeWidth="6"
              paintOrder="stroke fill"
              fontStyle="italic"
            >Eco Teppich-Reinigung</text>
            <text x="700" y="130"
              fontFamily="'Dancing Script', cursive"
              fontWeight="700"
              fontSize="110"
              textAnchor="middle"
              fill="#E8612D"
              stroke="#2a2a2a"
              strokeWidth="2.5"
              paintOrder="stroke fill"
              fontStyle="italic"
            >Eco Teppich-Reinigung</text>
          </svg>

          {/* Spinner */}
          <div className="w-10 h-10 rounded-full border-4 border-primary-100 border-t-primary-500 animate-spin" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
