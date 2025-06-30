import { useAuth } from "@clerk/clerk-react";
import type { Artist } from "@repo/types/artists/ArtistType.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { MembersService } from "@/lib/services/MembersService";
import { MEMBERS_QUERY_KEYS } from "./contants";

export const useCreateMember = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { getToken } = useAuth();

	return useMutation({
		mutationFn: async (data: { groupId: string | number; artist: Artist }) => {
			return MembersService.createMember(
				await getToken(),
				data.groupId,
				data.artist,
			);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [...MEMBERS_QUERY_KEYS.MEMBERS_FOR_GROUP],
			});
			toast({
				title: "Member added",
				description: `${data.name} added successfully`,
			});
		},
	});
};
