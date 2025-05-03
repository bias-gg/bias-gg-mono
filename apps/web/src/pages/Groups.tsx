import { StandardLayout } from "@/components/layouts/Standard";
import { useGroups } from "@/hooks/api/groups/useGroups";

export default function Groups() {
  const { data, loading, error } = useGroups();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <StandardLayout>Groups</StandardLayout>;
}
