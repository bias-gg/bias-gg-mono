import {
  StandardLayout,
  StandardLayoutContent,
} from "@/components/layouts/Standard";
import { Photocard } from "@/components/Photocard";
import { Grid } from "@/components/ui/Grid";
import { useHottestCards } from "@/hooks/api/cards/useHottestCards";
import { useHottestGroups } from "@/hooks/api/groups/useHottestGroups";
import { GroupLink } from "./Groups/components/GroupLink";

const Home = () => {
  const hottestCardsResult = useHottestCards(5);
  const hottestGroupsResult = useHottestGroups(5);

  if (hottestCardsResult.err || hottestGroupsResult.error) {
    return <div>Error</div>;
  }

  if (hottestCardsResult.ok && hottestCardsResult.safeUnwrap().loading) {
    return <div>Loading...</div>;
  }

  if (hottestGroupsResult.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <StandardLayout>
      <StandardLayoutContent>
        <h2 className="text-2xl font-bold mb-6">Popular Groups</h2>
        <Grid>
          {hottestGroupsResult.data.map((group) => (
            <GroupLink key={group.id} group={group} />
          ))}
        </Grid>

        <h2 className="text-2xl font-bold mb-6">Featured Photocards</h2>
        <Grid>
          {hottestCardsResult.unwrap().data.map((card) => (
            <Photocard key={card.id} card={card} />
          ))}
        </Grid>
      </StandardLayoutContent>
    </StandardLayout>
  );
};

export default Home;
