"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IPost } from "@/types";
import {
  CircleUser,
  LockOpen,
  SquareChevronDown,
  SquareChevronUp,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "../ui/badge";

interface IProps {
  post: IPost;
}

const PostDetailsCard = ({ post }: IProps) => {
  if (!post.isPurchased) {
    return (
      <Card className="flex flex-col justify-center items-center rounded-lg border w-full h-auto p-8">
        <p className="text-lg font-semibold text-center mb-4">
          Purchase this post to unlock the full content.
        </p>
        <Button
          size="lg"
          className="px-6 py-3 rounded-lg bg-emerald-600 gap-x-2"
        >
          <LockOpen /> Purchase
        </Button>
      </Card>
    );
  }

  return (
    <Card className="relative flex flex-col rounded-lg border w-full h-auto">
      {/* Header - Author Info */}
      <CardHeader className="flex flex-row justify-between items-center p-4">
        <div className="flex flex-row items-center">
          {post.author?.profilePicture ? (
            <Image
              src={post.author.profilePicture}
              alt={post.author.name!}
              width={40}
              height={40}
              className="rounded-full border-2 border-yellow-500"
            />
          ) : (
            <CircleUser className="h-10 w-10 text-gray-400" />
          )}
          <div className="ml-3">
            <p className="font-bold text-default">{post.author?.name}</p>
            <p className="text-sm text-default text-muted-foreground">
              Posted on: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {post.isPremium && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="absolute -top-2 -right-2 bg-[#059669] text-white flex items-center">
                  <span className="size-4">$</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Premium Post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>

      {/* Body - Image and Full Content */}
      <CardContent className="p-4">
        {/* Image Grid */}
        {post.imageUrls && post.imageUrls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mb-8">
            {post.imageUrls.map((imageUrl, index) => (
              <div key={index} className="relative overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`Post image ${index + 1}`}
                  width={800}
                  height={150}
                  className={`${
                    !post.isPurchased ? "blur-sm" : ""
                  } object-cover transition duration-300 rounded-sm`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Full Content */}
        <p className="text-sm text-default mb-4">{post.content}</p>

        {post.category && (
          <Badge
            className={`${
              post.category === "story" ? "bg-blue-500" : "bg-emerald-500"
            } text-md`}
          >
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </Badge>
        )}
      </CardContent>

      {/* Footer - Action Buttons */}
      <CardFooter className="flex items-center justify-center p-4 border-t">
        {!post.isPurchased ? (
          <Button
            size={"sm"}
            className="px-4 py-2 rounded-lg ml-auto bg-emerald-600"
          >
            Purchase
          </Button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center space-x-4 h-5">
              <button
                className={`flex items-center ${
                  post.voteType === "upvote"
                    ? "text-emerald-600"
                    : "text-gray-600"
                } hover:text-emerald-600`}
              >
                <SquareChevronUp
                  className={`h-5 w-5 ${
                    post.voteType === "upvote" ? "text-emerald-600" : ""
                  }`}
                />
                <span className="ml-1">{post.upvotes}</span>
              </button>

              <Separator orientation="vertical" />

              <button
                className={`flex items-center ${
                  post.voteType === "downvote"
                    ? "text-red-600"
                    : "text-gray-600"
                } hover:text-red-600`}
              >
                <SquareChevronDown
                  className={`h-5 w-5 ${
                    post.voteType === "downvote" ? "text-red-600" : ""
                  }`}
                />
                <span className="ml-1">{post.downvotes}</span>
              </button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostDetailsCard;
