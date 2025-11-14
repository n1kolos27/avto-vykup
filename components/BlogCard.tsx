'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import Card from './ui/Card';
import { getReducedMotionConfig } from '@/lib/utils/accessibility';

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

function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={getReducedMotionConfig({ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }, { duration: 0 })}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`}>
        <Card variant="elevated" hover={true} className="h-full flex flex-col overflow-hidden p-0">
          <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center relative overflow-hidden group">
            {post.image ? (
              <Image
                src={post.image}
                alt={`Изображение статьи: ${post.title}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="text-white text-5xl font-bold opacity-60 group-hover:opacity-80 transition-opacity" aria-hidden="true">
                {post.title.charAt(0)}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-primary-600 font-semibold px-2 py-1 bg-primary-50 rounded">
                {post.category}
              </span>
              <div className="flex items-center space-x-1 text-gray-500 text-sm">
                <FiCalendar size={14} />
                <span>{post.date}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3 flex-1 leading-relaxed">{post.excerpt}</p>
            <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors mt-auto">
              <span>Читать далее</span>
              <motion.div
                className="ml-2"
                whileHover={getReducedMotionConfig({ x: 4 }, {})}
                transition={getReducedMotionConfig({ duration: 0.2 }, { duration: 0 })}
              >
                <FiArrowRight />
              </motion.div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.article>
  );
}

export default React.memo(BlogCard);
