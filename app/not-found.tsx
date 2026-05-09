import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-8xl font-black text-primary/20">404</span>
        <h1 className="text-3xl font-bold text-default-900">Page Not Found</h1>
        <p className="text-default-500 max-w-md mx-auto mt-2">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
      </div>
      <div className="flex gap-4 mt-4">
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Go Home
        </Link>
        <Link
          href="/explore"
          className="px-6 py-3 bg-default-100 text-default-700 font-semibold rounded-xl hover:bg-default-200 transition-colors"
        >
          Explore Projects
        </Link>
      </div>
    </div>
  );
}
