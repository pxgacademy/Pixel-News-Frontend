import { useQuery } from "@tanstack/react-query";
import SectionContainer from "../../components/container/SectionContainer";
import Loading from "../../components/loading/Loading";
import { useSecureAPI } from "../../hooks/useAPI_Links";
import useContextValue from "../../hooks/useContextValue";
import MyArticlesTableRow from "./MyArticlesTableRow";
import NoDataFound from "../../components/loading/NoDataFound";


const MyArticles = () => {
  const { user, loading } = useContextValue();
  const secureAPI = useSecureAPI();
  const {
    data: articles = [],
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

  if (loading || isLoading) return <Loading />;
  return (
    <SectionContainer header='My Articles' >
      {articles.length <= 0 ? (
        <NoDataFound/>
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl p-3 md:p-6 mt-8">
          <table className="table table-zebra rounded-xl overflow-hidden">
            {/* head */}
            <thead>
              <tr className="uppercase bg-sky-200">
                <th>#</th>
                <th>Title</th>
                <th className="text-center">Status</th>
                <th className="text-center">Premium</th>
                <th className="text-center">Details</th>
                <th className="text-center">Update</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <MyArticlesTableRow
                  key={i}
                  article={article}
                  serial={i + 1}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionContainer>
  );
};

export default MyArticles;
