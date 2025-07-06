import { useAuth } from "@clerk/clerk-react";
import type { Artist } from "@repo/types/artists/ArtistType.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { ArtistsService } from "@/lib/services/ArtistsService";
import { MEMBERS_QUERY_KEYS } from "../members/contants";

export const useUpdateArtist = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (data: { id: string | number; artist: Artist }) => {
      return ArtistsService.updateArtist(
        await getToken(),
        data.id,
        data.artist,
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [...MEMBERS_QUERY_KEYS.MEMBERS_FOR_GROUP],
      });
      toast({
        title: "Artist updated",
        description: `${data.name} updated successfully`,
      });
    },
  });
};
