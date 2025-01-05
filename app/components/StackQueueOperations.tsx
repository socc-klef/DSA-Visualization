'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

const StackQueueOperations: React.FC = () => {
  const [stack, setStack] = useState<number[]>([])
  const [queue, setQueue] = useState<number[]>([])
  const [value, setValue] = useState('')

  const pushStack = () => {
    if (value !== '') {
      setStack(prev => [...prev, parseInt(value)])
      setValue('')
    }
  }

  const popStack = () => {
    if (stack.length > 0) {
      setStack(prev => prev.slice(0, -1))
    }
  }

  const enqueue = () => {
    if (value !== '') {
      setQueue(prev => [...prev, parseInt(value)])
      setValue('')
    }
  }

  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(prev => prev.slice(1))
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Stack and Queue Operations</h2>
      <div className="flex mb-4">
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
          className="mr-2"
        />
        <Button onClick={pushStack} className="mr-2">Push (Stack)</Button>
        <Button onClick={popStack} className="mr-2">Pop (Stack)</Button>
        <Button onClick={enqueue} className="mr-2">Enqueue</Button>
        <Button onClick={dequeue}>Dequeue</Button>
      </div>
      <div className="flex">
        <div className="w-1/2 pr-2">
          <h3 className="text-xl font-bold mb-2">Stack</h3>
          <div className="border border-gray-300 p-4">
            <AnimatePresence>
              {stack.map((item, idx) => (
                <motion.div
                  key={`stack-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-200 rounded px-2 py-1 mb-1"
                >
                  {item}
                </motion.div>
              )).reverse()}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <h3 className="text-xl font-bold mb-2">Queue</h3>
          <div className="border border-gray-300 p-4">
            <AnimatePresence>
              {queue.map((item, idx) => (
                <motion.span
                  key={`queue-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block bg-gray-200 rounded px-2 py-1 m-1"
                >
                  {item} {idx < queue.length - 1 && '→'}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StackQueueOperations

