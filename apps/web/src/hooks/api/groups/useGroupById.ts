import { GroupsService } from "@/lib/services/GroupsService";
import { GROUPS_QUERY_KEYS } from "./constants";
import { useQuery } from "@tanstack/react-query";

export const useGroupById = (id: string | number) => {
  const { data, isPending, error } = useQuery({
    queryKey: [...GROUPS_QUERY_KEYS.GROUP_BY_ID, id],
    queryFn: async () => {
      return GroupsService.getGroupById(id);
    },
  });

  return {
    data: data ?? null,
    loading: isPending,
    error: error ?? null,
  };
};
