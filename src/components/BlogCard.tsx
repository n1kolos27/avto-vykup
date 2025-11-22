import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './ui/Card';
import OptimizedImage from './ui/OptimizedImage';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
}

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Card className="p-0 overflow-hidden h-full">
      <button
        onClick={() => navigate(`/blog/${post.slug}`)}
        className="flex flex-col h-full w-full text-left hover:opacity-90 transition-opacity"
      >
        <div className="h-48 bg-primary-600 overflow-hidden">
          {post.image ? (
            <OptimizedImage
              src={post.image}
              alt={`Изображение статьи: ${post.title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center">
              <span className="text-5xl font-bold text-white/60">{post.title.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-row justify-between items-center mb-3">
            <div className="bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded">
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">{post.category}</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <span className="text-sm">📅</span>
              <span className="text-xs text-neutral-600 dark:text-neutral-400">{post.date}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 leading-7">{post.title}</h3>
          <p className="text-base text-neutral-600 dark:text-neutral-300 leading-6 mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-auto">
            <span className="text-base font-semibold text-primary-600 dark:text-primary-400">Читать далее →</span>
          </div>
        </div>
      </button>
    </Card>
  );
};

export default React.memo(BlogCard);
