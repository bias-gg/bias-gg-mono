
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotocardProps {
  imageUrl: string;
  name: string;
  group: string;
  price?: string;
  album: string;
}

export function Photocard({ imageUrl, name, group, price, album }: PhotocardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={imageUrl}
            alt={`${name} photocard`}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{group}</Badge>
          <Badge variant="outline">{album}</Badge>
        </div>
        <h3 className="font-medium">{name}</h3>
        {price && (
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-semibold">{price}</span>
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
