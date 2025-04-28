import { CardSchema, Card } from "@repo/types/cards/CardType.ts";
import { Result, Ok, Err } from "ts-results";
import { useQuery } from "@tanstack/react-query";

type ResultType = {
  data: Card[];
  loading: boolean;
};

export const useHottestCards = (): Result<ResultType, Error> => {
  const { data, isPending, error } = useQuery<Card[]>({
    queryKey: ['hottestcards'],
    queryFn: () => fetch('http://localhost:3000/cards').then((res) => res.json()),
  });

  if (error) {
    return Err(error);
  }

  if (isPending) {
    return Ok({ data: [], loading: true });
  }

  const safeParsedData = CardSchema.safeParse(data);

  if (safeParsedData.error) {
    return Err(safeParsedData.error);
  }

  return Ok({ data, loading: false });
};

