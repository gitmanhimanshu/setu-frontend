import Link from 'next/link';
import { getSortedBlogsData } from '@/lib/markdown';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Setu AI Email Automation',
  description: 'Read the latest tips, guides, and updates on AI email automation, job hunting, and professional outreach.',
};

export default function BlogList() {
  const allBlogsData = getSortedBlogsData();

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Setu Blog
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
          Insights, tips, and strategies for mastering AI-powered email outreach.
        </p>
      </div>

      <div className="space-y-12">
        {allBlogsData.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts found.</p>
        ) : (
          allBlogsData.map(({ slug, date, title, description, author }) => (
            <div key={slug} className="group flex flex-col items-start justify-between bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={date} className="text-gray-500">
                  {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600 hover:bg-blue-100">
                  {author}
                </span>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-2xl font-semibold leading-6 text-gray-900 group-hover:text-blue-600">
                  <Link href={`/blog/${slug}`}>
                    <span className="absolute inset-0" />
                    {title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
