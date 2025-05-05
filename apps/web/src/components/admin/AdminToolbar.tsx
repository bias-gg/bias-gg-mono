import { useIsCurrentUserAdmin } from "@/hooks/api/admin/isCurrentUserAdmin";
import { Button } from "../ui/button";
import { Eye, EyeClosed, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { TooltipButton } from "../ui/tooltip-button";
import { Toolbar, ToolbarButton } from "../ui/toolbar";
import { useAdminContext } from "@/contexts/AdminContext";

export const AdminToolbar = (): JSX.Element | null => {
  const { isAdmin, setShowAdminTools, showAdminTools } = useAdminContext();

  if (!isAdmin) {
    return null;
  }

  return (
    <Toolbar className="absolute bottom-1 right-1 rounded-md bg-slate-300 border-solid border border-slate-400 p-1">
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
