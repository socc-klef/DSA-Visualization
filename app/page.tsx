"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BackgroundGradient } from '../components/ui/background-gradient';
import { CardBody, CardContainer, CardItem } from '../components/ui/3d-card';
import Hero from './components/Hero'

const algorithms = [
  { name: 'Sorting Algorithms', href: '/sorting', color: 'from-blue-500 to-blue-600', icon: '🔢' },
  { name: 'Searching Algorithms', href: '/searching', color: 'from-green-500 to-green-600', icon: '🔍' },
  { name: 'Array Operations', href: '/array-operations', color: 'from-yellow-500 to-yellow-600', icon: '📊' },
  { name: 'Linked List Operations', href: '/linked-list', color: 'from-purple-500 to-purple-600', icon: '🔗' },
  { name: 'Stack and Queue', href: '/stack-queue', color: 'from-red-500 to-red-600', icon: '📚' },
  { name: 'Binary Tree Traversal', href: '/tree', color: 'from-indigo-500 to-indigo-600', icon: '🌳' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Hero />
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12" id="algorithms">Choose an Algorithm or Data Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {algorithms.map((algo, index) => (
            <motion.div
              key={algo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={algo.href}>
                <CardContainer className="inter-var">
                  <CardBody className={`bg-gradient-to-br ${algo.color} relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border`}>
                    <CardItem
                      translateZ="50"
                      className="text-5xl mb-4"
                    >
                      {algo.icon}
                    </CardItem>
                    <CardItem
                      as="h3"
                      translateZ="60"
                      className="text-xl font-bold text-white mb-2"
                    >
                      {algo.name}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="70"
                      className="text-white text-sm opacity-85"
                    >
                      Visualize and interact with {algo.name.toLowerCase()}
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

