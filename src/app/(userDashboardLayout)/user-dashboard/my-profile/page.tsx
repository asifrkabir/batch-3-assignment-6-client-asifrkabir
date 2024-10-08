"use client";

import { AddPostModal } from "@/components/post/AddPost/AddPostModal";
import ProfilePostsContainer from "@/components/post/ProfilePostsContainer";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { useUser } from "@/context/user.provider";

const MyProfilePage = () => {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">My Profile</h1>
        <AddPostModal />
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm">
        <ProfilePostsContainer user={user!} />
      </div>
    </main>
  );
};

export default MyProfilePage;
