import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import React from "react";
import { cn } from "@/lib/utils";

export const ToolbarButton = ToolbarPrimitive.Button;

export const ToolbarSeparator = ToolbarPrimitive.Separator;

export const ToolbarLink = ToolbarPrimitive.Link;

export const ToolbarGroup = ToolbarPrimitive.ToggleGroup;

export const ToolbarGroupItem = ToolbarPrimitive.ToggleItem;

export const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn(className, "flex gap-2 items-center")}
    {...props}
  />
));
