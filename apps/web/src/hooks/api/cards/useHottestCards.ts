import { CardSchema, Card } from "@repo/types/cards/CardType.ts";
import { Result, Ok, Err } from "ts-results";
import { useQuery } from "@tanstack/react-query";
import { getApiHost } from "@/lib/apiUtils";

type ResultType = {
  data: Card[];
  loading: boolean;
};

export const useHottestCards = (): Result<ResultType, Error> => {
  const { data, isPending, error } = useQuery<Card[]>({
    queryKey: ['hottestcards'],
    queryFn: () => fetch(`${getApiHost()}/cards/hottest`).then((res) => res.json()),
  });

  if (error) {
    return Err(error);
  }

  if (isPending) {
    return Ok({ data: [], loading: true });
  }

  return Ok({ data, loading: false });
};

