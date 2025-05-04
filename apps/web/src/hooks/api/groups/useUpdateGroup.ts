import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GroupsService } from "@/lib/services/GroupsService";
import { Group } from "@repo/types/groups/GroupType.ts";
import { GROUPS_QUERY_KEYS } from "./constants";
import { useAuth } from "@clerk/clerk-react";

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (data: {
      id: string | number;
      group: Group;
    }) => {
      return GroupsService.updateGroup(await getToken(), data.id, data.group);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ...GROUPS_QUERY_KEYS.ALL_GROUPS,
          ...GROUPS_QUERY_KEYS.GROUP_BY_ID,
        ],
      });
    },
  });
};
