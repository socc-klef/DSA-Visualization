import StackQueueOperations from '../components/StackQueueOperations'
import Link from 'next/link'

export default function StackQueuePage() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold mb-6">Stack and Queue Operations</h1>
      <StackQueueOperations />
    </div>
  )
}

