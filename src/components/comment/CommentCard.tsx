import { IComment, IUser } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { CircleUser } from "lucide-react";
import Image from "next/image";

interface CommentCardProps {
  comment: IComment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const { content, createdAt } = comment;
  const user: IUser = comment.user as IUser;

  return (
    <div className="p-4 rounded-lg w-full">
      <div className="flex items-center mb-2">
        {user?.profilePicture ? (
          <Image
            src={user.profilePicture}
            alt={user.name!}
            width={36}
            height={36}
            className="rounded-full border-2 mr-2"
          />
        ) : (
          <CircleUser className="h-8 w-8 text-gray-400" />
        )}
        <div>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(createdAt))} ago
          </p>
        </div>
      </div>
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default CommentCard;
