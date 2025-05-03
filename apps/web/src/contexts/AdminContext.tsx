import { useIsCurrentUserAdmin } from "@/hooks/api/admin/isCurrentUserAdmin";
import React from "react";

type AdminContextType = {
  isAdmin: boolean;
};

const AdminContext = React.createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const isAdmin  = useIsCurrentUserAdmin();

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = React.useContext(AdminContext);

  if (!context) {
    throw new Error("useAdminContext must be used within a AdminProvider");
  }

  return context;
};
