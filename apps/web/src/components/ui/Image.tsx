import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const imageVariants = cva("image", {
  variants: {
    rounded: {
      top: "rounded-box rounded-b-none",
      bottom: "rounded-box rounded-t-none",
      full: "rounded-box",
    },
    variant: {
      default: "object-cover",
      avatar: "object-cover aspect-square w-full h-full",
    },
  },
  defaultVariants: {
    variant: "default",
    rounded: "full",
  },
});

type ImageProps = ComponentProps<"img"> &
  VariantProps<typeof imageVariants> & { fallbackText?: string };

const LoadedImage = ({
  className,
  variant,
  rounded,
  fallbackText,
  ...props
}: ImageProps) => {
  return (
    <img
      className={cn(imageVariants({ variant, rounded, className }))}
      alt={fallbackText}
      {...props}
    />
  );
};

export const Image = ({ src, fallbackText, ...props }: ImageProps) => {
  // NOTE: Structured this way to make it easier to add a fallback for loading images

  return <LoadedImage src={src} {...props} />;
};
