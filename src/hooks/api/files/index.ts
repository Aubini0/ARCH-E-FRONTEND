import http from "@/lib/http";
import { APIError, APIResponse, FileMetadata, ICreateNote, INote } from "@/types/common";
import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from "react-query";

export const useUploadFile = (props?: UseMutationOptions<APIResponse<FileMetadata>, AxiosError<APIError>, FormData>): UseMutationResult<APIResponse<FileMetadata>, AxiosError<APIError>, FormData> => {
  const mutation = useMutation<APIResponse<FileMetadata>, AxiosError<APIError>, FormData>({
    ...props,
    mutationFn: async (query) => {
      const response = await http.post("/file-management/upload/file", query);
      return response.data;
    },
  });

  return mutation;
};

export const useGetFiles = (
  props?: UseQueryOptions<APIResponse<{ files: FileMetadata[] }>, AxiosError<APIError>, APIResponse<{ files: FileMetadata[] }>, string>
): UseQueryResult<APIResponse<{ files: FileMetadata[] }>, AxiosError<APIError>> => {
  const query = useQuery<APIResponse<{ files: FileMetadata[] }>, AxiosError<APIError>, any, string>({
    ...props,
    queryFn: async () => {
      const response = await http.get(`/file-management/retrieve/files`);
      return response.data;
    },
  });

  return query;
};
