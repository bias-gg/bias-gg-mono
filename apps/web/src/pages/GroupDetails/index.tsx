import { Image } from "@/components/ui/Image";
import { StandardLayout } from "@/components/layouts/Standard";
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
      <div className="grid grid-cols-1 grid-rows-auto auto-rows-min grid-flow-row gap-4">
        <section id="breadcrumbs">
          <Link to="/groups">
            <Back />
          </Link>
        </section>

        <section id="info" className="flex">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-15">
            <div className="flex flex-col gap-3 p-5 bg-base-200 rounded-box w-full h-min lg:w-1/2">
              <Image
                rounded="top"
                src="https://picsum.photos/id/1005/1280/720.webp"
                alt={`${group.name} photo`}
                className="aspect-video w-full"
              />
              <h2 className="text-3xl font-bold w-full">{group.name}</h2>
            </div>
            <div className="flex flex-wrap gap-5 p-5 bg-base-200 rounded-box h-full w-full lg:w-1/2 justify-items-start">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col gap-2 rounded-box aspect-square h-min"
                >
                  <Image
                    variant="avatar"
                    rounded="top"
                    src="https://picsum.photos/id/1005/200/200.webp"
                    alt={`${member.name} photo`}
                    className="flex grow shrink basis-full"
                  />
                  <p className="text-l font-bold">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bio">
          BTS (Bangtan Sonyeondan or Bulletproof Boy Scouts), also known as the
          Bangtan Boys, is a seven-member South Korean boy band formed by Big
          Hit Entertainment in 2013. BTS' musical style has evolved to include a
          wide range of genres. Their lyrics touch on the themes of mental
          health, troubles of school-age youth, loss, the journey towards loving
          oneself, and individualism. BTS debuted on June 13, 2013, with the
          song "No More Dream" from their first album "2 COOL 4 SKOOL". "Wings"
          became BTS' first album to sell one million copies in South Korea. By
          2017, BTS crossed into the international music market, leading the
          Korean Wave into the United States and breaking numerous sales
          records, becoming the first Korean group to receive a certification
          from the Recording Industry Association of America (RIAA) for their
          single "MIC Drop". BTS is the first Korean act to top the Billboard
          200 with their studio album "Love Yourself: Tear" and have since hit
          the top of the U.S. charts with their albums "Love Yourself: Answer"
          and "MAP OF THE SOUL : PERSONA", making BTS the first group since The
          Beatles to earn three number one albums in less than a year. "Love
          Yourself: Answer" also broke South Korea's Gaon Album Chart's all-time
          monthly record previously set by Love Yourself: Tear and became the
          first Korean album certified Gold in the United States. As of 2019,
          BTS are worth more than $4.65 billion to South Korea's economy each
          year, or 0.3 percent of the country's GDP. BTS attracts one in every
          13 foreign tourists that visit South Korea and was cited as one of the
          key acts boosting global music sales to $19 billion in 2018. On
          October 17, 2022, BigHit Music officially announced that BTS would be
          enlisting in the South Korean military, fulfilling their mandatory
          service requirements. This news had been highly anticipated, as
          military service is compulsory for all able-bodied South Korean men by
          the age of 28, though BTS had received a deferral until 30 due to
          their cultural impact. The BTS Festa 2022 announcement was an
          emotional and highly anticipated event for ARMY. Held annually in June
          to celebrate BTS’s debut anniversary, the 2022 Festa was extra special
          as it marked their 9th anniversary. However, the biggest moment came
          on June 14, 2022, when BTS announced that they would be taking a
          temporary hiatus to focus on individual projects and upcoming military
          requirements of the members.
        </section>
      </div>
      <GroupManagement group={group} members={members} />
    </StandardLayout>
  );
}
