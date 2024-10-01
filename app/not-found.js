import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 p-4">
      <div className="text-center w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"> Page Not Found</h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}