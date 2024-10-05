"use client";

import { useGetAllPostsForNewsfeed } from "@/hooks/post.hook";
import PostCard from "./PostCard";
import { Button } from "../ui/button";
import PostCardLoadingSkeleton from "./PostCardLoadingSkeleton";

const PostsContainer = () => {
  const { data: postData, isLoading } = useGetAllPostsForNewsfeed();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-4 items-start w-full">
        {Array.from({ length: 4 }).map((_, idx) => (
          <PostCardLoadingSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {postData?.data ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-4 w-full items-start">
          {postData?.data.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            No posts are available right now
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start engaging as soon as posts are added.
          </p>
          <Button className="mt-4">Add Post</Button>
        </div>
      )}
    </div>
  );
};

export default PostsContainer;
