import { Image } from "@/components/ui/Image";
import { Badge } from "@/components/ui/Badge";
import { Group } from "@repo/types/groups/GroupType.js";

type GroupLinkProps = {
  group: Group;
};

export const GroupLink = ({ group }: GroupLinkProps) => {
  return (
    <a
      href={`/group/${group.id}`}
      className="card grid grid-rows-[minmax(13rem,1fr)_auto] bg-base-100 shadow-sm max-w-sm"
    >
      <figure className="bg-base-200">
        <Image
          fallbackText={group.name}
          rounded="top"
          draggable={false}
          src="https://picsum.photos/id/1005/1280/720.webp"
          alt={`${group.name} group`}
          className="block w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{group.name}</h2>
        <Badge variant="outline">{group.company}</Badge>
      </div>
    </a>
  );
};
