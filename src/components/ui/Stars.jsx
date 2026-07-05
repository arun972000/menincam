import Icon from './Icon';

/** Gold star rating, accessible label included. */
export default function Stars({ rating = 5, className = '' }) {
  return (
    <div className={`flex items-center gap-0.5 text-gold ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" filled={i < rating} className="h-4 w-4" />
      ))}
    </div>
  );
}
