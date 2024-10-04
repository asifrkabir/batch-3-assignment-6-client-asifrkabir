import nexiosInstance from "@/lib/NexiosInstance";

export const getAllPosts = async () => {
  const { data } = await nexiosInstance.get("/post", {
    cache: "no-store",
    next: {},
  });

  return data;
};
