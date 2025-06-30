import { type MutableRefObject, useEffect, useState } from "react";

export const useInfiniteScroll = (
	intersectionObserverTarget: MutableRefObject<HTMLElement | null>,
	onScroll: () => void,
) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	// biome-ignore lint/correctness/useExhaustiveDependencies: Unsure if adding this dependency will break the effect, so holding off for now.
	useEffect(() => {
		if (!intersectionObserverTarget.current) {
			return;
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (isIntersecting) {
					return;
				}

				if (!entry.isIntersecting) {
					return;
				}

				onScroll();
				setIsIntersecting(true);

				// Debounce our scroll events by a few ms to avoid jerking around as content loads in from our new page
				setTimeout(() => {
					setIsIntersecting(false);
				}, 500);
			});
		});

		observer.observe(intersectionObserverTarget.current);

		return () => {
			observer.disconnect();
		};
	}, [intersectionObserverTarget, onScroll]);
};
