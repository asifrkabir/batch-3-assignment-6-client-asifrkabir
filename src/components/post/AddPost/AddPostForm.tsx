"use client";

import AppCheckbox from "@/components/form/AppCheckbox";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppRichTextEditor from "@/components/form/AppRichTextEditor";
import AppSelect from "@/components/form/AppSelect";
import { Button } from "@/components/ui/button";
import { useCreatePost } from "@/hooks/post.hook";
import { addPostValidationSchema } from "@/schemas/post.schema";
import { IApiResponse, IPost } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import httpStatus from "http-status";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
}

export function AddPostForm({ closeModal }: IProps) {
  const { mutate: createPost, isPending: isCreateUserPending } =
    useCreatePost();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      ...data,
    };

    formData.append("data", JSON.stringify(postData));

    createPost(formData, {
      onSuccess: (res: IApiResponse<IPost>) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Post created successfully");

          closeModal();
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(error.message || "Post creation failed. Please try again.");
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(addPostValidationSchema)}
        >
          <AppInput
            name="title"
            label="Title"
            type="text"
            placeholder="Enter post title"
            required
          />

          <AppSelect
            name="category"
            label="Category"
            placeholder="Select post category"
            options={[
              { label: "Tip", value: "tip" },
              { label: "Story", value: "story" },
            ]}
            required
          />

          <AppRichTextEditor
            name="content"
            label="Content"
            placeholder="Write post content..."
            required
          />

          <AppCheckbox name="isPremium" label="Is Premium?" required />

          <Button
            type="submit"
            className="w-full"
            disabled={isCreateUserPending}
          >
            Submit
          </Button>
        </AppForm>
      </div>
    </>
  );
}
