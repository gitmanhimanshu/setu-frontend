import { getBlogData, getSortedBlogsData } from '@/lib/markdown';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const postData = await getBlogData(resolvedParams.slug);
    return {
      title: `${postData.title} | Setu Blog`,
      description: postData.description,
    };
  } catch {
    return {
      title: 'Blog Not Found | Setu',
    };
  }
}

export async function generateStaticParams() {
  const blogs = getSortedBlogsData();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  try {
    const resolvedParams = await params;
    const postData = await getBlogData(resolvedParams.slug);

    return (
      <article className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
            ← Back to all posts
          </Link>
        </div>
        
        <header className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-6">
            {postData.title}
          </h1>
          <div className="flex items-center gap-x-4 text-sm text-gray-500">
            <time dateTime={postData.date}>
              {new Date(postData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span>•</span>
            <span className="font-medium text-gray-900">{postData.author}</span>
          </div>
        </header>

        <div 
          className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500"
          dangerouslySetInnerHTML={{ __html: postData.content }} 
        />
      </article>
    );
  } catch (error) {
    notFound();
  }
}
