import http from "@/lib/http";
import { APIError, APIResponse, ICreateNote, IFullTask, INote, ITask } from "@/types/common";
import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from "react-query";

export const useCreateTask = (props?: UseMutationOptions<APIResponse<ITask>, AxiosError<APIError>, ITask>): UseMutationResult<APIResponse<ITask>, AxiosError<APIError>, ITask> => {
  const mutation = useMutation<APIResponse<ITask>, AxiosError<APIError>, ITask>({
    ...props,
    mutationFn: async (query) => {
      const response = await http.post("/tasks/create/task", query);
      return response.data;
    },
  });

  return mutation;
};

export const useDeleteTask = (props?: UseMutationOptions<APIResponse<any>, AxiosError<APIError>, string>): UseMutationResult<APIResponse<any>, AxiosError<APIError>, string> => {
  const mutation = useMutation<APIResponse<any>, AxiosError<APIError>, string>({
    ...props,
    mutationFn: async (query) => {
      const response = await http.delete(`/task/delete/task?task_id=${query}`);
      return response.data;
    },
  });

  return mutation;
};

export const useUpdateTask = (
  props?: UseMutationOptions<APIResponse<any>, AxiosError<APIError>, { data: ITask; id: string }>
): UseMutationResult<APIResponse<any>, AxiosError<APIError>, { data: ITask; id: string }> => {
  const mutation = useMutation<APIResponse<any>, AxiosError<APIError>, { data: ITask; id: string }>({
    ...props,
    mutationFn: async (query) => {
      const response = await http.put(`/tasks/update/task/${query.id}`, query.data);
      return response.data;
    },
  });

  return mutation;
};

export const useGetTasks = (
  props?: UseQueryOptions<APIResponse<{ tasks: IFullTask[] }>, AxiosError<APIError>, APIResponse<{ tasks: IFullTask[] }>, string>
): UseQueryResult<APIResponse<{ tasks: IFullTask[] }>, AxiosError<APIError>> => {
  const query = useQuery<APIResponse<{ tasks: IFullTask[] }>, AxiosError<APIError>, any, string>({
    ...props,
    queryFn: async () => {
      const response = await http.get(`/tasks`);
      return response.data;
    },
  });

  return query;
};
