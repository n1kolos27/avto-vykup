import React from 'react';
import Card from './ui/Card.js';
import Skeleton from './ui/Skeleton.js';

const BlogCardSkeleton: React.FC = () => {
  return (
    <Card className="p-0 overflow-hidden h-full" hover={false}>
      <Skeleton variant="image" className="w-full" />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-row justify-between items-center mb-3">
          <Skeleton variant="text" width={80} height={24} />
          <Skeleton variant="text" width={100} height={20} />
        </div>
        <Skeleton variant="text" width="100%" height={28} className="mb-3" />
        <Skeleton variant="text" lines={3} className="mb-4" />
        <Skeleton variant="text" width={120} height={20} />
      </div>
    </Card>
  );
};

export default BlogCardSkeleton;

