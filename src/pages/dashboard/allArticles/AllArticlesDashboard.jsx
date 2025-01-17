import { useQuery } from "@tanstack/react-query";
import DashboardContainer from "../../../components/container/DashboardContainer";
import Loading from "../../../components/loading/Loading";
import NoDataFound from "../../../components/loading/NoDataFound";
import { useSecureAPI } from "../../../hooks/useAPI_Links";
import useContextValue from "../../../hooks/useContextValue";
import AllArticlesTableRow from "./AllArticlesTableRow";
import { useSecureDataLoader } from "../../../hooks/useDataLoader";
import { useEffect, useState } from "react";

const AllArticlesDashboard = () => {
  const { loading } = useContextValue();
  const secureAPI = useSecureAPI();
  const [analytics = {}, analyticsLoading] =
    useSecureDataLoader("/admin/analytics");

  const [selectedPage, setSelectedPage] = useState(1);
  const numberOfPages = analytics?.articles
    ? Math.ceil(analytics?.articles / 10)
    : 0;
  const skip = (selectedPage - 1) * 10;
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-articles", "dashboard"],
    queryFn: async () => {
      const { data } = await secureAPI.get(`/articles?skip=${skip}&limit=10`);
      return data;
    },
    enabled:!!analytics?.articles,
  });

  useEffect(() => {
    refetch()
  }, [selectedPage, analytics?.articles])
  


  if (loading || isLoading || analyticsLoading) return <Loading />;
  return (
    <DashboardContainer header="All Articles">
      {articles.length <= 0 ? (
        <NoDataFound />
      ) : (
        <>
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

          {/* pagination */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3">
            <div className="flex items-center flex-wrap gap-1">
              {/* Pagination buttons */}
              {pages?.map((page) => (
                <button
                  key={page}
                  onClick={() => setSelectedPage(page + 1)}
                  className={`${
                    selectedPage === page + 1 ? "bg-accent" : "bg-transparent"
                  } py-[7px] px-3 border border-gray-300 dark:border-gray-600 rounded-lg`}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </DashboardContainer>
  );
};
export default AllArticlesDashboard;
