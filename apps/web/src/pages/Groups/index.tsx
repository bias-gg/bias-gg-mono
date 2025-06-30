import { Fragment, useRef } from "react";
import {
	StandardLayout,
	StandardLayoutContent,
} from "@/components/layouts/Standard";
import { useGroups } from "@/hooks/api/groups/useGroups";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GroupLink } from "./components/GroupLink";

const GROUPS_PER_PAGE = 30;

export default function Groups() {
	const intersectionElement = useRef<HTMLDivElement>(null);
	const {
		data,
		isLoading: loading,
		error,
		fetchNextPage,
		isFetchingNextPage,
	} = useGroups(GROUPS_PER_PAGE);

	useInfiniteScroll(intersectionElement, () => {
		if (isFetchingNextPage) {
			return;
		}

		fetchNextPage();
	});

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<StandardLayout>
			<StandardLayoutContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-full">
				{data.pages.map((page, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: Pages have no unique identifier, so this is the best we can do
					<Fragment key={i}>
						{page.data.map((group) => (
							<GroupLink key={group.name} group={group} />
						))}
					</Fragment>
				))}
				<div ref={intersectionElement} className="h-20"></div>
			</StandardLayoutContent>
		</StandardLayout>
	);
}
