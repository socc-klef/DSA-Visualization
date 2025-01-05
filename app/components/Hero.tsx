'use client'

import { motion } from 'framer-motion'
import { BackgroundGradient } from '../../components/ui/background-gradient'

const Hero = () => {
  return (
    <BackgroundGradient className="py-20">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Visualize Data Structures & Algorithms
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-gray-300"
        >
          Interactive visualizations to help you understand complex concepts in computer science
        </motion.p>
        <motion.a
          href="#algorithms"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 inline-block"
        >
          Explore Algorithms
        </motion.a>
      </div>
    </BackgroundGradient>
  )
}

export default Hero

