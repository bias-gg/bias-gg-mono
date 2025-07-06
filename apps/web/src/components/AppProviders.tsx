import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { AdminProvider } from "@/contexts/AdminContext";
import { Toaster, ToastProvider } from "./ui/Toast";
import { TooltipProvider } from "./ui/Tooltip";

const queryClient = new QueryClient();

type AppProvidersProps = PropsWithChildren;

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <ToastProvider>
            {children}
            {/* Toaster is the root component that displays all toasts. */}
            <Toaster />
          </ToastProvider>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
