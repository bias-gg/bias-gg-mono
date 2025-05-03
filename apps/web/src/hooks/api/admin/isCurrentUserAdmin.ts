import { getApiHost } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export const isCurrentUserAdmin = (): boolean => {
  const { user } = useUser();

  const { data, isPending, isError } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["isAdmin", user.id],
    queryFn: () =>
      fetch(`${getApiHost()}/admin/users/isAdmin/${user?.id}`).then((res) =>
        res.json(),
      ),
  });

  if (isPending || isError) {
    return false;
  }

  return data.isAdmin ?? false;
};
