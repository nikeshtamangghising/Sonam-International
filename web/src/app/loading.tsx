export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mb-4"></div>
        <h2 className="text-xl font-medium text-gray-900">Loading...</h2>
        <p className="text-gray-600 mt-2">Please wait while we prepare your content.</p>
      </div>
    </div>
  );
}
