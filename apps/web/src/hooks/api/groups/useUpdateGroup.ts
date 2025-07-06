import { useAuth } from "@clerk/clerk-react";
import type { Group } from "@repo/types/groups/GroupType.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { GroupsService } from "@/lib/services/GroupsService";
import { GROUPS_QUERY_KEYS } from "./constants";

export const useUpdateGroup = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (data: { id: string | number; group: Group }) => {
      return GroupsService.updateGroup(await getToken(), data.id, data.group);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          ...GROUPS_QUERY_KEYS.ALL_GROUPS,
          ...GROUPS_QUERY_KEYS.GROUP_BY_ID,
        ],
      });
      toast({
        title: "Group updated",
        description: `${data.name} updated successfully`,
      });
    },
  });
};
