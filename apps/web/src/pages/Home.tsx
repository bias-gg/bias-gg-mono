import { CardGrid } from "@/components/ui/CardGrid";
import { Photocard } from "@/components/Photocard";
import { StandardLayout } from "@/components/layouts/Standard";
import { useHottestCards } from "@/hooks/api/cards/useHottestCards";

const Home = () => {
  const result = useHottestCards();

  if (result.err) {
    return <div>Error: {result.mapErr((err) => err.message).unwrap()}</div>;
  }

  if (result.ok && result.safeUnwrap().loading) {
    return <div>Loading...</div>;
  }


  return (
    <StandardLayout>
      <h2 className="text-2xl font-bold mb-6">Featured Photocards</h2>
      <CardGrid>
        {result.unwrap().data.map((card) => (
          <Photocard key={card.id} card={card} />
        ))}
      </CardGrid>
    </StandardLayout>
  );
};

export default Home;
