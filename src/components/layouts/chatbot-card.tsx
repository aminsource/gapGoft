import { MessageCircle, Tag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CookingChatbotCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onStart: () => void;
  onTag: () => void; // New prop to handle tagging
  isTagged: boolean; // New prop to indicate if the bot is tagged
  disabled?: boolean; // Optional prop to disable the card
}

export const ChatbotCard: React.FC<CookingChatbotCardProps> = ({
  title,
  description,
  imageUrl,
  onStart,
  onTag,
  isTagged,
  disabled = false,
}) => {
  return (
    <Card
      className={`relative w-[350px] rounded-3xl text-center ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      aria-label={`${title} Card`}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt={`Image of ${title}`}
            className="rounded-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button
          onClick={onStart}
          aria-label={`Start ${title} Conversation`}
          disabled={disabled} // Disable the button if the card is disabled
        >
          <div className="flex items-center justify-center">
            <MessageCircle size={30} className="ml-2" />
            گفتگو
          </div>
        </Button>
      </CardFooter>
      {/* Tag Icon in Corner Left */}
      <div
        onClick={onTag}
        className={`absolute left-2 top-2 m-4 cursor-pointer ${isTagged ? 'text-green-500' : 'text-gray-400'}`}
        aria-label={isTagged ? 'تگ‌شده' : 'تگ'}
      >
        <Tag size={20} />
      </div>
    </Card>
  );
};
