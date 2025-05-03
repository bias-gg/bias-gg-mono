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
      <div className="flex flex-wrap gap-3">
        {data.map((group) => (
          <GroupLink key={group.name} group={group} />
        ))}
      </div>
    </StandardLayout>
  );
}
