import { StandardLayout } from "@/components/layouts/Standard";
import { useParams } from "react-router-dom";

const decodeId = (id: string): string => {
  return atob(id).slice(0, -1);
};

const TradeArtist = () => {
  const { artistId } = useParams();

  return (<StandardLayout>i am a new component for the artist {decodeId(artistId)}!</StandardLayout>);
};

export default TradeArtist;
