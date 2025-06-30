import { useUser } from "@clerk/clerk-react";

export const useIsUserLoggedIn = () => {
	return useUser().user?.id != null;
};
