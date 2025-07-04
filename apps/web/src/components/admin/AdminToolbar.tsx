import { Eye, EyeClosed, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminContext } from "@/contexts/AdminContext";
import { TooltipButton } from "../ui/TooltipButton";
import { Toolbar, ToolbarButton } from "../ui/toolbar";

export const AdminToolbar = (): JSX.Element | null => {
	const { isAdmin, setShowAdminTools, showAdminTools } = useAdminContext();

	if (!isAdmin) {
		return null;
	}

	return (
		<Toolbar className="fixed right-1 bottom-1 w-fit rounded-md bg-slate-300 border-solid border border-slate-400 p-1">
			<ToolbarButton asChild={true}>
				<TooltipButton
					tooltipLabel="Show admin tools"
					variant="ghost"
					size="icon"
					onClick={() => setShowAdminTools(!showAdminTools)}
				>
					{showAdminTools ? <EyeClosed /> : <Eye />}
				</TooltipButton>
			</ToolbarButton>
			<ToolbarButton asChild={true}>
				<TooltipButton
					variant="ghost"
					size="icon"
					asChild={true}
					tooltipLabel="Admin settings"
				>
					<Link to="/admin">
						<Settings size={12} />
					</Link>
				</TooltipButton>
			</ToolbarButton>
		</Toolbar>
	);
};
