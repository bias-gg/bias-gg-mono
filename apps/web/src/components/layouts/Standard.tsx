import { Header } from "@/components/layout/header";
import { PropsWithChildren } from "react";
import { AdminToolbar } from "../admin/AdminToolbar";
import { Sidebar } from "../layout/Sidebar/sidebar";

export const StandardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Sidebar>
        <Header />
        <main className="h-screen px-10 py-8">{children}</main>
        <AdminToolbar />
      </Sidebar>
    </div>
  );
};
