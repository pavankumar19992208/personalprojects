// filepath: p:\personalspace\projects\frontend\neuralife-ai-market\src\pages\SubmitAgent.tsx
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  UploadCloud,
  X,
  File as FileIcon,
  Loader2,
  CheckCircle,
} from "lucide-react";
import type { AgentCategory } from "../types";
import { cn } from "../lib/utils"; // We will create this utility file next

const categories: AgentCategory[] = [
  "productivity",
  "education",
  "healthcare",
  "finance",
  "entertainment",
  "business",
  "development",
  "other",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.enum(categories),
  type: z.enum(["web", "mobile"]),
  tags: z.string().min(1, "Please add at least one tag"),
  demoUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  repositoryUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  thumbnail: z
    .any()
    .refine((files) => files?.length == 1, "Thumbnail is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

type FormValues = z.infer<typeof formSchema>;

const SubmitAgent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { type: "web", category: "productivity" },
  });

  const agentType = watch("type");
  const thumbnailFile = watch("thumbnail");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Submission Successful!
        </h1>
        <p className="text-gray-600">
          Your agent has been submitted for review. You will be notified once
          the review process is complete.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Submit Your AI Agent
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Bring your creation to the world. Fill out the details below for
            review.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Core Information */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Core Information</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Agent Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={cn(
                    "mt-1 block w-full",
                    errors.name && "border-red-500"
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className={cn(
                    "mt-1 block w-full",
                    errors.description && "border-red-500"
                  )}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    {...register("category")}
                    className={cn(
                      "mt-1 block w-full",
                      errors.category && "border-red-500"
                    )}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    {...register("tags")}
                    placeholder="e.g. AI, Productivity, Chatbot"
                    className={cn(
                      "mt-1 block w-full",
                      errors.tags && "border-red-500"
                    )}
                  />
                  {errors.tags && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.tags.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Agent Type */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Agent Type</h2>
            <fieldset className="grid grid-cols-2 gap-4">
              <label
                className={cn(
                  "flex items-center p-4 border rounded-lg cursor-pointer",
                  agentType === "web" && "bg-primary-50 border-primary-500"
                )}
              >
                <input
                  type="radio"
                  {...register("type")}
                  value="web"
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-3 font-medium">Web Agent</span>
              </label>
              <label
                className={cn(
                  "flex items-center p-4 border rounded-lg cursor-pointer",
                  agentType === "mobile" && "bg-primary-50 border-primary-500"
                )}
              >
                <input
                  type="radio"
                  {...register("type")}
                  value="mobile"
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-3 font-medium">Mobile App (APK)</span>
              </label>
            </fieldset>
            {agentType === "web" && (
              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="demoUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Demo URL
                  </label>
                  <input
                    type="url"
                    {...register("demoUrl")}
                    placeholder="https://example.com/demo"
                    className={cn(
                      "mt-1 block w-full",
                      errors.demoUrl && "border-red-500"
                    )}
                  />
                  {errors.demoUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.demoUrl.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="repositoryUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Repository URL (e.g., GitHub)
                  </label>
                  <input
                    type="url"
                    {...register("repositoryUrl")}
                    placeholder="https://github.com/user/repo"
                    className={cn(
                      "mt-1 block w-full",
                      errors.repositoryUrl && "border-red-500"
                    )}
                  />
                  {errors.repositoryUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.repositoryUrl.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Media */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Media & Files</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail Image
              </label>
              <div
                className={cn(
                  "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",
                  errors.thumbnail && "border-red-500"
                )}
              >
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="thumbnail"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="thumbnail"
                        type="file"
                        className="sr-only"
                        {...register("thumbnail")}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </div>
              </div>
              {thumbnailFile?.[0] && (
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  <FileIcon className="h-4 w-4 mr-2" /> {thumbnailFile[0].name}
                </div>
              )}
              {errors.thumbnail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.thumbnail.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Submission */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              )}
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitAgent;
