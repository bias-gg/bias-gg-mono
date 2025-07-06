import type { Artist } from "@repo/types/artists/ArtistType.ts";
import type { Group } from "@repo/types/groups/GroupType.js";
import { Plus } from "lucide-react";
import { type FormEvent, type JSX, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/Button";
import { useAdminContext } from "@/contexts/AdminContext";
import { useUpdateArtist } from "@/hooks/api/artists/useUpdateArtist";
import { useUpdateGroup } from "@/hooks/api/groups/useUpdateGroup";
import { useCreateMember } from "@/hooks/api/members/useCreateMember";
import { useDeleteMember } from "@/hooks/api/members/useDeleteMember";
import { GroupMemberForm } from "./GroupMemberForm";

interface GroupFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  company: HTMLInputElement;
}

interface GroupForm extends HTMLFormElement {
  elements: GroupFormElements;
}

type GroupManagementProps = {
  group: Group;
  members: Artist[];
};

export type NewMember = Pick<Artist, "name"> & { tempId: string };

export const GroupManagement = ({
  group,
  members,
}: GroupManagementProps): JSX.Element | null => {
  const groupId = group.id;
  const { showAdminTools } = useAdminContext();

  const { mutate: createMember } = useCreateMember();
  const { mutate: updateGroup } = useUpdateGroup();
  const { mutate: updateMember } = useUpdateArtist();
  const { mutate: deleteMember } = useDeleteMember();

  const [newMembers, setNewMembers] = useState<NewMember[]>([]);

  const onNewMemberSubmit = (
    member: NewMember,
    event: FormEvent<GroupMemberForm>,
  ) => {
    createMember({
      groupId,
      artist: {
        name: event.currentTarget.elements.name.value,
        createdAt: new Date(),
      },
    });

    setNewMembers(newMembers.filter((m) => m.tempId !== member.tempId));
  };

  const onMemberUpdateSubmit = (
    member: Artist,
    event: FormEvent<GroupMemberForm>,
  ) => {
    const updatedMember = {
      ...member,
      name: event.currentTarget.elements.name.value,
    };

    updateMember({ id: member.id, artist: updatedMember });
  };

  const onNewMemberDeleteClick = (memberId: string) => {
    setNewMembers(newMembers.filter((m) => m.tempId !== memberId));
  };

  const onMemberDeleteClick = (memberId: number) => {
    deleteMember({ memberId, groupId });
  };

  if (!showAdminTools) {
    return null;
  }

  const onGroupEditSubmit = (e: FormEvent<GroupForm>) => {
    e.preventDefault();

    const updatedGroup = {
      ...group,
      name: e.currentTarget.elements.name.value,
      company: e.currentTarget.elements.company.value,
    };

    updateGroup({ id: group.id, group: updatedGroup });
  };

  const onMemberAddClick = () => {
    const members = [...newMembers, { name: "", tempId: uuidv4() }];

    setNewMembers(members);
  };

  return (
    <div className="border border-red rounded-md p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2>Admin Tools</h2>
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
              <GroupMemberForm
                key={member.id}
                member={member}
                onMemberDeleteClick={onMemberDeleteClick}
                onMemberUpdateSubmit={onMemberUpdateSubmit}
              />
            ))}
            {newMembers.map((member) => (
              <GroupMemberForm
                key={member.tempId}
                member={member}
                onMemberDeleteClick={onNewMemberDeleteClick}
                onMemberUpdateSubmit={onNewMemberSubmit}
              />
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
    </div>
  );
};
