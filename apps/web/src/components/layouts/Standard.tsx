import { type PropsWithChildren, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { AdminToolbar } from "../admin/AdminToolbar";
import { Sidebar } from "../layout/Sidebar/Sidebar";

export const StandardLayout = ({ children }: PropsWithChildren) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = headerRef.current?.clientHeight ?? 0;

  return (
    <div>
      <Sidebar>
        <Header ref={headerRef} />
        <main
          className={`h-[calc(100vh-${headerHeight})] bg-base-200 flex flex-col items-center`}
        >
          {children}
        </main>
        <AdminToolbar />
      </Sidebar>
    </div>
  );
};

/** NOTE: Why not just have this in the layout itself?
 * Because we don't want to assume that every page will need this padding...
 * For example, the groups page needs to have this padding set a little
 * differently so that there isn't a big white space at the top of the
 * scrollable content.
 * */
export const StandardLayoutContent = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn("px-10 py-8", className)}>{children}</div>;
};
