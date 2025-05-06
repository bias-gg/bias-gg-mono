import { Header } from "@/components/layout/header";
import { PropsWithChildren } from "react";
import { AdminToolbar } from "../admin/AdminToolbar";
import { Sidebar } from "../layout/Sidebar/sidebar";

export const StandardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Sidebar>
        <Header />
        <div className="h-screen">
          <main className="px-10 py-8">
            {children}
          </main>
        </div>
        <AdminToolbar />
      </Sidebar>
    </div>
  );
};
