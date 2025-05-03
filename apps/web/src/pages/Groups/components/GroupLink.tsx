import { Group } from "@repo/types/groups/GroupType.js";

type GroupLinkProps = {
  group: Group;
};

export const GroupLink = ({ group }: GroupLinkProps) => {
  return (
    <a
      href={`/group/${group.id}`}
      className="
        flex p-4 justify-center rounded-md border border-solid hover:bg-background/80 shrink grow basis-96"
    >
      <div className="flex flex-col justify-center">
        <img
          src="https://picsum.photos/id/1005/1280/720.webp"
          alt={`${group.name} group`}
          className="block rounded-md"
          loading="lazy"
        />
        <span>{group.name}</span>
      </div>
    </a>
  );
};
