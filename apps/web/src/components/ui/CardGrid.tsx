
import { cn } from "@/lib/utils";

interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardGrid({ children, className, ...props }: CardGridProps) {
  return (
    <div 
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
