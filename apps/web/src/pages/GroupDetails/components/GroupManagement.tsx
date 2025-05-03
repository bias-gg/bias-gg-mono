import { useState, type JSX } from "react";
import { useAdminContext } from "@/contexts/AdminContext";
import { Group } from "@repo/types/groups/GroupType.js";
import { useMembersForGroup } from "@/hooks/api/members/useMembersForGroup";
import { Artist } from "@repo/types/artists/ArtistType.ts";
import { Button } from "@/components/ui/button";
import { Check, Plus, Trash } from "lucide-react";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { GroupMemberForm } from "./GroupMemberForm";

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

  const onGroupEditSubmit = (e) => {
    e.preventDefault();
    console.log("Edited group", e);
  };

  const onMemberAddClick = (e) => {
    e.preventDefault();
    console.log("Added member", e);
  };

  const onMemberDeleteClick = (memberId) => {
    console.log("Deleted member", memberId);
  };

  const onMemberUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("Updated member", e);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2>Admin</h2>
        <form
          action="#"
          className="flex flex-col gap-2"
          onSubmit={onGroupEditSubmit}
        >
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
          <Button type="submit">Save</Button>
        </form>

        <label htmlFor="name" className="flex flex-col gap-1">
          Members
        </label>
        <div className="flex flex-col gap-2">
          {members.map((member) => (
            <GroupMemberForm key={member.id} member={member} />
          ))}
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onMemberAddClick}>
            <Plus />
            Add member
          </Button>
        </div>
      </div>
    </div>
  );
};
