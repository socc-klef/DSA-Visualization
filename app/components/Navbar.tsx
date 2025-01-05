'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-white shadow-md p-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">DSA Visualizer</Link>
        <ul className="flex space-x-4">
          <li><Link href="/sorting" className="hover:text-blue-600 transition-colors">Sorting</Link></li>
          <li><Link href="/searching" className="hover:text-blue-600 transition-colors">Searching</Link></li>
          <li><Link href="/array-operations" className="hover:text-blue-600 transition-colors">Array</Link></li>
          <li><Link href="/linked-list" className="hover:text-blue-600 transition-colors">Linked List</Link></li>
          <li><Link href="/stack-queue" className="hover:text-blue-600 transition-colors">Stack & Queue</Link></li>
        </ul>
      </div>
    </motion.nav>
  )
}

export default Navbar

