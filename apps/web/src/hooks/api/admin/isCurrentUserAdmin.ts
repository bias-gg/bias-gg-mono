import { AdminService } from "@/lib/services/admin/AdminService";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export const QUERY_KEYS = ["isAdmin"];

export const useIsCurrentUserAdmin = (): boolean => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const userId = user?.id;

  console.log("userId", userId);

  const { data, isPending, isError, error } = useQuery<{ isAdmin: boolean }>({
    queryKey: [QUERY_KEYS, userId],
    queryFn: async () => {
      const token = await getToken();
      return AdminService.isCurrentUserAdmin(userId, token);
    } 
  });

  if (isPending || isError) {
    if (error) console.error(error);
    return false;
  }

  return data.isAdmin ?? false;
};
