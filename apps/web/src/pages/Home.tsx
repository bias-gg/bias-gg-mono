import { CardGrid } from "@/components/ui/card-grid";
import { Photocard } from "@/components/photocard";
import { StandardLayout } from "@/components/layouts/Standard";

const DEMO_CARDS = [
  {
    imageUrl: "https://placehold.co/300x400",
    name: "Jungkook",
    group: "BTS",
    album: "Proof",
    price: "$25.00"
  },
  {
    imageUrl: "https://placehold.co/300x400",
    name: "Jennie",
    group: "BLACKPINK",
    album: "Born Pink",
    price: "$30.00"
  },
  {
    imageUrl: "https://placehold.co/300x400",
    name: "Nayeon",
    group: "TWICE",
    album: "IM NAYEON",
    price: "$20.00"
  },
  // Add more demo cards here
];

const Home = () => {
  return (
    <StandardLayout>
      <h2 className="text-2xl font-bold mb-6">Featured Photocards</h2>
      <CardGrid>
        {DEMO_CARDS.map((card, index) => (
          <Photocard key={index} {...card} />
        ))}
      </CardGrid>
    </StandardLayout>
  );
};

export default Home;
