import http from "@/lib/http";
import { APIError } from "@/types/common";
import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from "react-query";

export const useSignUp = (props?: UseMutationOptions<any, AxiosError<APIError>, any, unknown>): UseMutationResult<any, AxiosError<APIError>, any> => {
  const mutation = useMutation<any, AxiosError<APIError>, any>({
    ...props,
    mutationFn: async (payload) => {
      const response = await http.post("/auth/signup", payload);
      return response.data;
    },
  });

  return mutation;
};

export const useSignIn = (props?: UseMutationOptions<any, AxiosError<APIError>, any, unknown>): UseMutationResult<any, AxiosError<APIError>, any> => {
  const mutation = useMutation<any, AxiosError<APIError>, any>({
    ...props,
    mutationFn: async (payload) => {
      const response = await http.post("/auth/login", payload);
      return response.data;
    },
  });

  return mutation;
};

export const useGetUserId = (props?: UseMutationOptions<any, AxiosError<APIError>, void>): UseMutationResult<any, AxiosError<APIError>, void> => {
  const mutation = useMutation<any, AxiosError<APIError>, void>({
    ...props,
    mutationFn: async () => {
      const response = await http.get("/user/id");
      return response.data;
    },
  });

  return mutation;
};

export const useGetSessionId = (props?: UseMutationOptions<any, AxiosError<APIError>, void>): UseMutationResult<any, AxiosError<APIError>, void> => {
  const mutation = useMutation<any, AxiosError<APIError>, void>({
    ...props,
    mutationFn: async () => {
      const response = await http.get("/session/id");
      return response.data;
    },
  });

  return mutation;
};

export const useGoogleSignIn = (props?: UseMutationOptions<any, AxiosError<APIError>, null>): UseMutationResult<any, AxiosError<APIError>, null> => {
  const mutation = useMutation<any, AxiosError<APIError>, null>({
    ...props,
    mutationFn: async () => {
      const response = await http.get("v2/auth/google");
      return response.data;
    },
  });

  return mutation;
};

export const useVerifyAccess = (queryOptions: UseQueryOptions<any, AxiosError<APIError>, any>): UseQueryResult<any, AxiosError<APIError>> => {
  return useQuery({
    ...queryOptions,
    queryFn: async () => {
      const response = await http.get(`/auth/verify_access`);
      return response.data;
    },
  });
};

export const useEditProfile = (props?: UseMutationOptions<any, AxiosError<APIError>, FormData>): UseMutationResult<any, AxiosError<APIError>, FormData> => {
  const mutation = useMutation<any, AxiosError<APIError>, FormData>({
    ...props,
    mutationFn: async (payload) => {
      const response = await http.put("/auth/user/profile", payload);
      return response.data;
    },
  });

  return mutation;
};
