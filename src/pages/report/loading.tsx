export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="w-10 h-10 mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-lg text-gray-700">Analyzing your item...</p>
      <p className="text-sm text-gray-400 mt-1">CIRA is decoding quality, ethics, and truth ✨</p>
    </div>
  );
}