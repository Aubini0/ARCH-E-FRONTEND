import http from "@/lib/http";
import { APIError, APIResponse, IQueryInHistory, ISessionInHistory, IVideo } from "@/types/common";
import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from "react-query";

export const useSearchYoutube = (
  props?: UseMutationOptions<APIResponse<{ results: IVideo[] }>, AxiosError<APIError>, string>
): UseMutationResult<APIResponse<{ results: IVideo[] }>, AxiosError<APIError>, string> => {
  const mutation = useMutation<APIResponse<{ results: IVideo[] }>, AxiosError<APIError>, string>({
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

export const useQueryHistory = (
  props?: UseQueryOptions<APIResponse<{ results: IQueryInHistory[] }>, AxiosError<APIError>, any, [string, { search: string }]>
): UseQueryResult<APIResponse<{ results: IQueryInHistory[] }>, AxiosError<APIError>> => {
  const query = useQuery<APIResponse<{ results: IQueryInHistory[] }>, AxiosError<APIError>, any, [string, { search: string }]>({
    ...props,
    queryFn: async (query) => {
      const params = query.queryKey[1];
      const response = await http.get(`/search/query?query=${params.search || ""}`);
      return response.data;
    },
  });

  return query;
};

export const useSessionHistory = (
  props?: UseQueryOptions<APIResponse<{ results: ISessionInHistory[] }>, AxiosError<APIError>, any, [string, { user_id: string }]>
): UseQueryResult<APIResponse<{ results: ISessionInHistory[] }>, AxiosError<APIError>> => {
  const query = useQuery<APIResponse<{ results: ISessionInHistory[] }>, AxiosError<APIError>, any, [string, { user_id: string }]>({
    ...props,
    queryFn: async (query) => {
      const params = query.queryKey[1];
      const response = await http.get(`/search/session`);
      return response.data;
    },
  });

  return query;
};

export const useQueriesInSession = (
  props?: UseQueryOptions<APIResponse<{ results: IQueryInHistory[] }>, AxiosError<APIError>, APIResponse<{ results: IQueryInHistory[] }>, [string, { session_id: string }]>
): UseQueryResult<APIResponse<{ results: IQueryInHistory[] }>, AxiosError<APIError>> => {
  const query = useQuery<APIResponse<{ results: IQueryInHistory[] }>, AxiosError<APIError>, any, [string, { session_id: string }]>({
    ...props,
    queryFn: async (query) => {
      const params = query.queryKey[1];
      const response = await http.get(`/chat_history/${params.session_id}`);
      return response.data;
    },
  });

  return query;
};

export const useDeleteAllChatHistory = (props?: UseMutationOptions<any, AxiosError<APIError>, { user_id: string }>): UseMutationResult<any, AxiosError<APIError>, { user_id: string }> => {
  const mutation = useMutation<any, AxiosError<APIError>, { user_id: string }>({
    ...props,
    mutationFn: async (params) => {
      const response = await http.delete(`/all/chats`);
      return response.data;
    },
  });

  return mutation;
};

export const useDeleteQuery = (props?: UseMutationOptions<any, AxiosError<APIError>, { query_id: string }>): UseMutationResult<any, AxiosError<APIError>, { query_id: string }> => {
  const mutation = useMutation<any, AxiosError<APIError>, { query_id: string }>({
    ...props,
    mutationFn: async (params) => {
      const response = await http.delete(`/query/${params.query_id}`);
      return response.data;
    },
  });

  return mutation;
};
