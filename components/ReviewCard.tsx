'use client';

import React from 'react';
import { FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import { getReducedMotionConfig } from '@/lib/utils/accessibility';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  carModel?: string;
}

interface ReviewCardProps {
  review: Review;
  index?: number;
}

function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={getReducedMotionConfig({ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }, { duration: 0 })}
      className="h-full"
    >
      <Card variant="elevated" hover={true} className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={getReducedMotionConfig({ duration: 0.3, delay: index * 0.08 + i * 0.05 }, { duration: 0 })}
              >
                <FiStar
                  className={`${
                    i < review.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                  size={18}
                />
              </motion.div>
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">{review.date}</span>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed flex-1">{review.text}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="font-semibold text-gray-800">{review.name}</p>
            {review.carModel && (
              <p className="text-sm text-gray-500 mt-1">{review.carModel}</p>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export default React.memo(ReviewCard);
