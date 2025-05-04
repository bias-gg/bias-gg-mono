import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MembersService } from "@/lib/services/MembersService";
import { Artist } from "@repo/types/artists/ArtistType.ts";
import { useAuth } from "@clerk/clerk-react";
import { MEMBERS_QUERY_KEYS } from "./contants";
import { useToast } from "@/hooks/useToast";

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
