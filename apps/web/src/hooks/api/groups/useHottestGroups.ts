import { Group } from "@repo/types/groups/GroupType.js";
import { useQuery } from "@tanstack/react-query";
import { GROUPS_QUERY_KEYS } from "./constants";
import { GroupsService } from "@/lib/services/GroupsService";
import { useAuth } from "@clerk/clerk-react";

type HottestGroupsResult = {
  data: Group[];
  isLoading: boolean;
  error: Error | null;
};

export const useHottestGroups = (limit = 10): HottestGroupsResult => {
  const { getToken } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: GROUPS_QUERY_KEYS.HOTTEST,
    queryFn: async () =>
      GroupsService.getHottestGroups(limit, await getToken()),
  });

  return {
    data,
    isLoading,
    error,
  };
};
