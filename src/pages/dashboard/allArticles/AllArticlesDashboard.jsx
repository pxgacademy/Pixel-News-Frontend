import { useQuery } from "@tanstack/react-query";
import DashboardContainer from "../../../components/container/DashboardContainer";
import Loading from "../../../components/loading/Loading";
import NoDataFound from "../../../components/loading/NoDataFound";
import { useSecureAPI } from "../../../hooks/useAPI_Links";
import useContextValue from "../../../hooks/useContextValue";
import AllArticlesTableRow from "./AllArticlesTableRow";

const AllArticlesDashboard = () => {
  const { user, loading } = useContextValue();
  const secureAPI = useSecureAPI();
  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-articles", "dashboard"],
    queryFn: async () => {
      const { data } = await secureAPI.get(`/articles`);
      return data;
    },
  });

  console.log(articles);

  if (loading || isLoading) return <Loading />;
  return (
    <DashboardContainer header="All Articles">
      {articles.length <= 0 ? (
        <NoDataFound />
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl p-3 md:p-6 mt-8">
          <table className="table table-zebra rounded-xl overflow-hidden">
            {/* head */}
            <thead>
              <tr className="uppercase bg-sky-200">
                <th>#</th>
                <th>Author Information</th>
                <th>Title and Publisher</th>
                <th>Status and Date</th>
                <th className="text-center">Approve</th>
                <th className="text-center">Decline</th>
                <th className="text-center">Delete</th>
                <th className="text-center">Premium</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <AllArticlesTableRow
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
    </DashboardContainer>
  );
};
export default AllArticlesDashboard;
