import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MembersService } from "@/lib/services/MembersService";
import { useAuth } from "@clerk/clerk-react";
import { MEMBERS_QUERY_KEYS } from "./contants";
import { useToast } from "@/hooks/useToast";

export const useDeleteMember = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (data: { memberId: string | number, groupId: string | number }) => {
      return MembersService.deleteMember(await getToken(), data.groupId, data.memberId);
    },
    onSuccess: (_, { groupId, }) => {
      queryClient.invalidateQueries({
        queryKey: [...MEMBERS_QUERY_KEYS.MEMBERS_FOR_GROUP, groupId],
      });
      toast({
        title: "Member removed",
        description: `Member removed successfully`,
      });
    },
  });
};
