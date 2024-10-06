import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Error: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 md:px-8">
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <svg
            className="w-full h-72 md:h-80 mb-8 mx-auto"
            viewBox="0 0 400 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.text
              x="50"
              y="150"
              fontSize="120"
              fontWeight="bold"
              fill="#6366F1"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              4
            </motion.text>
            <motion.circle
              cx="200"
              cy="100"
              r="60"
              stroke="#8B5CF6"
              strokeWidth="15"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.text
              x="270"
              y="150"
              fontSize="120"
              fontWeight="bold"
              fill="#EC4899"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
            >
              4
            </motion.text>
          </svg>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          404 - Page Not Found
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-600 mb-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Oops! It seems like you've taken a wrong turn. Let's get you back home.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 text-white text-lg md:text-xl bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
          >
            <Home className="w-6 h-6 mr-3" />
            Go Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Error;