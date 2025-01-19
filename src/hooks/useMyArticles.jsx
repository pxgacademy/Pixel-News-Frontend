import { useQuery } from "@tanstack/react-query";
import useContextValue from "./useContextValue";
import { useSecureAPI } from "./useAPI_Links";

const useMyArticles = () => {
  const { user } = useContextValue();
  const secureAPI = useSecureAPI();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-articles", user?.email],
    queryFn: async () => {
      const { data } = await secureAPI.get(`/articles/creator/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  return [data, isLoading, refetch];
};

export default useMyArticles;
