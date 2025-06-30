import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GroupsService } from "@/lib/services/GroupsService";
import { GROUPS_QUERY_KEYS } from "./constants";

export const useFollowGroup = () => {
	const queryClient = useQueryClient();
	const { getToken } = useAuth();

	const followGroupMutationData = useMutation({
		mutationFn: async (data: { id: string | number }) => {
			return GroupsService.followGroup(await getToken(), data.id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [...GROUPS_QUERY_KEYS.HOTTEST],
			});
			queryClient.invalidateQueries({
				queryKey: [...GROUPS_QUERY_KEYS.FOLLOWED],
			});
			queryClient.invalidateQueries({
				queryKey: [...GROUPS_QUERY_KEYS.ALL_GROUPS],
				exact: false,
			});
		},
	});

	const unfollowGroupMutationData = useMutation({
		mutationFn: async (data: { id: string | number }) => {
			return GroupsService.unfollowGroup(await getToken(), data.id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [...GROUPS_QUERY_KEYS.HOTTEST],
			});
			queryClient.invalidateQueries({
				queryKey: [...GROUPS_QUERY_KEYS.FOLLOWED],
			});
			queryClient.invalidateQueries({
				queryKey: [...GROUPS_QUERY_KEYS.ALL_GROUPS],
				exact: false,
			});
		},
	});

	return [followGroupMutationData, unfollowGroupMutationData];
};
