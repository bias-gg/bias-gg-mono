import { TooltipButton } from "@/components/ui/tooltip-button";
import { Artist } from "@repo/types/artists/ArtistType.js";
import { Check, Trash } from "lucide-react";

type GroupMemberFormProps = {
  member: Artist;
};

export const GroupMemberForm = ({ member }: GroupMemberFormProps) => {
  const onMemberUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("Updated member", e);
  };

  const onMemberDeleteClick = (memberId) => {
    console.log("Deleted member", memberId);
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
