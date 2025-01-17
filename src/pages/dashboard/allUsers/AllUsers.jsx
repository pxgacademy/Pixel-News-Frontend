import { useQuery } from "@tanstack/react-query";
import DashboardContainer from "../../../components/container/DashboardContainer";
import { useSecureAPI } from "../../../hooks/useAPI_Links";
import useContextValue from "../../../hooks/useContextValue";
import Loading from "../../../components/loading/Loading";
import NoDataFound from "../../../components/loading/NoDataFound";
import { useSecureDataLoader } from "../../../hooks/useDataLoader";
import AllUsersTableRow from "./AllUsersTableRow";
import { useEffect, useState } from "react";

const AllUsers = () => {
  const secureAPI = useSecureAPI();
  const { user, loading } = useContextValue();
  const [analytics = {}, analyticsLoading] =
    useSecureDataLoader("/admin/analytics");

  const [selectedPage, setSelectedPage] = useState(1);
  const numberOfPages = analytics?.users ? Math.ceil(analytics?.users / 10) : 0;
  const skip = (selectedPage - 1) * 10;
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await secureAPI.get(`/users?skip=${skip}&limit=10`);
      return data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    refetch();
  }, [selectedPage, analytics?.users]);

  if (loading || isLoading || analyticsLoading) return <Loading />;
  return (
    <DashboardContainer header="All Users">
      {users.length <= 0 ? (
        <NoDataFound />
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-3xl p-3 md:p-6 mt-8">
            <table className="table table-zebra rounded-xl overflow-hidden">
              {/* head */}
              <thead>
                <tr className="uppercase bg-sky-200">
                  <th>#</th>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((singleUser, i) => (
                  <AllUsersTableRow
                    key={i}
                    singleUser={singleUser}
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

export default AllUsers;
