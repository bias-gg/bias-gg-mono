import type { FormEvent } from "react";
import { TooltipButton } from "@/components/ui/TooltipButton";
import { isArtist, type Artist } from "@repo/types/artists/ArtistType.js";
import { Check, Trash } from "lucide-react";
import { NewMember } from "./GroupManagement";
import { UploadButton } from "@/components/Uploadthing";

interface MemberFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

export interface GroupMemberForm extends HTMLFormElement {
  elements: MemberFormElements;
}

type GroupMemberFormProps = {
  member: Artist | NewMember;
  onMemberDeleteClick: (memberId: string | number) => void;
  onMemberUpdateSubmit: (
    member: Artist | NewMember,
    event: FormEvent<GroupMemberForm>,
  ) => void;
};

export const GroupMemberForm = ({
  member,
  onMemberDeleteClick,
  onMemberUpdateSubmit,
}: GroupMemberFormProps) => {
  const handleMemberDeleteClick = () => {
    const memberId = isArtist(member) ? member.id : member.tempId;
    onMemberDeleteClick(memberId);
  };

  const handleMemberUpdateSubmit = (event: FormEvent<GroupMemberForm>) => {
    event.preventDefault();
    onMemberUpdateSubmit(member, event);
  };

  return (
    <form
      onSubmit={handleMemberUpdateSubmit}
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
          type="button"
          onClick={handleMemberDeleteClick}
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
      <UploadButton endpoint="artistImage" />
    </form>
  );
};
