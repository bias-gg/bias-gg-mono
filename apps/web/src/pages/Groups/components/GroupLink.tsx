import { Badge } from "@/components/ui/badge";
import { Group } from "@repo/types/groups/GroupType.js";

type GroupLinkProps = {
  group: Group;
};

export const GroupLink = ({ group }: GroupLinkProps) => {
  return (
    <a href={`/group/${group.id}`} className="card bg-base-100 shadow-sm h-min max-w-sm">
      <figure>
        <img
          draggable={false}
          src="https://picsum.photos/id/1005/1280/720.webp"
          alt={`${group.name} group`}
          className="block w-full"
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className = "card-title">{group.name}</h2>
        <Badge variant="outline">{group.company}</Badge>
      </div>
    </a>
  );
};
