import { GroupsService } from "@/lib/services/GroupsService";
import { Group } from "@repo/types/groups/GroupType.ts";
import { useQuery } from "@tanstack/react-query";

const GROUPS_QUERY_KEY = ["groups"];

type GroupsResult = {
  data: Group[];
  loading: boolean;
  error: Error | null;
};

export const useGroups = (): GroupsResult => {
  const { data, isPending, error} = useQuery({
    queryKey: GROUPS_QUERY_KEY,
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
