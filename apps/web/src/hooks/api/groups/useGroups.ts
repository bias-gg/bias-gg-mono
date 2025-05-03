import { GroupsService } from "@/lib/services/GroupsService";
import { Group } from "@repo/types/groups/GroupType.ts";
import { useQuery } from "@tanstack/react-query";
import { GROUPS_QUERY_KEYS } from "./constants";

type GroupsResult = {
  data: Group[];
  loading: boolean;
  error: Error | null;
};

export const useGroups = (): GroupsResult => {
  const { data, isPending, error} = useQuery({
    queryKey: GROUPS_QUERY_KEYS.ALL_GROUPS,
    queryFn: async () => {
      return GroupsService.getGroups();
    },
  });

  return {
    data: data ?? [],
    loading: isPending,
    error: error ?? null,
  };
};
