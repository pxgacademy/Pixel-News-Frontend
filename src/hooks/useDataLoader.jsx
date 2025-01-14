import { useQuery } from "@tanstack/react-query";
import { usePublicAPI, useSecureAPI } from "./useAPI_Links";

const usePublicDataLoader = (link) => {
  const publicAPI = usePublicAPI();
  const { data, isLoading, refetch } = useQuery({
    queryKey: [link],
    queryFn: async () => {
      const { data } = await publicAPI.get(link);
      return data;
    },
  });

  return [data, isLoading, refetch];
};

const useSecureDataLoader = (link) => {
  const secureAPI = useSecureAPI();
  const { data, isLoading, refetch } = useQuery({
    queryKey: [link],
    queryFn: async () => {
      const { data } = await secureAPI.get(link);
      return data;
    },
  });

  return [data, isLoading, refetch];
};

export { usePublicDataLoader, useSecureDataLoader };
