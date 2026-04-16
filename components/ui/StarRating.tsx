import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  count: number;
};

function Star({ fill }: { fill: 0 | 0.5 | 1 }) {
  return (
    <span className="relative inline-block text-sm leading-none text-border" aria-hidden>
      ★
      <span
        className={cn("absolute inset-0 overflow-hidden text-star")}
        style={{ width: fill === 1 ? "100%" : fill === 0.5 ? "50%" : "0%" }}
      >
        ★
      </span>
    </span>
  );
}

export function StarRating({ rating, count }: StarRatingProps) {
  const normalized = Math.max(0, Math.min(5, rating));

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${normalized} out of 5`}>
        {Array.from({ length: 5 }, (_, index) => {
          const value = index + 1;
          let fill: 0 | 0.5 | 1 = 0;

          if (normalized >= value) {
            fill = 1;
          } else if (normalized >= value - 0.5) {
            fill = 0.5;
          }

          return <Star key={value} fill={fill} />;
        })}
      </div>
      <span className="text-xs text-text-muted">({count} reviews)</span>
    </div>
  );
}
