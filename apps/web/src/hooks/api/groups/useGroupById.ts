import { useQuery } from "@tanstack/react-query";
import { GroupsService } from "@/lib/services/GroupsService";
import { GROUPS_QUERY_KEYS } from "./constants";

export const useGroupById = (id: string | number) => {
  const { data, isPending, error } = useQuery({
    queryKey: [...GROUPS_QUERY_KEYS.GROUP_BY_ID, id],
    queryFn: async () => {
      return GroupsService.getGroupById(id);
    },
  });

  return {
    group: data ?? null,
    isLoading: isPending,
    error: error ?? null,
  };
};
