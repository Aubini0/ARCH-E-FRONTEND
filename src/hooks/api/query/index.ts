import http from "@/lib/http";
import { APIError, APIResponse, IVideo } from "@/types/common";
import { AxiosError } from "axios";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "react-query";

export const useSearchYoutube = (
  props?: UseMutationOptions<
    APIResponse<{ results: IVideo[] }>,
    AxiosError<APIError>,
    string
  >
): UseMutationResult<
  APIResponse<{ results: IVideo[] }>,
  AxiosError<APIError>,
  string
> => {
  const mutation = useMutation<
    APIResponse<{ results: IVideo[] }>,
    AxiosError<APIError>,
    string
  >({
    ...props,
    mutationFn: async (query) => {
      const response = await http.post("/youtube/search", {
        user_query: query,
      });
      return response.data;
    },
  });

  return mutation;
};
