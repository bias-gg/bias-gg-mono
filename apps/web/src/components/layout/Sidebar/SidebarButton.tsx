import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export const SidebarButton = () => {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X /> : <Menu />}
    </Button>
  )
}
