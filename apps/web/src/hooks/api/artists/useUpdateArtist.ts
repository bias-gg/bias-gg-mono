import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArtistsService } from "@/lib/services/ArtistsService";
import { Artist } from "@repo/types/artists/ArtistType.ts";
import { useAuth } from "@clerk/clerk-react";
import { MEMBERS_QUERY_KEYS } from "../members/contants";
import { useToast } from "@/hooks/useToast";

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
