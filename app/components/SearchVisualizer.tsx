'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchVisualizerProps {
  algorithm: (arr: number[], target: number) => Generator<{ currentIndex: number | null; low?: number; mid?: number; high?: number; found?: number }>;
  algorithmName: string
}

const SearchVisualizer: React.FC<SearchVisualizerProps> = ({ algorithm, algorithmName }) => {
  const [array, setArray] = useState<number[]>([])
  const [target, setTarget] = useState<number>(0)
  const [result, setResult] = useState<number | null>(null)
  const [searching, setSearching] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [low, setLow] = useState<number | null>(null)
  const [mid, setMid] = useState<number | null>(null)
  const [high, setHigh] = useState<number | null>(null)
  const [arrayInput, setArrayInput] = useState('')

  useEffect(() => {
    resetArray()
  }, [])

  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, (_, i) => i * 5).sort((a, b) => a - b)
    setArray(newArray)
    setTarget(newArray[Math.floor(Math.random() * newArray.length)])
    setResult(null)
    setCurrentIndex(null)
    setLow(null)
    setMid(null)
    setHigh(null)
  }

  const handleArrayInput = () => {
    const inputArray = arrayInput.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    if (inputArray.length > 0) {
      setArray(inputArray.sort((a, b) => a - b))
    }
  }

  const runSearch = async () => {
    setSearching(true)
    setResult(null)
    const generator = algorithm([...array], target)
    
    for (const { currentIndex, low, mid, high, found } of generator) {
      setCurrentIndex(currentIndex)
      setLow(low ?? null)
      setMid(mid ?? null)
      setHigh(high ?? null)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (found !== undefined) {
        setResult(found)
        break
      }
    }
    
    setSearching(false)
    setCurrentIndex(null)
    setLow(null)
    setMid(null)
    setHigh(null)
  }

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{algorithmName}</h2>
      <div className="flex flex-wrap mb-4 gap-2">
        <Button onClick={resetArray} disabled={searching} className="mr-2">Reset Array</Button>
        <Button onClick={runSearch} disabled={searching}>Search</Button>
        <Input
          type="number"
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value))}
          placeholder="Enter target value"
          className="mr-2 w-32"
        />
        <Input
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          placeholder="Enter comma-separated numbers"
          className="mr-2 flex-grow"
        />
        <Button onClick={handleArrayInput} disabled={searching}>Set Array</Button>
      </div>
      <div className="mb-4">Target: {target}</div>
      <div className="flex items-center h-16 border border-gray-300 bg-gray-50 rounded-lg overflow-x-auto">
        <AnimatePresence>
          {array.map((value, idx) => (
            <motion.div
              key={idx}
              className={`flex-1 h-full flex items-center justify-center border-r border-gray-300 min-w-[40px] ${
                result === idx ? 'bg-green-500 text-white' :
                currentIndex === idx ? 'bg-yellow-500' :
                low === idx || high === idx ? 'bg-blue-200' :
                mid === idx ? 'bg-purple-300' : ''
              }`}
              initial={{ backgroundColor: '#fff' }}
              animate={{ backgroundColor: result === idx ? '#48bb78' : currentIndex === idx ? '#ecc94b' : low === idx || high === idx ? '#bee3f8' : mid === idx ? '#d6bcfa' : '#fff' }}
              transition={{ duration: 0.3 }}
            >
              {value}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-4 text-sm">
        <p>Current Index: {currentIndex !== null ? currentIndex : 'N/A'}</p>
        <p>Low: {low !== null ? low : 'N/A'}</p>
        <p>Mid: {mid !== null ? mid : 'N/A'}</p>
        <p>High: {high !== null ? high : 'N/A'}</p>
      </div>
      {result !== null && (
        <div className="mt-4 font-semibold">
          {result === -1
            ? `Target ${target} not found in the array.`
            : `Target ${target} found at index ${result}.`}
        </div>
      )}
    </div>
  )
}

export default SearchVisualizer

