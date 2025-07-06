import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Search } from "lucide-react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { SidebarButton } from "./Sidebar/SidebarButton";

export const Header = forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <header
      ref={ref}
      className="sticky flex gap-3 px-2 py-3 top-0 w-full border-b border-primary bg-white h-16 z-1"
    >
      <SidebarButton />
      <div className="flex items-center gap-2 justify-start">
        <Link
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Bias.gg
        </Link>
      </div>

      <div className="hidden md:flex justify-end gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 stroke-primary-content" />
          <Input
            placeholder="Search photocards..."
            className="pl-10 border border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
});
