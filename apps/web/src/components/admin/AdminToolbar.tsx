import { useIsCurrentUserAdmin } from "@/hooks/api/admin/isCurrentUserAdmin";

export const AdminToolbar = (): JSX.Element | null => {
  const isAdmin = useIsCurrentUserAdmin();

  if (!isAdmin) { return null; }

  return <div className="absolute bottom-1 right-1">AdminToolbar</div>;
};
