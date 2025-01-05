'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'framer-motion'

const ArrayOperations: React.FC = () => {
  const [array, setArray] = useState<number[]>([])
  const [value, setValue] = useState('')
  const [index, setIndex] = useState('')

  const addElement = () => {
    if (value !== '') {
      setArray(prev => [...prev, parseInt(value)])
      setValue('')
    }
  }

  const removeElement = () => {
    if (index !== '' && parseInt(index) >= 0 && parseInt(index) < array.length) {
      setArray(prev => prev.filter((_, i) => i !== parseInt(index)))
      setIndex('')
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Array Operations</h2>
      <div className="flex mb-4">
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
          className="mr-2"
        />
        <Button onClick={addElement} className="mr-2">Add Element</Button>
      </div>
      <div className="flex mb-4">
        <Input
          type="number"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          placeholder="Enter index"
          className="mr-2"
        />
        <Button onClick={removeElement}>Remove Element</Button>
      </div>
      <div className="border border-gray-300 p-4">
        <AnimatePresence>
          {array.map((item, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="inline-block bg-gray-200 rounded px-2 py-1 m-1"
            >
              {item}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ArrayOperations

