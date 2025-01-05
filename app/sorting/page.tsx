'use client'

import SortingVisualizer from '../components/SortingVisualizer'
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort } from '../utils/sortingAlgorithms'
import Link from 'next/link'

const algorithms = {
  'Bubble Sort': bubbleSort,
  'Selection Sort': selectionSort,
  'Insertion Sort': insertionSort,
  'Merge Sort': mergeSort,
  'Quick Sort': quickSort,
  'Heap Sort': heapSort
};

export default function SortingPage() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold mb-6 text-center">Sorting Algorithms Visualization</h1>
      <SortingVisualizer algorithms={algorithms} />
    </div>
  )
}

