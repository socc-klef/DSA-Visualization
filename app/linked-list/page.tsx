import LinkedListOperations from '../components/LinkedListOperations'
import Link from 'next/link'

export default function LinkedListPage() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold mb-6">Linked List Operations</h1>
      <LinkedListOperations />
    </div>
  )
}

