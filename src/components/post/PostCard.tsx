"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IPost } from "@/types";
import { CircleUser, SquareChevronDown, SquareChevronUp } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface IProps {
  post: IPost;
}

const PostCard = ({ post }: IProps) => {
  const maxContentLength = 1000;
  const maxPreviewLength = 100;
  const maxImagesToShow = 4;

  const handlePurchase = () => {};

  return (
    <Card className="flex flex-col rounded-lg border w-full h-auto">
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
          <div>
            <Badge className="bg-[#059669]">Premium</Badge>
          </div>
        )}
      </CardHeader>

      {/* Body - Image and Content Preview */}
      <CardContent className="p-4">
        {/* Image Grid */}
        {post.imageUrls && post.imageUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-8">
            {post.imageUrls.slice(0, maxImagesToShow).map((imageUrl, index) => (
              <div key={index} className="relative overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`Post image ${index + 1}`}
                  width={600}
                  height={150}
                  className={`${
                    !post.isPurchased ? "blur-sm" : ""
                  } object-cover transition duration-300 rounded-sm`}
                />
                {/* Overlay if more images */}
                {index === maxImagesToShow - 1 &&
                  post.imageUrls!.length > maxImagesToShow && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold">
                      +{post.imageUrls!.length - maxImagesToShow}
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}

        {/* Content Preview */}
        <p className="text-sm text-default mb-4">
          {post.isPurchased
            ? `${post.content.slice(0, maxContentLength)}`
            : `${post.content.slice(0, maxPreviewLength)}`}
          {post.isPurchased && post.content.length > maxContentLength && (
            <span className="text-emerald-600 cursor-pointer hover:underline">
              ...Read more
            </span>
          )}
          {!post.isPurchased && post.content.length > maxPreviewLength && (
            <span className="text-emerald-600 cursor-pointer">
              ...Purchase to read more
            </span>
          )}
        </p>
      </CardContent>

      {/* Footer - Action Buttons */}
      <CardFooter className="flex items-center justify-center p-4 border-t">
        {!post.isPurchased ? (
          <Button
            size={"sm"}
            onClick={handlePurchase}
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
            <div>
              <Button size={"sm"}>View Details</Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
