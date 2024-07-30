import http from "@/lib/http";
import { APIError, APIResponse, IVideo } from "@/types/common";
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

export const useSpotifyAuthUrl = (props?: UseMutationOptions<any, AxiosError<APIError>, null>): UseMutationResult<any, AxiosError<APIError>, null> => {
  const mutation = useMutation<any, AxiosError<APIError>, null>({
    ...props,
    mutationFn: async () => {
      const response = await http.get("v2/auth/spotify");
      return response.data;
    },
  });

  return mutation;
};
export const useConnectSpotify = (props?: UseMutationOptions<string, AxiosError<APIError>, string>): UseMutationResult<string, AxiosError<APIError>, string> => {
  const mutation = useMutation<string, AxiosError<APIError>, string>({
    ...props,
    mutationFn: async (token) => {
      const response = await http.put("v2/auth/spotify/connect", {
        spotifyToken: token,
      });
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
