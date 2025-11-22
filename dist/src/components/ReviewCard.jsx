import React from 'react';
import Card from './ui/Card';
const ReviewCard = ({ review }) => {
    return (<Card className="p-6 h-full">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row gap-1">
          {[...Array(5)].map((_, i) => (<span key={i} className={`text-lg ${i < review.rating ? 'opacity-100' : 'opacity-30'}`}>
              ⭐
            </span>))}
        </div>
        <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">{review.date}</span>
      </div>

      <p className="text-base text-neutral-700 dark:text-neutral-200 leading-6 mb-4 flex-1">{review.text}</p>

      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <div>
          <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{review.name}</span>
          {review.carModel && (<p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{review.carModel}</p>)}
        </div>
      </div>
    </Card>);
};
export default React.memo(ReviewCard);
