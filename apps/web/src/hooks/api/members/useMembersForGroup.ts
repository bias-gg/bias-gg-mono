import type { Artist } from "@repo/types/artists/ArtistType.ts";
import { useQuery } from "@tanstack/react-query";
import { MembersService } from "@/lib/services/MembersService";
import { MEMBERS_QUERY_KEYS } from "./contants";

type MembersForGroupResponse = {
	members: Artist[];
	isLoading: boolean;
	error: Error | null;
};

type MembersForGroupProps = {
	groupId: string | number;
};

export const useMembersForGroup = ({
	groupId,
}: MembersForGroupProps): MembersForGroupResponse => {
	const { data, error, isPending } = useQuery({
		queryKey: [...MEMBERS_QUERY_KEYS.MEMBERS_FOR_GROUP, groupId],
		queryFn: async () => MembersService.getMembersForGroup(groupId),
	});

	return {
		members: data ?? [],
		isLoading: isPending,
		error,
	};
};
