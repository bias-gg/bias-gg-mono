import { GroupsService } from "@/lib/services/GroupsService";
import { Group } from "@repo/types/groups/GroupType.ts";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { GROUPS_QUERY_KEYS } from "./constants";
import { PaginatedResult } from "@repo/types/results/PaginatedResult.js";

type GroupsResult = {
  data: InfiniteData<PaginatedResult<Group>>;
  fetchNextPage: () => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  error: Error | null;
};

export const useGroups = (limit = 20): GroupsResult => {
  const { data, isPending, isFetchingNextPage, error, fetchNextPage } =
    useInfiniteQuery({
      queryKey: GROUPS_QUERY_KEYS.ALL_GROUPS,
      queryFn: async ({ pageParam }) => {
        if (pageParam.page > pageParam.pages) {
          return {
            data: [],
            total: pageParam.count,
            nextPage: pageParam.page,
            pages: pageParam.pages,
          };
        }
        return GroupsService.getGroups(pageParam.page, pageParam.limit);
      },
      initialPageParam: { page: 1, limit, count: limit, pages: 1 },
      getNextPageParam: (lastPage) => ({
        page: lastPage.nextPage,
        limit,
        count: lastPage.total,
        pages: lastPage.pages,
      }),
    });

  return {
    data,
    isLoading: isPending,
    error: error ?? null,
    fetchNextPage,
    isFetchingNextPage,
  };
};
