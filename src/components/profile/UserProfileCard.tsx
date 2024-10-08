import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/user.provider";
import { IUser } from "@/types";
import { CircleUser } from "lucide-react";
import Image from "next/image";

interface IProps {
  user: IUser;
}

export function UserProfileCard({ user }: IProps) {
  const { user: loggedInUser } = useUser();

  const handleFollow = () => {
    console.log("Follow user:", user._id);
  };

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

        <CardTitle className="text-lg font-semibold text-black">
          {user.name || "Unknown User"}

          {user.bio && <p className="text-sm mb-4">{user.bio}</p>}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        {loggedInUser?.userId !== user._id ? (
          <Button onClick={handleFollow} className="max-w-sm">
            Follow
          </Button>
        ) : (
          <Button onClick={handleFollow} className="max-w-sm">
            Update Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
