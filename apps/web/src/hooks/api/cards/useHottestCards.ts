import type { Card } from "@repo/types/cards/CardType.ts";
import { useQuery } from "@tanstack/react-query";
import { Err, Ok, type Result } from "ts-results";
import { getApiHost } from "@/lib/apiUtils";

type ResultType = {
	data: Card[];
	loading: boolean;
};

export const useHottestCards = (limit = 10): Result<ResultType, Error> => {
	const { data, isPending, error } = useQuery<Card[]>({
		queryKey: ["hottestcards"],
		queryFn: () =>
			fetch(`${getApiHost()}/cards/hottest?limit=${limit}`).then((res) =>
				res.json(),
			),
	});

	if (error) {
		return Err(error);
	}

	if (isPending) {
		return Ok({ data: [], loading: true });
	}

	return Ok({ data, loading: false });
};
