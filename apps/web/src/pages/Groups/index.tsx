import { StandardLayout } from "@/components/layouts/Standard";
import { useGroups } from "@/hooks/api/groups/useGroups";
import { GroupLink } from "./components/GroupLink";

export default function Groups() {
  const { data, loading, error } = useGroups();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <StandardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((group) => (
          <GroupLink key={group.name} group={group} />
        ))}
      </div>
    </StandardLayout>
  );
}
