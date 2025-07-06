import { Menu } from "lucide-react";

export const SidebarButton = () => {
  return (
    <label
      htmlFor="sidebar"
      aria-label="Open sidebar"
      className="btn btn-ghost drawer w-fit"
    >
      <Menu size={18} />
    </label>
  );
};
