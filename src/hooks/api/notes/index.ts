import http from "@/lib/http";
import { APIError, APIResponse, ICreateNote, INote } from "@/types/common";
import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";

export const useCreateNote = (props?: UseMutationOptions<APIResponse<INote>, AxiosError<APIError>, ICreateNote>): UseMutationResult<APIResponse<INote>, AxiosError<APIError>, ICreateNote> => {
  const mutation = useMutation<APIResponse<INote>, AxiosError<APIError>, ICreateNote>({
    ...props,
    mutationFn: async (query) => {
      const response = await http.post("/notes/create/note", query);
      return response.data;
    },
  });

  return mutation;
};

export const useDeleteNote = (props?: UseMutationOptions<APIResponse<any>, AxiosError<APIError>, string>): UseMutationResult<APIResponse<any>, AxiosError<APIError>, string> => {
  const mutation = useMutation<APIResponse<any>, AxiosError<APIError>, string>({
    ...props,
    mutationFn: async (query) => {
      const response = await http.delete(`/notes/delete/note?note_id=${query}`);
      return response.data;
    },
  });

  return mutation;
};

export const useUpdateNote = (
  props?: UseMutationOptions<APIResponse<any>, AxiosError<APIError>, { data: ICreateNote; id: string }>
): UseMutationResult<APIResponse<any>, AxiosError<APIError>, { data: ICreateNote; id: string }> => {
  const mutation = useMutation<APIResponse<any>, AxiosError<APIError>, { data: ICreateNote; id: string }>({
    ...props,
    mutationFn: async (query) => {
      const response = await http.put(`/notes/update/note/${query.id}`, query.data);
      return response.data;
    },
  });

  return mutation;
};
