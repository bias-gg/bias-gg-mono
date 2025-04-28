import { CardGrid } from "@/components/ui/card-grid";
import { Photocard } from "@/components/photocard";
import { StandardLayout } from "@/components/layouts/Standard";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@repo/types/cards/CardType.js";

const Home = () => {
  const data = useQuery<Card[]>({
    queryKey: ['hottestcards'],
    queryFn: () => fetch('http://localhost:3000/cards').then((res) => res.json()),
  });

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  if (data.isError) {
    return <div>Error: {data.error.message}</div>;
  }

  return (
    <StandardLayout>
      <h2 className="text-2xl font-bold mb-6">Featured Photocards</h2>
      <CardGrid>
        {data.data.map((card) => (
          <Photocard key={card.id} card={card} />
        ))}
      </CardGrid>
    </StandardLayout>
  );
};

export default Home;
