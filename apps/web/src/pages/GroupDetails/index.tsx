import { Image } from "@/components/ui/Image";
import {
  StandardLayout,
  StandardLayoutContent,
} from "@/components/layouts/Standard";
import { useGroupById } from "@/hooks/api/groups/useGroupById";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft as Back } from "lucide-react";
import { GroupManagement } from "./components/GroupManagement";
import { useMembersForGroup } from "@/hooks/api/members/useMembersForGroup";

export default function GroupDetail() {
  const { groupId } = useParams();
  const {
    group,
    isLoading: isLoadingGroup,
    error: groupError,
  } = useGroupById(groupId);

  const {
    members,
    isLoading: isLoadingMembers,
    error: membersError,
  } = useMembersForGroup({ groupId });

  if (isLoadingGroup || isLoadingMembers) {
    return <div>Loading...</div>;
  }

  if (groupError || membersError) {
    return <div>Error: {groupError?.message ?? membersError?.message}</div>;
  }

  return (
    <StandardLayout>
      <StandardLayoutContent>
        <div
          id="group-detail-container"
          className="grid grid-cols-1 grid-rows-auto auto-rows-min grid-flow-row gap-4"
        >
          <section id="breadcrumbs">
            <Link to="/groups">
              <Back />
            </Link>
          </section>

          <section id="hero" className="lg:max-h-2xl">
            <div className="flex flex-col gap-1 bg-base-100 rounded-box">
              <Image
                rounded="top"
                src="https://picsum.photos/id/1005/1280/720.webp"
                alt={`${group.name} photo`}
                className="aspect-video w-full"
              />
              <div className="hero-content">
                <h2 className="text-2xl font-bold w-full lg:text-3xl">{group.name}</h2>
              </div>
            </div>
          </section>

          <section id="members"></section>

          <section id="info"></section>

          <section id="releases"></section>

          <section id="hottest-cards"></section>
        </div>
        <GroupManagement group={group} members={members} />
      </StandardLayoutContent>
    </StandardLayout>
  );
}
