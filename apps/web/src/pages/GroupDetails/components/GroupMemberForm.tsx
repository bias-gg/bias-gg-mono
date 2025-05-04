import type { FormEvent } from "react";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { useDeleteMember } from "@/hooks/api/members/useDeleteMember";
import { useUpdateArtist } from "@/hooks/api/artists/useUpdateArtist";
import type { Artist } from "@repo/types/artists/ArtistType.js";
import { Check, Trash } from "lucide-react";

interface MemberFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface GroupMemberForm extends HTMLFormElement {
  elements: MemberFormElements;
}

type GroupMemberFormProps = {
  groupId: string | number;
  member: Artist;
};

export const GroupMemberForm = ({ groupId, member }: GroupMemberFormProps) => {
  const { mutate: updateMember } = useUpdateArtist();
  const { mutate: deleteMember } = useDeleteMember();

  const onMemberUpdateSubmit = (event: FormEvent<GroupMemberForm>) => {
    event.preventDefault();
    const updatedMember = {
      ...member,
      name: event.currentTarget.elements.name.value,
    };
    updateMember({ id: member.id, artist: updatedMember });
  };

  const onMemberDeleteClick = (memberId: string | number) => {
    deleteMember({ memberId, groupId });
  };

  return (
    <form
      onSubmit={onMemberUpdateSubmit}
      key={member.id}
      className="grid grid-cols-[1fr_auto] gap-2"
    >
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
        <TooltipButton
          onClick={() => onMemberDeleteClick(member.id)}
          tooltipLabel="Remove member"
          size="icon"
          variant="destructive"
        >
          <Trash />
        </TooltipButton>
        <TooltipButton
          type="submit"
          tooltipLabel="Update member"
          size="icon"
          variant="default"
        >
          <Check />
        </TooltipButton>
      </div>
    </form>
  );
};
