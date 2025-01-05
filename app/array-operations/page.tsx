import ArrayOperations from '../components/ArrayOperations'
import Link from 'next/link'

export default function ArrayOperationsPage() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold mb-6">Array Operations</h1>
      <ArrayOperations />
    </div>
  )
}

