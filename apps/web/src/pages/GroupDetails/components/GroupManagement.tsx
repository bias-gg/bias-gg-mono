import { useState, type JSX } from "react";
import { useAdminContext } from "@/contexts/AdminContext";
import { Group } from "@repo/types/groups/GroupType.js";
import { useMembersForGroup } from "@/hooks/api/members/useMembersForGroup";
import { Artist } from "@repo/types/artists/ArtistType.ts";
import { Button } from "@/components/ui/button";
import { Check, Trash } from "lucide-react";

type GroupManagementProps = {
  group: Group;
};

export const GroupManagement = ({
  group,
}: GroupManagementProps): JSX.Element | null => {
  const { isAdmin } = useAdminContext();

  const [newMember, setNewMember] = useState<Artist | null>(null);

  const { members, isLoading, error } = useMembersForGroup({
    groupId: group.id,
  });

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2>Admin</h2>
        <form action="#" className="flex flex-col gap-2">
          <label htmlFor="name" className="flex flex-col gap-1">
            Name
            <input
              type="text"
              name="name"
              defaultValue={group.name}
              className="border divide-slate-400 py-1 px-2"
            />
          </label>

          <label htmlFor="company" className="flex flex-col gap-1">
            Company
            <input
              type="text"
              name="company"
              defaultValue={group.company}
              className="border divide-slate-400 py-1 px-2"
            ></input>
          </label>
          <button type="submit">Save</button>
        </form>

        <label htmlFor="name" className="flex flex-col gap-1">
          Members
        </label>
        <div className="flex flex-col gap-2">
          {members.map((member) => (
            <form key={member.id} className="grid grid-cols-[1fr_auto] gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="hidden">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={member.name}
                  className="border divide-slate-400 py-1 px-2"
                />
              </div>
              <div className="flex gap-1">
                <Button type="submit" size="icon" variant="destructive">
                  <Trash />
                </Button>
                <Button type="submit" size="icon" variant="default">
                  <Check />
                </Button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
};
