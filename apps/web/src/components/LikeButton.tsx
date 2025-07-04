import { cva, type VariantProps } from "class-variance-authority";
import { Heart } from "lucide-react";
import React, { useEffect } from "react";
import { useIsUserLoggedIn } from "@/hooks/api/auth/useIsUserLoggedIn";
import { Button } from "./ui/button";

const likeButtonVariants = cva(
  "bg-white rounded-full opacity-50 hover:opacity-100",
  {
    variants: {
      position: {
        topLeft: "absolute top-2",
        topRight: "absolute top-2 right-2",
        bottomLeft: "absolute bottom-2",
        bottomRight: "absolute bottom-2 right-2",
      },
    },
    defaultVariants: {
      position: "topRight",
    },
  },
);

type LikeButtonProps = VariantProps<typeof likeButtonVariants> & {
  isLiked: boolean;
  onLiked: (liked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const LikeButton = ({ isLiked, onLiked }: LikeButtonProps) => {
  const isUserLoggedIn = useIsUserLoggedIn();
  const [statefulIsLiked, setStatefulIsLiked] = React.useState(isLiked);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Unsure if adding this dependency will break the hook, leaving for now
  useEffect(() => {
    if (statefulIsLiked === isLiked) {
      return;
    }

    setStatefulIsLiked(isLiked);
  }, [isLiked]);

  if (!isUserLoggedIn) {
    return null;
  }

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    setStatefulIsLiked(!statefulIsLiked);
    onLiked(!statefulIsLiked, e);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={likeButtonVariants({ position: "topRight" })}
      onClick={handleLike}
    >
      <Heart
        className={`w-full h-full transition-all ${statefulIsLiked ? "text-red-500 fill-red-500" : "text-black fill-transparent"}`}
      />
    </Button>
  );
};
