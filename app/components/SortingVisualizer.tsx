"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortingVisualizerProps {
  algorithms: { [key: string]: (arr: number[]) => Generator<{sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string}, void, unknown> }
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ algorithms }) => {
  const [array, setArray] = useState<number[]>([])
  const [sorting, setSorting] = useState(false)
  const [comparing, setComparing] = useState<[number, number] | null>(null)
  const [swapping, setSwapping] = useState<[number, number] | null>(null)
  const [arrayInput, setArrayInput] = useState('')
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(Object.keys(algorithms)[0])
  const [stepDescription, setStepDescription] = useState<string>('')
  const [sortingStep, setSortingStep] = useState<number>(0)

  useEffect(() => {
    resetArray()
  }, [])

  const resetArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setComparing(null)
    setSwapping(null)
    setStepDescription('')
    setSortingStep(0)
  }

  const handleArrayInput = () => {
    const inputArray = arrayInput.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    if (inputArray.length > 0) {
      setArray(inputArray)
    }
  }

  const runSort = async () => {
    setSorting(true)
    setSortingStep(0)
    const generator = algorithms[selectedAlgorithm]([...array])
    
    for (const { sortedArray, comparing, swapping, description } of generator) {
      setArray([...sortedArray])
      setComparing(comparing)
      setSwapping(swapping)
      setStepDescription(description)
      setSortingStep(prev => prev + 1)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    setComparing(null)
    setSwapping(null)
    setSorting(false)
  }

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sorting Visualizer</h2>
      <div className="flex flex-wrap mb-6 gap-4 justify-center">
        <Button onClick={resetArray} disabled={sorting} className="bg-blue-500 hover:bg-blue-600">Reset Array</Button>
        <Button onClick={runSort} disabled={sorting} className="bg-green-500 hover:bg-green-600">Sort</Button>
        <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(algorithms).map((algo) => (
              <SelectItem key={algo} value={algo}>{algo}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          placeholder="Enter comma-separated numbers"
          className="w-64"
        />
        <Button onClick={handleArrayInput} disabled={sorting} className="bg-purple-500 hover:bg-purple-600">Set Array</Button>
      </div>
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Current Array:</h3>
        <div className="flex justify-center items-center gap-2">
          {array.map((value, idx) => (
            <motion.div
              key={idx}
              className={`w-12 h-12 flex items-center justify-center rounded-lg text-white font-bold text-lg
                ${comparing && (comparing[0] === idx || comparing[1] === idx)
                  ? 'bg-yellow-500'
                  : swapping && (swapping[0] === idx || swapping[1] === idx)
                  ? 'bg-green-500'
                  : 'bg-blue-500'
              }`}
              animate={{ scale: [1, 1.1, 1], transition: { duration: 0.3 } }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Sorting Process:</h3>
        <p className="text-lg mb-2">Step {sortingStep}: {stepDescription}</p>
      </div>
    </div>
  )
}

export default SortingVisualizer

