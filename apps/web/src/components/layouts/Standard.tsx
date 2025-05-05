import { Header } from "@/components/layout/header";
import { PropsWithChildren } from "react";
import { SidebarContextProvider } from "../layout/Sidebar/SidebarContext";
import { AdminToolbar } from "../admin/AdminToolbar";

export const StandardLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarContextProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <main className="flex-1">
            <div className="container py-6">
              {children}
            </div>
          </main>
        </div>
        <AdminToolbar />
      </div>
    </SidebarContextProvider>
  );
};
