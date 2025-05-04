import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { TooltipProvider } from "./ui/tooltip";
import { AdminProvider } from "@/contexts/AdminContext";
import { ToastProvider } from "./ui/toast";
import { Toaster } from "./ui/toaster";

const queryClient = new QueryClient();

type AppProvidersProps = PropsWithChildren;

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <ToastProvider>
            {children}
            <Toaster />
          </ToastProvider>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
