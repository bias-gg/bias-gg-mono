
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { X } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";

const hash = (data: string): string => {
  // make up a super simple hash function
  return btoa(data);
};

type GroupType = {
  name: string;
  id: string;
  favorite: boolean;
};

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();

  // TODO: replace with real data of the current user's favorited groups
  const groups: GroupType[] = [
    {
      name: "BTS",
      id: hash("BTS" + 1),
      favorite: true,
    },
    {
      name: "BLACKPINK",
      id: hash("BLACKPINK" + 2),
      favorite: false,
    },
    {
      name: "TWICE",
      id: hash("TWICE" + 3),
      favorite: false,
    },
    {
      name: "ATEEZ",
      id: hash("ATEEZ" + 4),
      favorite: true,
    },
  ];

  return (
    <div className={cn(
      "fixed top-0 h-full w-64 bg-background border-r transition-transform duration-300",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-4">
        <div className="flex w-full justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <X />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh)]">
          <div className="space-y-1">
            <LinkButton
              link="/wishlist"
              variant="ghost"
              className="w-full justify-start"
            >
              Wishlist
            </LinkButton>
            <LinkButton
              link="/collection"
              variant="ghost"
              className="w-full justify-start"
            >
              My Collection
            </LinkButton>
            <LinkButton
              link="/groups"
              variant="ghost"
              className="w-full justify-start"
            >
              All Groups 
            </LinkButton>
            {groups.map(({name, id}) => (
              <LinkButton
                key={name}
                link={`/trade/${id}`}
                variant="ghost"
                className="w-full justify-start"
              >
                {name}
              </LinkButton>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
