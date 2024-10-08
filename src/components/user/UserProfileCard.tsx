import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/user.provider";
import { IApiResponse, IUser } from "@/types";
import { CircleUser, Loader2 } from "lucide-react";
import Image from "next/image";
import UpdateUserModal from "./UpdateUser/UpdateUserModal";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";
import { useFollow } from "@/hooks/follow.hook";
import httpStatus from "http-status";
import { toast } from "sonner";

interface IProps {
  user: IUser;
}

export function UserProfileCard({ user }: IProps) {
  const { user: loggedInUser, isLoading: isUserLoading } = useUser();
  const { mutate: follow, isPending: isFollowPending } = useFollow();

  const handleFollow = () => {
    const followData = {
      following: user._id!,
    };

    follow(followData, {
      onSuccess: (res: IApiResponse<{ message: string }>) => {
        if (res.statusCode !== httpStatus.CREATED) {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(error.message || "Follow failed. Please try again.");
      },
    });
  };

  if (isUserLoading && !loggedInUser) {
    return <LoadingSpinner />;
  }

  loggedInUser!.bio = user?.bio;
  loggedInUser!.profilePicture = user?.profilePicture;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center">
        <div className="mb-4">
          {user.profilePicture ? (
            <Image
              src={user.profilePicture}
              alt={user.name || "User Profile"}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-yellow-500"
            />
          ) : (
            <CircleUser className="w-24 h-24 text-gray-400" />
          )}
        </div>

        <CardTitle className="text-lg font-semibold text-center">
          {user.name || "Unknown User"}
        </CardTitle>

        <CardDescription>
          {user.bio && <p className="text-sm mb-4 text-center">{user.bio}</p>}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">
        {loggedInUser?.userId !== user._id ? (
          <Button
            onClick={handleFollow}
            className="max-w-sm"
            disabled={isFollowPending}
          >
            {isFollowPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Follow"
            )}
          </Button>
        ) : (
          <UpdateUserModal user={loggedInUser!} />
        )}
      </CardContent>
    </Card>
  );
}
