import React from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/Button";
import { cva, VariantProps } from "class-variance-authority";

const likeButtonVariants = cva("bg-white rounded-full opacity-50 hover:opacity-100", {
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
});

type LikeButtonProps = VariantProps<typeof likeButtonVariants> & {
  isLiked: boolean;
  onLiked: (liked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
};
export const LikeButton = ({ isLiked, onLiked }: LikeButtonProps) => {
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    onLiked(!isLiked, e);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={likeButtonVariants({ position: "topRight" })}
      onClick={handleLike}
    >
      <Heart
        className={`w- h-full transition-all ${isLiked ? "text-red-500 fill-red-500" : "text-black fill-transparent"}`}
      />
    </Button>
  );
};
