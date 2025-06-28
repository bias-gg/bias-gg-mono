import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Image } from "@/components/ui/Image";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card as CardType } from "@repo/types/cards/CardType.ts";
import { useState } from "react";
import { LikeButton } from "./LikeButton";
import { useNavigate } from "react-router-dom";

interface PhotocardProps {
  card: CardType;
}

export function Photocard({
  card: { title, price, artistName, groupName, groupId },
}: PhotocardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleGroupBadgeClick = () => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            rounded="top"
            src="https://picsum.photos/id/1005/1280/720"
            alt={`${title} photocard`}
            className="w-full h-full transition-transform duration-300 hover:scale-105"
          />
          <LikeButton isLiked={isLiked} onLiked={setIsLiked} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" onClick={handleGroupBadgeClick}>
            {groupName}
          </Badge>
          <Badge variant="outline">Album</Badge>
        </div>
        <h3 className="font-medium">{artistName}</h3>
        {price && (
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-semibold">${price}</span>
            <Button size="sm" variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Trade
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
