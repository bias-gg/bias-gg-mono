import React, { useMemo, useState } from "react";
import { useIsCurrentUserAdmin } from "@/hooks/api/admin/isCurrentUserAdmin";

type AdminContextType = {
	isAdmin: boolean;
	showAdminTools: boolean;
	setShowAdminTools: (showAdminBar: boolean) => void;
};

const AdminContext = React.createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
	const [showAdminTools, setShowAdminTools] = useState(false);
	const isAdmin = useIsCurrentUserAdmin();

	const contextValue = useMemo(
		() => ({
			isAdmin,
			showAdminTools: isAdmin && showAdminTools,
			setShowAdminTools,
		}),
		[showAdminTools, isAdmin],
	);

	return (
		<AdminContext.Provider value={contextValue}>
			{children}
		</AdminContext.Provider>
	);
};

export const useAdminContext = () => {
	const context = React.useContext(AdminContext);

	if (!context) {
		throw new Error("useAdminContext must be used within a AdminProvider");
	}

	return context;
};
