import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { MembersService } from "@/lib/services/MembersService";
import { MEMBERS_QUERY_KEYS } from "./contants";

export const useDeleteMember = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { getToken } = useAuth();

	return useMutation({
		mutationFn: async (data: {
			memberId: string | number;
			groupId: string | number;
		}) => {
			return MembersService.deleteMember(
				await getToken(),
				data.groupId,
				data.memberId,
			);
		},
		onSuccess: (_, { groupId }) => {
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
