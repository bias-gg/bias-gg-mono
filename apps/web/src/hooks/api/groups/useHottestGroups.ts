import { Group } from "@repo/types/groups/GroupType.js";
import { useQuery } from "@tanstack/react-query";
import { GROUPS_QUERY_KEYS } from "./constants";
import { GroupsService } from "@/lib/services/GroupsService";

type HottestGroupsResult = {
  data: Group[];
  isLoading: boolean;
  error: Error | null;
};

export const useHottestGroups = (limit = 10): HottestGroupsResult => {
  const { data, isLoading, error } = useQuery({
    queryKey: GROUPS_QUERY_KEYS.HOTTEST,
    queryFn: () => GroupsService.getHottestGroups(limit),
  });

  return {
    data,
    isLoading,
    error,
  };
};
