import { Header } from "@/components/layout/header";
import { PropsWithChildren } from "react";
import { SidebarContextProvider } from "../layout/Sidebar/SidebarContext";

export const StandardLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarContextProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <main className="flex-1 lg:ml-64">
            <div className="container py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarContextProvider>
  );
};
