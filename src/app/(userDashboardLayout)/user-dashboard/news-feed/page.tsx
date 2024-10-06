import PostsContainer from "@/components/post/PostsContainer";

const NewsFeedPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Newsfeed</h1>
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm">
        <PostsContainer />
      </div>
    </main>
  );
};

export default NewsFeedPage;
