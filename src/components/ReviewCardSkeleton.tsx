import React from 'react';
import Card from './ui/Card.js';
import Skeleton from './ui/Skeleton.js';

const ReviewCardSkeleton: React.FC = () => {
  return (
    <Card className="p-6 h-full" hover={false}>
      <div className="flex flex-row justify-between items-center mb-4">
        <Skeleton variant="text" width={120} height={24} />
        <Skeleton variant="text" width={80} height={20} />
      </div>

      <div className="mb-4">
        <Skeleton variant="text" lines={3} />
      </div>

      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="text" width={150} height={16} className="mt-2" />
      </div>
    </Card>
  );
};

export default ReviewCardSkeleton;

