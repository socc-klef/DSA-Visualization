'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

interface ListNode {
  value: number
  next: ListNode | null
}

const LinkedListOperations: React.FC = () => {
  const [head, setHead] = useState<ListNode | null>(null)
  const [value, setValue] = useState('')
  const [position, setPosition] = useState('')

  const addNode = () => {
    if (value !== '') {
      const newNode: ListNode = { value: parseInt(value), next: null }
      if (!head) {
        setHead(newNode)
      } else {
        let current = head
        while (current.next) {
          current = current.next
        }
        current.next = newNode
      }
      setValue('')
    }
  }

  const removeNode = () => {
    if (position !== '' && parseInt(position) >= 0) {
      const pos = parseInt(position)
      if (pos === 0) {
        setHead(head ? head.next : null)
      } else {
        let current = head
        let prev = null
        let index = 0
        while (current && index < pos) {
          prev = current
          current = current.next
          index++
        }
        if (current && prev) {
          prev.next = current.next
        }
      }
      setPosition('')
    }
  }

  const renderList = () => {
    const nodes: JSX.Element[] = []
    let current = head
    while (current) {
      nodes.push(
        <motion.span
          key={current.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="inline-block bg-gray-200 rounded px-2 py-1 m-1"
        >
          {current.value} {current.next && '→'}
        </motion.span>
      )
      current = current.next
    }
    return nodes
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Linked List Operations</h2>
      <div className="flex mb-4">
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
          className="mr-2"
        />
        <Button onClick={addNode}>Add Node</Button>
      </div>
      <div className="flex mb-4">
        <Input
          type="number"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Enter position"
          className="mr-2"
        />
        <Button onClick={removeNode}>Remove Node</Button>
      </div>
      <div className="border border-gray-300 p-4">
        <AnimatePresence>
          {renderList()}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LinkedListOperations

