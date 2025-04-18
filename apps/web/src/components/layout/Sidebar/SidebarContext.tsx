import { createContext, type PropsWithChildren, useContext, useState } from "react";
import { Sidebar } from "./sidebar";

type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarContextProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
      <Sidebar />
    </SidebarContext.Provider>
  );

};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarContextProvider");
  }
  return context;
};
