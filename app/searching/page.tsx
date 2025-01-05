'use client'

import SearchVisualizer from '../components/SearchVisualizer'
import { linearSearch, binarySearch } from '../utils/searchingAlgorithms'
import Link from 'next/link'

export default function SearchingPage() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold mb-6">Searching Algorithms Visualization</h1>
      <SearchVisualizer algorithm={linearSearch} algorithmName="Linear Search" />
      <SearchVisualizer algorithm={binarySearch} algorithmName="Binary Search" />
    </div>
  )
}

