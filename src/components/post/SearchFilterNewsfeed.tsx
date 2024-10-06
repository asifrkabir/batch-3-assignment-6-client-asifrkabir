"use client";

import { IQueryParam } from "@/types";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/debounce.hook";
import { useCallback, useEffect } from "react";

interface SearchFilterNewsfeedProps {
  setParams: React.Dispatch<React.SetStateAction<IQueryParam[]>>;
}

const SearchFilterNewsfeed = ({ setParams }: SearchFilterNewsfeedProps) => {
  const { register, control, setValue } = useForm();
  const searchTerm = useDebounce(useWatch({ control, name: "searchTerm" }));
  const category = useWatch({ control, name: "category" });

  const updateParams = useCallback(
    (name: string, value: boolean | React.Key) => {
      setParams((prev) => {
        const existingIndex = prev.findIndex((param) => param.name === name);

        if (existingIndex > -1) {
          const updatedParams = [...prev];
          updatedParams[existingIndex].value = value;
          return updatedParams;
        } else {
          return [{ name, value }, ...prev];
        }
      });
    },
    [setParams]
  );

  useEffect(() => {
    if (searchTerm !== undefined) {
      updateParams("searchTerm", searchTerm);
    }
  }, [searchTerm, updateParams]);

  useEffect(() => {
    if (category) {
      updateParams("category", category);
    }
  }, [category, updateParams]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
      <Input
        type="text"
        {...register("searchTerm")}
        placeholder="Search posts..."
        className="max-w-xs"
      />
      <Select
        value={category}
        onValueChange={(value) => setValue("category", value)}
      >
        <SelectTrigger className="max-w-xs w-full sm:w-40">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tip">Tip</SelectItem>
          <SelectItem value="story">Story</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilterNewsfeed;
