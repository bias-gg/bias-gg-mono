import { StandardLayout } from "@/components/layouts/Standard";
import { useGroupById } from "@/hooks/api/groups/useGroupById";
import { useParams } from "react-router-dom";

export default function GroupDetail() {
  const { groupId } = useParams();
  const { data, loading, error } = useGroupById(groupId);


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <StandardLayout>
      <div className="flex flex-wrap gap-4">
        <div className="grid grid-cols-1 gap-4 p-2 rounded-md border border-solid border-border hover:bg-background/80 max-h-96">
          <div className="grid grid-cols-1 gap-2 justify-items-center">
            <img
              width={275}
              height={200}
              src="https://picsum.photos/id/1005/1280/720.webp"
              alt={`${data.name} group`}
              className="aspect-video rounded-md"
              loading="lazy"
            />
            <span>{data.name}</span>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
