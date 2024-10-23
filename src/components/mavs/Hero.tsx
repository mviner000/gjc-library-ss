import Link from "next/link";

export const Hero: React.FC = () => {
  return (
    <section className="h-screen flex w-full flex-col justify-center gap-8 bg-[url(/images/library.jpg)] bg-cover bg-top text-white">
      <div className="text-center">
        <h1 className="text-5xl font-medium italic mb-2 -mt-16">Welcome to</h1>
        <h2 className="text-7xl font-bold mb-8">GJC LIBRARY</h2>
        <div className="flex flex-col justify-center items-center gap-5 mx-10">
          <Link
            href="/browse"
            className="w-32 inline-block px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/team"
            className="w-64 inline-block px-6 py-3 text-lg font-medium bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Proudly Present - Our Team
          </Link>
        </div>
      </div>
    </section>
  );
};
